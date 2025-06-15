// =========================================
// HyperMind AI Web3 Configuration - FIXED
// =========================================

// 🔥 YOUR DEPLOYED CONTRACT ADDRESS 🔥
const CONTRACT_ADDRESS = '0x4bF9Ff46CD70D7A28169bC028A822Df95bF4A049';
// 🎯 CORRECT configuration for YOUR current network (Chain ID 133717)


const HYPERION_TESTNET_CONFIG = {
    chainId: '0x20A55', // 133717 in decimal - OFFICIAL from Metis docs
    chainName: 'Hyperion (Testnet)',
    nativeCurrency: {
        name: 'tMETIS',
        symbol: 'tMETIS',
        decimals: 18
    },
    rpcUrls: ['https://hyperion-testnet.metisdevops.link'],
    blockExplorerUrls: ['https://hyperion-testnet-explorer.metisdevops.link']
};

// Contract ABI (keeping the same)
const CONTRACT_ABI =[
		{
			"inputs": [],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "uint256",
					"name": "id",
					"type": "uint256"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "trader",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "string",
					"name": "pair",
					"type": "string"
				},
				{
					"indexed": false,
					"internalType": "string",
					"name": "signalType",
					"type": "string"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "confidence",
					"type": "uint256"
				}
			],
			"name": "SignalCreated",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "uint256",
					"name": "id",
					"type": "uint256"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "trader",
					"type": "address"
				}
			],
			"name": "SignalExecuted",
			"type": "event"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "_pair",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "_signalType",
					"type": "string"
				},
				{
					"internalType": "uint256",
					"name": "_entryPrice",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_targetPrice",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_stopLoss",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_confidence",
					"type": "uint256"
				}
			],
			"name": "createSignal",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_signalId",
					"type": "uint256"
				}
			],
			"name": "executeSignal",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_user",
					"type": "address"
				}
			],
			"name": "getPortfolio",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "totalValue",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "totalPnL",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "totalTrades",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "activeTrades",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_signalId",
					"type": "uint256"
				}
			],
			"name": "getSignal",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "id",
					"type": "uint256"
				},
				{
					"internalType": "string",
					"name": "pair",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "signalType",
					"type": "string"
				},
				{
					"internalType": "uint256",
					"name": "entryPrice",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "targetPrice",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "stopLoss",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "confidence",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "timestamp",
					"type": "uint256"
				},
				{
					"internalType": "address",
					"name": "trader",
					"type": "address"
				},
				{
					"internalType": "bool",
					"name": "executed",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "getSignalCount",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_user",
					"type": "address"
				}
			],
			"name": "getUserSignals",
			"outputs": [
				{
					"internalType": "uint256[]",
					"name": "",
					"type": "uint256[]"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "owner",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"name": "portfolios",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "totalValue",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "totalPnL",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "totalTrades",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "activeTrades",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "signalCounter",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "signals",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "id",
					"type": "uint256"
				},
				{
					"internalType": "string",
					"name": "pair",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "signalType",
					"type": "string"
				},
				{
					"internalType": "uint256",
					"name": "entryPrice",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "targetPrice",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "stopLoss",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "confidence",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "timestamp",
					"type": "uint256"
				},
				{
					"internalType": "address",
					"name": "trader",
					"type": "address"
				},
				{
					"internalType": "bool",
					"name": "executed",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_trader",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "_totalValue",
					"type": "uint256"
				}
			],
			"name": "updatePortfolioValue",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "userSignals",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		}
	]

// =========================================
// FIXED Wallet Connection for OFFICIAL Hyperion
// =========================================
class WalletConnection {
    constructor() {
        this.provider = null;
        this.signer = null;
        this.contract = null;
        this.userAddress = null;
        this.isConnected = false;
    }

    async connectWallet() {
        try {
            if (!window.ethereum) {
                throw new Error('🦊 MetaMask not detected! Please install MetaMask.');
            }

            console.log('🚀 Connecting to OFFICIAL Metis Hyperion Testnet...');

            // Check current network
            const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
            console.log('Current Chain ID:', currentChainId, '(Expected: 0x20A55)');

            // If not on Hyperion, add/switch to it
            if (currentChainId !== '0x20a55' && currentChainId !== '0x20A55') {
                console.log('🔄 Adding/Switching to Official Hyperion Testnet...');
                await this.addHyperionNetwork();
            }

            // Request account access
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });

            if (accounts.length === 0) {
                throw new Error('No accounts found. Please unlock MetaMask.');
            }

            // Setup provider and signer
            this.provider = new ethers.providers.Web3Provider(window.ethereum);
            this.signer = this.provider.getSigner();
            this.userAddress = accounts[0];

            // Verify network
            const network = await this.provider.getNetwork();
            console.log('🌐 Connected to network:', network);

            if (network.chainId === 133717) {
                this.isConnected = true;
                this.contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, this.signer);
                console.log('✅ Successfully connected to OFFICIAL Hyperion Testnet!');
                console.log('📄 Contract:', CONTRACT_ADDRESS);
                console.log('👤 Address:', this.userAddress);
            } else {
                // Accept any reasonable chain ID for testing
                console.log('⚠️ Different network detected, but attempting to connect...');
                this.isConnected = true;
                this.contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, this.signer);
            }

            this.updateUI();
            this.setupEventListeners();

            return {
                success: true,
                address: this.userAddress,
                chainId: network.chainId,
                networkName: 'Hyperion Testnet'
            };

        } catch (error) {
            console.error('❌ Wallet connection failed:', error);
            this.showNotification(error.message, 'error');
            return {
                success: false,
                error: error.message
            };
        }
    }

    async addHyperionNetwork() {
        try {
            // First try to switch
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x20A55' }]
            });
            console.log('✅ Switched to Hyperion Testnet');
        } catch (switchError) {
            if (switchError.code === 4902) {
                // Network not added, add it
                console.log('📡 Adding OFFICIAL Hyperion Testnet...');
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [HYPERION_TESTNET_CONFIG]
                });
                console.log('✅ OFFICIAL Hyperion Testnet added!');
            } else {
                throw switchError;
            }
        }
    }

    async createSignal(signalData) {
        if (!this.isConnected || !this.contract) {
            throw new Error('❌ Wallet not connected to Hyperion');
        }

        try {
            console.log('🤖 Creating AI signal on OFFICIAL Hyperion:', signalData);

            // Get current network for logging
            const network = await this.provider.getNetwork();
            console.log('📡 Creating signal on Chain ID:', network.chainId);

            // Convert prices to wei
            const entryPrice = ethers.utils.parseEther(signalData.entryPrice.toString());
            const targetPrice = ethers.utils.parseEther(signalData.targetPrice.toString());
            const stopLoss = ethers.utils.parseEther(signalData.stopLoss.toString());

            // Estimate gas with fallback
            let gasLimit = 500000; // Default gas limit
            try {
                const gasEstimate = await this.contract.estimateGas.createSignal(
                    signalData.pair,
                    signalData.signalType,
                    entryPrice,
                    targetPrice,
                    stopLoss,
                    signalData.confidence
                );
                gasLimit = gasEstimate.mul(120).div(100); // 20% buffer
                console.log('⛽ Gas estimate:', gasEstimate.toString());
            } catch (gasError) {
                console.log('⚠️ Gas estimation failed, using default:', gasLimit);
            }

            // Send transaction
            const tx = await this.contract.createSignal(
                signalData.pair,
                signalData.signalType,
                entryPrice,
                targetPrice,
                stopLoss,
                signalData.confidence,
                {
                    gasLimit: gasLimit
                }
            );

            console.log('📋 Transaction sent:', tx.hash);
            this.showNotification(`🚀 Signal transaction sent! Hash: ${tx.hash.slice(0, 10)}...`, 'success');

            // Wait for confirmation
            const receipt = await tx.wait();
            console.log('✅ Signal created successfully!');
            console.log('📦 Block:', receipt.blockNumber);

            this.showNotification('✅ AI Signal created on Hyperion blockchain!', 'success');

            return {
                success: true,
                txHash: tx.hash,
                blockNumber: receipt.blockNumber,
                gasUsed: receipt.gasUsed.toString()
            };

        } catch (error) {
            console.error('❌ Signal creation failed:', error);
            
            let errorMessage = 'Transaction failed: ';
            if (error.code === 4001) {
                errorMessage = 'Transaction cancelled by user';
            } else if (error.message.includes('insufficient funds')) {
                errorMessage = 'Insufficient tMETIS tokens for gas fee';
            } else if (error.message.includes('execution reverted')) {
                errorMessage = 'Smart contract execution failed';
            } else {
                errorMessage += error.message;
            }
            
            this.showNotification(errorMessage, 'error');
            
            return {
                success: false,
                error: errorMessage
            };
        }
    }

    updateUI() {
        const connectButton = document.getElementById('connect-wallet-btn');
        const addressElement = document.getElementById('wallet-address');
        
        if (this.isConnected) {
            if (connectButton) {
                connectButton.textContent = '✅ Connected to Hyperion';
                connectButton.style.background = 'linear-gradient(135deg, #00ff88, #00cc69)';
                connectButton.disabled = true;
            }
            if (addressElement) {
                addressElement.textContent = `${this.userAddress.slice(0, 6)}...${this.userAddress.slice(-4)}`;
            }
        } else {
            if (connectButton) {
                connectButton.textContent = 'Connect to Hyperion';
                connectButton.style.background = 'linear-gradient(135deg, #8b5cf6, #3b82f6)';
                connectButton.disabled = false;
            }
        }
    }

    setupEventListeners() {
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', (accounts) => {
                if (accounts.length === 0) {
                    this.disconnect();
                } else {
                    this.userAddress = accounts[0];
                    this.updateUI();
                }
            });

            window.ethereum.on('chainChanged', (chainId) => {
                console.log('⛓️ Chain changed to:', chainId);
                window.location.reload();
            });
        }
    }

    disconnect() {
        this.provider = null;
        this.signer = null;
        this.contract = null;
        this.userAddress = null;
        this.isConnected = false;
        this.updateUI();
    }

    showNotification(message, type = 'info') {
        console.log(`${type.toUpperCase()}: ${message}`);
        
        const colors = {
            'success': 'rgba(34, 197, 94, 0.9)',
            'error': 'rgba(239, 68, 68, 0.9)',
            'warning': 'rgba(251, 191, 36, 0.9)',
            'info': 'rgba(59, 130, 246, 0.9)'
        };
        
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${colors[type]};
            color: white;
            padding: 15px 20px;
            border-radius: 12px;
            z-index: 10000;
            max-width: 400px;
            font-weight: 500;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.2);
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.opacity = '0';
                notification.style.transform = 'translateX(100%)';
                notification.style.transition = 'all 0.3s ease';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }
        }, 5000);
    }
}

// =========================================
// HyperMind App for OFFICIAL Hyperion
// =========================================
class HyperMindApp {
    constructor() {
        this.wallet = new WalletConnection();
        this.signalInterval = null;
        this.signals = [];
    }

    async init() {
        console.log('🏆 Initializing HyperMind AI for OFFICIAL Metis Hyperion...');
        
        this.setupEventListeners();
        this.startSignalGeneration();
        
        setTimeout(() => {
            this.wallet.showNotification('🏆 HyperMind AI - OFFICIAL Hyperion Ready!', 'info');
        }, 1000);
        
        console.log('✅ HyperMind AI ready for OFFICIAL Hyperion Testnet');
    }

    setupEventListeners() {
        const connectBtn = document.getElementById('connect-wallet-btn');
        if (connectBtn) {
            connectBtn.addEventListener('click', () => this.connectWallet());
        }

        const executeAllBtn = document.getElementById('execute-all-btn');
        if (executeAllBtn) {
            executeAllBtn.addEventListener('click', () => this.executeAllSignals());
        }
    }

    async connectWallet() {
        const result = await this.wallet.connectWallet();
        
        if (result.success) {
            this.wallet.showNotification(`🎉 Connected to OFFICIAL Hyperion Testnet (Chain ${result.chainId})!`, 'success');
        } else {
            this.wallet.showNotification(`❌ Connection failed: ${result.error}`, 'error');
        }
    }

    async executeAllSignals() {
        if (!this.wallet.isConnected) {
            this.wallet.showNotification('❌ Please connect to Hyperion Testnet first', 'error');
            return;
        }

        const btn = document.getElementById('execute-all-btn');
        if (btn) {
            btn.disabled = true;
            btn.innerHTML = '<i data-lucide="loader" class="w-4 h-4 inline mr-2 animate-spin"></i>Executing on Hyperion...';
            
            try {
                let executed = 0;
                const highConfidenceSignals = this.signals.filter(s => s.confidence > 85 && !s.executed);
                
                for (let signal of highConfidenceSignals) {
                    try {
                        const result = await this.wallet.createSignal(signal);
                        if (result.success) {
                            signal.onChain = true;
                            signal.txHash = result.txHash;
                            executed++;
                        }
                        await new Promise(resolve => setTimeout(resolve, 2000));
                    } catch (error) {
                        console.error('Signal execution error:', error);
                    }
                }
                
                this.wallet.showNotification(`🚀 Successfully created ${executed} signals on Hyperion!`, 'success');
                btn.innerHTML = '<i data-lucide="check" class="w-4 h-4 inline mr-2"></i>Completed!';
                
            } catch (error) {
                this.wallet.showNotification('❌ Execution failed: ' + error.message, 'error');
            } finally {
                setTimeout(() => {
                    btn.disabled = false;
                    btn.innerHTML = '<i data-lucide="zap" class="w-4 h-4 inline mr-2"></i>Execute All Signals';
                    if (typeof lucide !== 'undefined') {
                        lucide.createIcons();
                    }
                }, 3000);
            }
        }
    }

    startSignalGeneration() {
        this.signalInterval = setInterval(() => {
            const signal = this.generateMockSignal();
            this.handleNewSignal(signal);
        }, 12000);
        
        const initialSignal = this.generateMockSignal();
        this.handleNewSignal(initialSignal);
    }

    generateMockSignal() {
        const pairs = ['ETH/USDC', 'BTC/USDT', 'METIS/USDC', 'LINK/ETH', 'AVAX/USDT'];
        const types = ['STRONG_BUY', 'BUY', 'MONITOR', 'HOLD'];
        const pair = pairs[Math.floor(Math.random() * pairs.length)];
        const signalType = types[Math.floor(Math.random() * types.length)];
        const basePrice = Math.random() * 3000 + 1000;
        const confidence = Math.floor(Math.random() * 30) + 70;
        
        return {
            pair: pair,
            signalType: signalType,
            entryPrice: Number(basePrice.toFixed(2)),
            targetPrice: Number((basePrice * (1.05 + Math.random() * 0.1)).toFixed(2)),
            stopLoss: Number((basePrice * (0.92 + Math.random() * 0.05)).toFixed(2)),
            confidence: confidence,
            analysis: `Hyperion AI: ${signalType} with ${confidence}% confidence`,
            timestamp: Date.now(),
            id: Date.now()
        };
    }

    async handleNewSignal(signal) {
        console.log('🤖 New Hyperion AI signal:', signal);
        
        this.signals.unshift(signal);
        if (this.signals.length > 20) {
            this.signals = this.signals.slice(0, 20);
        }
        
        // Auto-execute very high confidence signals
        if (this.wallet.isConnected && signal.confidence > 95) {
            try {
                const result = await this.wallet.createSignal(signal);
                if (result.success) {
                    signal.onChain = true;
                    signal.txHash = result.txHash;
                    this.wallet.showNotification(`🚀 Auto-executed: ${signal.pair} on Hyperion!`, 'success');
                }
            } catch (error) {
                console.error('Auto-execution failed:', error);
            }
        }
    }
}

// =========================================
// Initialize for Metis Hackathon
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🏆 Loading HyperMind AI for OFFICIAL Metis Hyperion...');
    window.hyperMindApp = new HyperMindApp();
    window.hyperMindApp.init();
});

// Global functions
window.executeAllSignals = () => {
    if (window.hyperMindApp) {
        window.hyperMindApp.executeAllSignals();
    }
};

window.connectWallet = () => {
    if (window.hyperMindApp) {
        window.hyperMindApp.connectWallet();
    }
};

console.log('🔥 HyperMind AI - OFFICIAL Metis Hyperion Edition Loaded!');
console.log('🎯 OFFICIAL Configuration:');
console.log('   Chain ID: 133717 (0x20A55)');
console.log('   RPC: https://hyperion-testnet.metisdevops.link');
console.log('   Currency: tMETIS');
console.log('   Explorer: https://hyperion-testnet-explorer.metisdevops.link');
console.log('🏆 Ready for Metis Hackathon with OFFICIAL config!');
// =========================================
