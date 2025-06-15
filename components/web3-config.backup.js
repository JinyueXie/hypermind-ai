const HYPERION_TESTNET_CONFIG = {
    chainId: '0x7D1', // 2001 in decimal
    chainName: 'Hyperion Testnet',
    nativeCurrency: {
        name: 'METIS',
        symbol: 'METIS',
        decimals: 18
    },
    rpcUrls: ['https://hyperion-testnet.metis.io'],
    blockExplorerUrls: ['https://hyperion-explorer.metis.io']
};

// 🔥 UPDATE THESE VALUES AFTER DEPLOYMENT 🔥
const CONTRACT_ADDRESS = '0x8Df0c84d9E56ADCf0C8e4555839127cC3C5ef48f';
const CONTRACT_ABI = [
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
[
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
// Wallet Connection Class
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
                throw new Error('MetaMask not detected. Please install MetaMask.');
            }

            // Request account access
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });

            if (accounts.length === 0) {
                throw new Error('No accounts found. Please connect your wallet.');
            }

            // Add/Switch to Hyperion Testnet
            try {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: HYPERION_TESTNET_CONFIG.chainId }]
                });
            } catch (switchError) {
                if (switchError.code === 4902) {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [HYPERION_TESTNET_CONFIG]
                    });
                } else {
                    throw switchError;
                }
            }

            // Setup provider and signer
            this.provider = new ethers.providers.Web3Provider(window.ethereum);
            this.signer = this.provider.getSigner();
            this.userAddress = accounts[0];
            this.isConnected = true;

            // Initialize contract
            this.contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, this.signer);

            console.log('🚀 Wallet connected successfully:', this.userAddress);
            console.log('📄 Contract address:', CONTRACT_ADDRESS);
            
            this.updateUI();
            
            return {
                success: true,
                address: this.userAddress,
                contractAddress: CONTRACT_ADDRESS
            };

        } catch (error) {
            console.error('❌ Wallet connection failed:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    updateUI() {
        const connectButton = document.getElementById('connect-wallet-btn');
        const addressElement = document.getElementById('wallet-address');
        
        if (this.isConnected) {
            if (connectButton) {
                connectButton.textContent = 'Connected ✅';
                connectButton.style.background = 'linear-gradient(135deg, #00ff88, #00cc69)';
            }
            if (addressElement) {
                addressElement.textContent = `${this.userAddress.slice(0, 6)}...${this.userAddress.slice(-4)}`;
            }
        } else {
            if (connectButton) {
                connectButton.textContent = 'Connect Wallet';
                connectButton.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
            }
            if (addressElement) {
                addressElement.textContent = '';
            }
        }
    }

    async createSignal(signalData) {
        if (!this.isConnected || !this.contract) {
            throw new Error('Wallet not connected');
        }

        try {
            console.log('🤖 Creating signal on-chain:', signalData);

            // Convert prices to wei (multiply by 1e18 for precision)
            const entryPrice = ethers.utils.parseEther(signalData.entryPrice.toString());
            const targetPrice = ethers.utils.parseEther(signalData.targetPrice.toString());
            const stopLoss = ethers.utils.parseEther(signalData.stopLoss.toString());

            const tx = await this.contract.createSignal(
                signalData.pair,
                signalData.signalType,
                entryPrice,
                targetPrice,
                stopLoss,
                signalData.confidence
            );

            console.log('📋 Transaction sent:', tx.hash);
            
            // Wait for confirmation
            const receipt = await tx.wait();
            console.log('✅ Signal created successfully:', receipt);

            return {
                success: true,
                txHash: tx.hash,
                blockNumber: receipt.blockNumber
            };

        } catch (error) {
            console.error('❌ Transaction failed:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    async executeSignal(signalId) {
        if (!this.isConnected || !this.contract) {
            throw new Error('Wallet not connected');
        }

        try {
            console.log('⚡ Executing signal:', signalId);
            
            const tx = await this.contract.executeSignal(signalId);
            console.log('📋 Execution transaction sent:', tx.hash);
            
            const receipt = await tx.wait();
            console.log('✅ Signal executed successfully:', receipt);

            return {
                success: true,
                txHash: tx.hash,
                blockNumber: receipt.blockNumber
            };

        } catch (error) {
            console.error('❌ Execution failed:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
}

// =========================================
// AI Signal Generator (Mock)
// =========================================
class AlithMock {
    static generateSignal() {
        const pairs = ['ETH/USDC', 'BTC/USDT', 'MATIC/USDC', 'LINK/ETH'];
        const types = ['STRONG_BUY', 'BUY', 'MONITOR', 'HOLD'];
        const pair = pairs[Math.floor(Math.random() * pairs.length)];
        const signalType = types[Math.floor(Math.random() * types.length)];
        const basePrice = Math.random() * 3000 + 1000;
        const confidence = Math.floor(Math.random() * 30) + 70; // 70-100%
        
        return {
            pair: pair,
            signalType: signalType,
            entryPrice: Number(basePrice.toFixed(2)),
            targetPrice: Number((basePrice * 1.08).toFixed(2)),
            stopLoss: Number((basePrice * 0.95).toFixed(2)),
            confidence: confidence,
            analysis: `AI Analysis: ${signalType} signal detected with ${confidence}% confidence`,
            timestamp: Date.now()
        };
    }

    static startSignalGeneration(callback, interval = 15000) {
        // Generate initial signal
        callback(this.generateSignal());
        
        // Set up interval for continuous generation
        return setInterval(() => {
            callback(this.generateSignal());
        }, interval);
    }
}

// =========================================
// Main Application
// =========================================
class HyperMindApp {
    constructor() {
        this.wallet = new WalletConnection();
        this.signalInterval = null;
        this.signals = [];
    }

    async init() {
        console.log('🚀 Initializing HyperMind AI...');
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Start AI signal generation
        this.startSignalGeneration();
        
        console.log('✅ HyperMind AI initialized');
    }

    setupEventListeners() {
        // Connect Wallet Button
        const connectBtn = document.getElementById('connect-wallet-btn');
        if (connectBtn) {
            connectBtn.addEventListener('click', () => this.connectWallet());
        }

        // Execute Signal Buttons (event delegation for dynamically added signals)
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('execute-signal-btn') || 
                e.target.closest('.execute-signal-btn')) {
                const btn = e.target.classList.contains('execute-signal-btn') ? 
                           e.target : e.target.closest('.execute-signal-btn');
                const signalId = btn.dataset.signalId;
                this.executeSignal(signalId);
            }
        });

        // Execute All Signals button  
        const executeAllBtn = document.getElementById('execute-all-btn');
        if (executeAllBtn) {
            executeAllBtn.addEventListener('click', () => this.executeAllSignals());
        }
    }

    async connectWallet() {
        const result = await this.wallet.connectWallet();
        
        if (result.success) {
            this.showNotification('✅ Wallet connected to Hyperion!', 'success');
        } else {
            this.showNotification(`❌ Connection failed: ${result.error}`, 'error');
        }
    }

    startSignalGeneration() {
        this.signalInterval = AlithMock.startSignalGeneration((signal) => {
            this.handleNewSignal(signal);
        });
    }

    async handleNewSignal(signal) {
        console.log('🤖 New AI signal:', signal);
        
        // Auto-create high confidence signals on-chain
        if (this.wallet.isConnected && signal.confidence > 85) {
            try {
                const result = await this.wallet.createSignal(signal);
                if (result.success) {
                    signal.onChain = true;
                    signal.txHash = result.txHash;
                    this.showNotification('📊 High-confidence signal created on-chain!', 'success');
                }
            } catch (error) {
                console.error('Failed to create on-chain signal:', error);
            }
        }
        
        this.signals.unshift(signal);
        if (this.signals.length > 10) {
            this.signals.pop();
        }
    }

    async executeSignal(signalId) {
        if (!this.wallet.isConnected) {
            this.showNotification('❌ Please connect wallet first', 'error');
            return;
        }

        try {
            const result = await this.wallet.executeSignal(signalId);
            
            if (result.success) {
                this.showNotification('✅ Signal executed successfully!', 'success');
            } else {
                this.showNotification(`❌ Execution failed: ${result.error}`, 'error');
            }
            
        } catch (error) {
            console.error('Execute signal error:', error);
            this.showNotification('❌ Transaction failed', 'error');
        }
    }

    showNotification(message, type = 'info') {
        console.log(`${type.toUpperCase()}: ${message}`);
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 15px;
            border-radius: 8px;
            z-index: 10000;
            max-width: 300px;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 5000);
    }

    // Global function for Execute All Signals button
    async executeAllSignals() {
        if (!this.wallet.isConnected) {
            this.showNotification('❌ Please connect wallet first', 'error');
            return;
        }

        const btn = document.getElementById('execute-all-btn');
        if (btn) {
            btn.disabled = true;
            btn.innerHTML = '<i data-lucide="loader" class="w-4 h-4 inline mr-2 animate-spin"></i>Processing...';
            
            try {
                // Execute all pending high-confidence signals
                let executed = 0;
                for (let signal of this.signals) {
                    if (signal.confidence > 85 && !signal.executed) {
                        await this.wallet.createSignal(signal);
                        executed++;
                        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1s between signals
                    }
                }
                
                this.showNotification(`✅ Executed ${executed} signals successfully!`, 'success');
                btn.innerHTML = '<i data-lucide="check" class="w-4 h-4 inline mr-2"></i>Completed!';
                
                setTimeout(() => {
                    btn.disabled = false;
                    btn.innerHTML = '<i data-lucide="zap" class="w-4 h-4 inline mr-2"></i>Execute All Signals';
                }, 3000);
                
            } catch (error) {
                this.showNotification('❌ Execution failed: ' + error.message, 'error');
                btn.disabled = false;
                btn.innerHTML = '<i data-lucide="zap" class="w-4 h-4 inline mr-2"></i>Execute All Signals';
            }
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.hyperMindApp = new HyperMindApp();
    window.hyperMindApp.init();
});

// Global functions for buttons (needed by HTML onclick handlers)
window.executeAllSignals = () => {
    if (window.hyperMindApp) {
        window.hyperMindApp.executeAllSignals();
    }
};

console.log('🔥 HyperMind AI Web3 Integration Loaded!');
