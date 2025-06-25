#!/usr/bin/env python3
import sys
sys.path.append('.')

from hypermind_ai import HyperMindAI

print("🧪 Testing HyperMind AI analyze_pair method...")

try:
    # Initialize the agent
    agent = HyperMindAI()
    print("✅ Agent initialized")
    
    # Test analyze_pair
    result = agent.analyze_pair("ETH/USDC")
    print(f"✅ analyze_pair returned: {type(result)}")
    print(f"📊 Result success: {result.get('success', False)}")
    
    if result.get('success'):
        print("🎉 Method working correctly!")
    else:
        print(f"❌ Error: {result.get('error', 'Unknown error')}")
        
except Exception as e:
    print(f"❌ Test failed: {e}")
    import traceback
    traceback.print_exc()
