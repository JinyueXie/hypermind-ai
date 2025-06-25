#!/usr/bin/env python3
"""
Improved HyperMind AI Agent Runner
Provides better output formatting and multiple testing modes
"""
import asyncio
import os
import sys
import json
from pathlib import Path
from datetime import datetime

# Add current directory to Python path
sys.path.append(str(Path(__file__).parent))

from hypermind_ai import HyperMindAI

def print_banner():
    """Print the HyperMind AI banner"""
    banner = """
╔══════════════════════════════════════════════════════════════╗
║                    🧠 HYPERMIND AI 🚀                        ║
║                Advanced Trading Signal Generator              ║
║                    with Alith Integration                     ║
╚══════════════════════════════════════════════════════════════╝
"""
    print(banner)

def print_signal_analysis(result: dict):
    """Pretty print signal analysis"""
    if not result['success']:
        print(f"❌ Analysis failed for {result['pair']}: {result['error']}")
        return
    
    signal = result['signal']
    technical = result['technical_analysis']
    
    print(f"\n{'='*60}")
    print(f"📊 ANALYSIS: {result['pair']}")
    print(f"{'='*60}")
    
    # Signal Summary
    signal_emoji = {"BUY": "🟢", "SELL": "🔴", "HOLD": "🟡"}
    print(f"\n🎯 TRADING SIGNAL")
    print(f"   Signal: {signal_emoji.get(signal['signal'], '⚪')} {signal['signal']}")
    print(f"   Confidence: {signal['confidence']*100:.1f}%")
    print(f"   Timestamp: {signal['timestamp'][:19]}")
    
    # Technical Analysis
    print(f"\n📈 TECHNICAL INDICATORS")
    print(f"   RSI: {technical['rsi']:.1f}")
    print(f"   Trend: {technical['trend']}")
    print(f"   Volatility: {technical['volatility']:.2f}%")
    print(f"   Support: ${technical['support_level']:.4f}")
    print(f"   Resistance: ${technical['resistance_level']:.4f}")
    
    if technical['patterns']:
        print(f"   Patterns: {', '.join(technical['patterns'])}")
    
    # AI Analysis (truncated)
    print(f"\n🤖 AI ANALYSIS")
    analysis_text = result['analysis']
    if len(analysis_text) > 300:
        print(f"   {analysis_text[:300]}...")
    else:
        print(f"   {analysis_text}")
    
    # Blockchain Status
    blockchain_status = "✅ Submitted" if result['blockchain_submitted'] else "❌ Failed"
    print(f"\n⛓️  BLOCKCHAIN: {blockchain_status}")

async def single_pair_analysis():
    """Analyze a single trading pair"""
    print("🔍 Single Pair Analysis Mode")
    
    agent = HyperMindAI()
    pair = "ETH/USDC"
    
    print(f"Analyzing {pair}...")
    result = await agent.analyze_pair(pair)
    
    print_signal_analysis(result)

async def batch_analysis():
    """Analyze multiple trading pairs"""
    print("📊 Batch Analysis Mode")
    
    agent = HyperMindAI()
    pairs = ["ETH/USDC", "BTC/USDT", "MATIC/USDC"]
    
    print(f"Analyzing {len(pairs)} trading pairs...")
    results = await agent.batch_analysis(pairs)
    
    print(f"\n{'='*60}")
    print("📋 BATCH ANALYSIS SUMMARY")
    print(f"{'='*60}")
    
    successful = 0
    for result in results:
        pair_result = result['result']
        if pair_result['success']:
            successful += 1
            signal = pair_result['signal']
            print(f"✅ {result['pair']}: {signal['signal']} ({signal['confidence']*100:.0f}% confidence)")
        else:
            print(f"❌ {result['pair']}: Analysis failed")
    
    print(f"\nSuccess Rate: {successful}/{len(results)} ({successful/len(results)*100:.1f}%)")
    
    # Show detailed analysis for each pair
    for result in results:
        print_signal_analysis(result['result'])

async def competition_mode():
    """Competition-ready signal generation"""
    print("🏆 Competition Mode - High-Frequency Signal Generation")
    
    agent = HyperMindAI()
    pairs = ["ETH/USDC", "BTC/USDT", "MATIC/USDC", "LINK/USDT", "UNI/USDC"]
    
    print(f"Generating signals for {len(pairs)} pairs...")
    
    all_signals = []
    for pair in pairs:
        result = await agent.analyze_pair(pair)
        if result['success']:
            all_signals.append(result['signal'])
    
    # Save signals to file
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"hypermind_signals_{timestamp}.json"
    
    with open(filename, 'w') as f:
        json.dump(all_signals, f, indent=2, default=str)
    
    print(f"\n📁 Signals saved to: {filename}")
    print(f"🚀 Generated {len(all_signals)} trading signals!")
    
    # Show summary
    buy_signals = sum(1 for s in all_signals if s['signal'] == 'BUY')
    sell_signals = sum(1 for s in all_signals if s['signal'] == 'SELL')
    hold_signals = sum(1 for s in all_signals if s['signal'] == 'HOLD')
    
    print(f"\n📊 Signal Distribution:")
    print(f"   🟢 BUY: {buy_signals}")
    print(f"   🔴 SELL: {sell_signals}")
    print(f"   🟡 HOLD: {hold_signals}")

async def main():
    """Main function with mode selection"""
    print_banner()
    
    if len(sys.argv) > 1:
        mode = sys.argv[1].lower()
    else:
        print("Available modes:")
        print("  single    - Analyze single pair (ETH/USDC)")
        print("  batch     - Analyze multiple pairs")
        print("  compete   - Competition mode with signal export")
        print()
        mode = input("Select mode (single/batch/compete) [single]: ").lower() or "single"
    
    try:
        if mode == "batch":
            await batch_analysis()
        elif mode == "compete":
            await competition_mode()
        else:
            await single_pair_analysis()
            
    except KeyboardInterrupt:
        print("\n⚠️ Analysis interrupted by user")
    except Exception as e:
        print(f"\n❌ Error: {e}")
        print("💡 Check your .env file and config settings")

if __name__ == "__main__":
    asyncio.run(main())
