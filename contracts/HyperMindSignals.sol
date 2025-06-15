// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title HyperMind AI Trading Signals - HyperHack 2025
 * @dev Optimized for Hyperion deployment
 */
contract HyperMindSignals {
    
    struct TradingSignal {
        uint256 id;
        string pair;
        string signalType;
        uint256 entryPrice;
        uint256 targetPrice;
        uint256 stopLoss;
        uint256 confidence;
        uint256 timestamp;
        address trader;
        bool executed;
    }
    
    struct Portfolio {
        uint256 totalValue;
        uint256 totalPnL;
        uint256 totalTrades;
        uint256 activeTrades;
    }
    
    mapping(uint256 => TradingSignal) public signals;
    mapping(address => uint256[]) public userSignals;
    mapping(address => Portfolio) public portfolios;
    
    uint256 public signalCounter;
    address public owner;
    
    event SignalCreated(
        uint256 indexed id, 
        address indexed trader,
        string pair, 
        string signalType, 
        uint256 confidence
    );
    
    event SignalExecuted(
        uint256 indexed id, 
        address indexed trader
    );
    
    constructor() {
        owner = msg.sender;
        signalCounter = 0;
    }
    
    function createSignal(
        string memory _pair,
        string memory _signalType,
        uint256 _entryPrice,
        uint256 _targetPrice,
        uint256 _stopLoss,
        uint256 _confidence
    ) external returns (uint256) {
        require(_confidence <= 100, "Invalid confidence");
        require(_entryPrice > 0, "Invalid price");
        
        signalCounter++;
        
        signals[signalCounter] = TradingSignal({
            id: signalCounter,
            pair: _pair,
            signalType: _signalType,
            entryPrice: _entryPrice,
            targetPrice: _targetPrice,
            stopLoss: _stopLoss,
            confidence: _confidence,
            timestamp: block.timestamp,
            trader: msg.sender,
            executed: false
        });
        
        userSignals[msg.sender].push(signalCounter);
        portfolios[msg.sender].activeTrades++;
        
        emit SignalCreated(signalCounter, msg.sender, _pair, _signalType, _confidence);
        
        return signalCounter;
    }
    
    function executeSignal(uint256 _signalId) external {
        require(_signalId > 0 && _signalId <= signalCounter, "Invalid signal");
        require(!signals[_signalId].executed, "Already executed");
        
        signals[_signalId].executed = true;
        portfolios[msg.sender].totalTrades++;
        
        if (portfolios[msg.sender].activeTrades > 0) {
            portfolios[msg.sender].activeTrades--;
        }
        
        emit SignalExecuted(_signalId, msg.sender);
    }
    
    function getSignal(uint256 _signalId) external view returns (
        uint256 id,
        string memory pair,
        string memory signalType,
        uint256 entryPrice,
        uint256 targetPrice,
        uint256 stopLoss,
        uint256 confidence,
        uint256 timestamp,
        address trader,
        bool executed
    ) {
        require(_signalId > 0 && _signalId <= signalCounter, "Invalid signal");
        TradingSignal memory signal = signals[_signalId];
        
        return (
            signal.id,
            signal.pair,
            signal.signalType,
            signal.entryPrice,
            signal.targetPrice,
            signal.stopLoss,
            signal.confidence,
            signal.timestamp,
            signal.trader,
            signal.executed
        );
    }
    
    function getUserSignals(address _user) external view returns (uint256[] memory) {
        return userSignals[_user];
    }
    
    function getPortfolio(address _user) external view returns (
        uint256 totalValue,
        uint256 totalPnL,
        uint256 totalTrades,
        uint256 activeTrades
    ) {
        Portfolio memory portfolio = portfolios[_user];
        return (
            portfolio.totalValue,
            portfolio.totalPnL,
            portfolio.totalTrades,
            portfolio.activeTrades
        );
    }
    
    function getSignalCount() external view returns (uint256) {
        return signalCounter;
    }
    
    function updatePortfolioValue(address _trader, uint256 _totalValue) external {
        require(msg.sender == owner || msg.sender == _trader, "Unauthorized");
        portfolios[_trader].totalValue = _totalValue;
    }
}
