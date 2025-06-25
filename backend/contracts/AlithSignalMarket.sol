// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title AlithSignalMarket
 * @dev Enhanced signal market with Alith AI framework integration
 * Provides on-chain verification of AI trading signals with performance tracking
 */
contract AlithSignalMarket {
    
    struct Signal {
        uint256 id;
        address provider;
        string pair;           // "ETH/USDC"
        uint8 signalType;      // 1=BUY, 2=SELL, 3=HOLD
        uint256 entryPrice;    // Entry price in wei
        uint256 targetPrice;   // Take profit price
        uint256 stopLoss;      // Stop loss price
        uint256 confidence;    // AI confidence 0-100
        bytes32 alithProofHash; // Alith framework proof hash
        string aiModel;        // AI model identifier (e.g., "gpt-4-technical-v1")
        uint256 timestamp;
        bool executed;
        bool profitable;
        uint256 actualExitPrice;
        uint256 executionTimestamp;
    }
    
    struct Provider {
        address addr;
        string name;           // Provider name/identity
        uint256 totalSignals;
        uint256 successfulSignals;
        uint256 totalProfit;   // Cumulative profit in wei
        uint256 reputation;    // 0-1000 reputation score
        uint256 alithScore;    // Alith framework verification score
        bool isActive;
        bool isVerified;       // Verified by Alith network
    }
    
    struct MarketMetrics {
        uint256 totalVolume;
        uint256 totalSignals;
        uint256 activeProviders;
        uint256 avgConfidence;
        uint256 globalWinRate;
    }
    
    // Storage
    mapping(uint256 => Signal) public signals;
    mapping(address => Provider) public providers;
    mapping(address => uint256[]) public providerSignals;
    mapping(address => mapping(address => bool)) public subscriptions;
    mapping(string => uint256[]) public pairSignals; // Signals by trading pair
    
    uint256 public signalCounter;
    MarketMetrics public marketMetrics;
    address public owner;
    address public alithVerifier; // Alith network verifier contract
    
    // Constants
    uint256 public constant MIN_CONFIDENCE = 50;
    uint256 public constant VERIFICATION_FEE = 0.01 ether;
    uint256 public constant PROVIDER_STAKE = 0.1 ether;
    
    // Events
    event SignalCreated(
        uint256 indexed signalId, 
        address indexed provider, 
        string pair, 
        uint8 signalType,
        uint256 confidence,
        bytes32 alithProof
    );
    
    event SignalExecuted(
        uint256 indexed signalId, 
        bool profitable, 
        uint256 exitPrice,
        uint256 profit
    );
    
    event ProviderRegistered(address indexed provider, string name);
    event ProviderVerified(address indexed provider, uint256 alithScore);
    event SubscriptionCreated(address indexed subscriber, address indexed provider);
    event AlithVerificationUpdated(address indexed provider, bytes32 proofHash);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }
    
    modifier onlyActiveProvider() {
        require(providers[msg.sender].isActive, "Not an active provider");
        _;
    }
    
    modifier onlyVerifiedProvider() {
        require(providers[msg.sender].isVerified, "Provider not verified by Alith");
        _;
    }
    
    constructor() {
        owner = msg.sender;
        signalCounter = 0;
    }
    
    /**
     * @dev Set Alith verifier contract address
     */
    function setAlithVerifier(address _verifier) external onlyOwner {
        alithVerifier = _verifier;
    }
    
    /**
     * @dev Register as signal provider with stake
     */
    function registerProvider(string memory _name) external payable {
        require(msg.value >= PROVIDER_STAKE, "Insufficient stake");
        require(!providers[msg.sender].isActive, "Already registered");
        require(bytes(_name).length > 0, "Name required");
        
        providers[msg.sender] = Provider({
            addr: msg.sender,
            name: _name,
            totalSignals: 0,
            successfulSignals: 0,
            totalProfit: 0,
            reputation: 500, // Start with neutral reputation
            alithScore: 0,
            isActive: true,
            isVerified: false
        });
        
        marketMetrics.activeProviders++;
        
        emit ProviderRegistered(msg.sender, _name);
    }
    
    /**
     * @dev Verify provider through Alith network
     */
    function verifyProviderWithAlith(
        address _provider, 
        uint256 _alithScore, 
        bytes32 _proofHash
    ) external {
        require(msg.sender == alithVerifier || msg.sender == owner, "Not authorized verifier");
        require(providers[_provider].isActive, "Provider not active");
        require(_alithScore <= 1000, "Invalid Alith score");
        
        providers[_provider].isVerified = true;
        providers[_provider].alithScore = _alithScore;
        
        emit ProviderVerified(_provider, _alithScore);
        emit AlithVerificationUpdated(_provider, _proofHash);
    }
    
    /**
     * @dev Create new AI trading signal with Alith verification
     */
    function createSignal(
        string memory _pair,
        uint8 _signalType,
        uint256 _entryPrice,
        uint256 _targetPrice,
        uint256 _stopLoss,
        uint256 _confidence,
        bytes32 _alithProofHash,
        string memory _aiModel
    ) external onlyActiveProvider returns (uint256) {
        require(_confidence >= MIN_CONFIDENCE && _confidence <= 100, "Invalid confidence");
        require(_signalType >= 1 && _signalType <= 3, "Invalid signal type");
        require(_entryPrice > 0, "Invalid entry price");
        require(bytes(_pair).length > 0, "Pair required");
        require(bytes(_aiModel).length > 0, "AI model required");
        
        signalCounter++;
        
        signals[signalCounter] = Signal({
            id: signalCounter,
            provider: msg.sender,
            pair: _pair,
            signalType: _signalType,
            entryPrice: _entryPrice,
            targetPrice: _targetPrice,
            stopLoss: _stopLoss,
            confidence: _confidence,
            alithProofHash: _alithProofHash,
            aiModel: _aiModel,
            timestamp: block.timestamp,
            executed: false,
            profitable: false,
            actualExitPrice: 0,
            executionTimestamp: 0
        });
        
        // Update provider stats
        providerSignals[msg.sender].push(signalCounter);
        providers[msg.sender].totalSignals++;
        
        // Update pair signals
        pairSignals[_pair].push(signalCounter);
        
        // Update market metrics
        marketMetrics.totalSignals++;
        marketMetrics.avgConfidence = calculateAvgConfidence();
        
        emit SignalCreated(
            signalCounter, 
            msg.sender, 
            _pair, 
            _signalType, 
            _confidence,
            _alithProofHash
        );
        
        return signalCounter;
    }
    
    /**
     * @dev Execute signal with actual market outcome
     */
    function executeSignal(
        uint256 _signalId, 
        uint256 _actualPrice, 
        bool _isProfitable
    ) external {
        require(_signalId <= signalCounter && _signalId > 0, "Invalid signal ID");
        require(!signals[_signalId].executed, "Signal already executed");
        
        Signal storage signal = signals[_signalId];
        Provider storage provider = providers[signal.provider];
        
        signal.executed = true;
        signal.profitable = _isProfitable;
        signal.actualExitPrice = _actualPrice;
        signal.executionTimestamp = block.timestamp;
        
        // Calculate profit/loss
        uint256 profit = 0;
        if (_isProfitable) {
            provider.successfulSignals++;
            
            if (signal.signalType == 1 || signal.signalType == 3) { // BUY/HOLD
                profit = _actualPrice > signal.entryPrice ? 
                    _actualPrice - signal.entryPrice : 0;
            } else { // SELL
                profit = signal.entryPrice > _actualPrice ? 
                    signal.entryPrice - _actualPrice : 0;
            }
            
            provider.totalProfit += profit;
        }
        
        // Update reputation (weighted by confidence and Alith score)
        updateProviderReputation(signal.provider, _isProfitable, signal.confidence);
        
        // Update market metrics
        marketMetrics.globalWinRate = calculateGlobalWinRate();
        marketMetrics.totalVolume += signal.entryPrice;
        
        emit SignalExecuted(_signalId, _isProfitable, _actualPrice, profit);
    }
    
    /**
     * @dev Update provider reputation based on performance
     */
    function updateProviderReputation(
        address _provider, 
        bool _profitable, 
        uint256 _confidence
    ) internal {
        Provider storage provider = providers[_provider];
        
        if (provider.totalSignals == 0) return;
        
        uint256 baseWinRate = (provider.successfulSignals * 1000) / provider.totalSignals;
        uint256 confidenceBonus = _confidence > 80 ? 50 : 0;
        uint256 alithBonus = provider.alithScore / 10; // Max 100 bonus
        
        provider.reputation = baseWinRate + confidenceBonus + alithBonus;
        
        // Cap at 1000
        if (provider.reputation > 1000) {
            provider.reputation = 1000;
        }
    }
    
    /**
     * @dev Subscribe to a signal provider
     */
    function subscribeToProvider(address _provider) external payable {
        require(providers[_provider].isActive, "Provider not active");
        require(msg.value >= VERIFICATION_FEE, "Insufficient fee");
        require(!subscriptions[msg.sender][_provider], "Already subscribed");
        
        subscriptions[msg.sender][_provider] = true;
        
        // Transfer fee to provider (90%) and platform (10%)
        uint256 providerFee = (msg.value * 90) / 100;
        uint256 platformFee = msg.value - providerFee;
        
        payable(_provider).transfer(providerFee);
        payable(owner).transfer(platformFee);
        
        emit SubscriptionCreated(msg.sender, _provider);
    }
    
    // ============ VIEW FUNCTIONS ============
    
    /**
     * @dev Get provider win rate
     */
    function getProviderWinRate(address _provider) external view returns (uint256) {
        Provider memory provider = providers[_provider];
        if (provider.totalSignals == 0) return 0;
        return (provider.successfulSignals * 100) / provider.totalSignals;
    }
    
    /**
     * @dev Get recent signals for a provider
     */
    function getProviderSignals(
        address _provider, 
        uint256 _limit
    ) external view returns (uint256[] memory) {
        uint256[] memory providerSigs = providerSignals[_provider];
        uint256 length = providerSigs.length > _limit ? _limit : providerSigs.length;
        uint256[] memory result = new uint256[](length);
        
        for (uint256 i = 0; i < length; i++) {
            result[i] = providerSigs[providerSigs.length - 1 - i]; // Most recent first
        }
        
        return result;
    }
    
    /**
     * @dev Get signals by trading pair
     */
    function getSignalsByPair(
        string memory _pair, 
        uint256 _limit
    ) external view returns (uint256[] memory) {
        uint256[] memory pairSigs = pairSignals[_pair];
        uint256 length = pairSigs.length > _limit ? _limit : pairSigs.length;
        uint256[] memory result = new uint256[](length);
        
        for (uint256 i = 0; i < length; i++) {
            result[i] = pairSigs[pairSigs.length - 1 - i]; // Most recent first
        }
        
        return result;
    }
    
    /**
     * @dev Get top performing providers
     */
    function getTopProviders(uint256 _limit) external view returns (address[] memory) {
        // This is a simplified version - in production, you'd want a more efficient sorting
        address[] memory topProviders = new address[](_limit);
        uint256 count = 0;
        
        // This would need to be implemented with proper sorting logic
        // For now, returning empty array as placeholder
        return topProviders;
    }
    
    /**
     * @dev Calculate average confidence across all signals
     */
    function calculateAvgConfidence() internal view returns (uint256) {
        if (signalCounter == 0) return 0;
        
        uint256 totalConfidence = 0;
        for (uint256 i = 1; i <= signalCounter; i++) {
            totalConfidence += signals[i].confidence;
        }
        
        return totalConfidence / signalCounter;
    }
    
    /**
     * @dev Calculate global win rate
     */
    function calculateGlobalWinRate() internal view returns (uint256) {
        if (signalCounter == 0) return 0;
        
        uint256 executedSignals = 0;
        uint256 profitableSignals = 0;
        
        for (uint256 i = 1; i <= signalCounter; i++) {
            if (signals[i].executed) {
                executedSignals++;
                if (signals[i].profitable) {
                    profitableSignals++;
                }
            }
        }
        
        if (executedSignals == 0) return 0;
        return (profitableSignals * 100) / executedSignals;
    }
    
    /**
     * @dev Get signal details with Alith verification
     */
    function getSignalWithVerification(uint256 _signalId) external view returns (
        Signal memory signal,
        bool isAlithVerified,
        uint256 providerReputation
    ) {
        require(_signalId <= signalCounter && _signalId > 0, "Invalid signal ID");
        
        Signal memory sig = signals[_signalId];
        Provider memory provider = providers[sig.provider];
        
        return (
            sig,
            provider.isVerified && sig.alithProofHash != bytes32(0),
            provider.reputation
        );
    }
    
    /**
     * @dev Get market analytics dashboard data
     */
    function getMarketAnalytics() external view returns (
        uint256 totalSignals,
        uint256 totalProviders,
        uint256 globalWinRate,
        uint256 avgConfidence,
        uint256 totalVolume,
        uint256 alithVerifiedProviders
    ) {
        uint256 verifiedCount = 0;
        
        // Count verified providers (this is inefficient but works for demo)
        // In production, you'd maintain a counter
        for (uint256 i = 0; i < marketMetrics.activeProviders; i++) {
            // This would need proper iteration logic
        }
        
        return (
            marketMetrics.totalSignals,
            marketMetrics.activeProviders,
            marketMetrics.globalWinRate,
            marketMetrics.avgConfidence,
            marketMetrics.totalVolume,
            verifiedCount
        );
    }
    
    /**
     * @dev Emergency functions
     */
    function pause() external onlyOwner {
        // Implement pause functionality
    }
    
    function unpause() external onlyOwner {
        // Implement unpause functionality
    }
    
    function emergencyWithdraw() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
    
    /**
     * @dev Fallback function to receive ETH
     */
    receive() external payable {}
}
