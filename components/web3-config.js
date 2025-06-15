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
// Enhanced Wallet Connection for Metis Hackathon
// =========================================
class WalletConnection {
    constructor() {
        this.provider = null;
        this.signer = null;
        this.contract = null;
        this.userAddress = null;
        this.isConnected = false;
        this.networkConfig = HYPERION_TESTNET_CONFIG; // Start with the correct config
    }

    async connectWallet() {
        try {
            if (!window.ethereum) {
                throw new Error('🦊 MetaMask not detected! Please install MetaMask for Metis Hackathon.');
            }

            console.log('🚀 Connecting to Metis Hyperion Testnet...');

            // Check current network
            const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
            console.log('Current Chain ID:', currentChainId);

            // Request account access
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });

            if (accounts.length === 0) {
                throw new Error('No accounts found. Please unlock MetaMask.');
            }

            // Try to connect to the network that matches your MetaMask
            await this.ensureCorrectNetwork();

            // Setup provider and signer
            this.provider = new ethers.providers.Web3Provider(window.ethereum);
            this.signer = this.provider.getSigner();
            this.userAddress = accounts[0];

            // Verify network
            const network = await this.provider.getNetwork();
            console.log('🌐 Connected to network:', network);

            // Check if we're on the right network (either 4795 or 2001)
            if (network.chainId === 4795 || network.chainId === 2001) {
                this.isConnected = true;
                this.contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, this.signer);
                console.log('✅ Successfully connected to Hyperion Testnet!');
                console.log('📄 Contract:', CONTRACT_ADDRESS);
                console.log('👤 Address:', this.userAddress);
            } else {
                throw new Error(`❌ Wrong network! Please switch to Hyperion Testnet (Chain ID: 4795 or 2001)`);
            }

            this.updateUI();
            this.setupEventListeners();

            return {
                success: true,
                address: this.userAddress,
                chainId: network.chainId,
                networkName: network.name
            };

        } catch (error) {
            console.error('❌ Wallet connection failed:', error);
            this.showError(error.message);
            return {
                success: false,
                error: error.message
            };
        }
    }

    async ensureCorrectNetwork() {
        try {
            const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
            
            // If already on correct network, return
            if (currentChainId === '0x12BB' || currentChainId === '0x7D1') {
                console.log('✅ Already on correct Hyperion network');
                return;
            }

            // Try to switch to the network that matches your MetaMask (4795)
            console.log('🔄 Switching to Hyperion Testnet (Chain ID: 4795)...');
            
            try {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0x12BB' }] // 4795 in hex
                });
                console.log('✅ Switched to Hyperion Testnet (4795)');
            } catch (switchError) {
                if (switchError.code === 4902) {
                    // Network not added, try to add it
                    console.log('📡 Adding Hyperion Testnet to MetaMask...');
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [this.networkConfig]
                    });
                    console.log('✅ Hyperion Testnet added successfully!');
                } else {
                    throw switchError;
                }
            }

        } catch (error) {
            console.error('❌ Network setup failed:', error);
            // Try alternative config
            console.log('🔄 Trying alternative network config...');
            try {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [HYPERION_TESTNET_CONFIG_ALT]
                });
            } catch (altError) {
                throw new Error('Unable to add Hyperion Testnet. Please add it manually in MetaMask.');
            }
        }
    }

    async createSignal(signalData) {
        if (!this.isConnected || !this.contract) {
            throw new Error('❌ Wallet not connected to Hyperion Testnet');
        }

        try {
            console.log('🤖 Creating AI signal on Hyperion blockchain:', signalData);

            // Validate network
            const network = await this.provider.getNetwork();
            if (network.chainId !== 4795 && network.chainId !== 2001) {
                throw new Error('❌ Please switch to Hyperion Testnet');
            }

            // Convert prices to wei
            const entryPrice = ethers.utils.parseEther(signalData.entryPrice.toString());
            const targetPrice = ethers.utils.parseEther(signalData.targetPrice.toString());
            const stopLoss = ethers.utils.parseEther(signalData.stopLoss.toString());

            // Estimate gas
            const gasEstimate = await this.contract.estimateGas.createSignal(
                signalData.pair,
                signalData.signalType,
                entryPrice,
                targetPrice,
                stopLoss,
                signalData.confidence
            );

            console.log('⛽ Gas estimate:', gasEstimate.toString());

            // Send transaction
            const tx = await this.contract.createSignal(
                signalData.pair,
                signalData.signalType,
                entryPrice,
                targetPrice,
                stopLoss,
                signalData.confidence,
                {
                    gasLimit: gasEstimate.mul(120).div(100) // 20% buffer
                }
            );

            console.log('📋 Transaction sent:', tx.hash);
            this.showSuccess(`🚀 Signal transaction sent! Hash: ${tx.hash.slice(0, 10)}...`);

            // Wait for confirmation
            const receipt = await tx.wait();
            console.log('✅ Signal created successfully!');
            console.log('📦 Block:', receipt.blockNumber);

            this.showSuccess('✅ AI Signal created on Hyperion blockchain!');

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
                errorMessage = 'Insufficient HYP tokens for gas fee';
            } else {
                errorMessage += error.message;
            }
            
            this.showError(errorMessage);
            
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

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showError(message) {
        this.showNotification(message, 'error');
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
// Enhanced App for Metis Hackathon
// =========================================
class HyperMindApp {
    constructor() {
        this.wallet = new WalletConnection();
        this.signalInterval = null;
        this.signals = [];
    }

    async init() {
        console.log('🚀 Initializing HyperMind AI for Metis Hackathon...');
        
        this.setupEventListeners();
        this.startSignalGeneration();
        
        // Show hackathon welcome message
        setTimeout(() => {
            this.wallet.showNotification('🏆 Welcome to HyperMind AI - Metis Hackathon Edition!', 'info');
        }, 1000);
        
        console.log('✅ HyperMind AI initialized for Metis Hackathon');
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
            this.wallet.showSuccess(`🎉 Connected to Hyperion Testnet! Chain ID: ${result.chainId}`);
        } else {
            this.wallet.showError(`❌ Connection failed: ${result.error}`);
        }
    }

    async executeAllSignals() {
        if (!this.wallet.isConnected) {
            this.wallet.showError('❌ Please connect to Hyperion Testnet first');
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
                
                this.wallet.showSuccess(`🚀 Successfully created ${executed} signals on Hyperion blockchain!`);
                btn.innerHTML = '<i data-lucide="check" class="w-4 h-4 inline mr-2"></i>Completed!';
                
            } catch (error) {
                this.wallet.showError('❌ Execution failed: ' + error.message);
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
        }, 10000); // Every 10 seconds for demo
        
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
            analysis: `Hyperion AI detected ${signalType} pattern with ${confidence}% confidence`,
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
        
        // Auto-execute very high confidence signals for demo
        if (this.wallet.isConnected && signal.confidence > 92) {
            try {
                const result = await this.wallet.createSignal(signal);
                if (result.success) {
                    signal.onChain = true;
                    signal.txHash = result.txHash;
                    this.wallet.showSuccess(`🚀 Auto-executed signal: ${signal.pair} on Hyperion!`);
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
    console.log('🏆 Loading HyperMind AI for Metis Hackathon...');
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

console.log('🔥 HyperMind AI - Metis Hackathon Edition Loaded!');
console.log('🌐 Ready for Hyperion Testnet (Chain ID: 4795)');
console.log('🏆 Built for Metis Hackathon 2024');
