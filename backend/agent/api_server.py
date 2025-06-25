#!/usr/bin/env python3
"""
HyperMind AI - FastAPI Server
Advanced Trading Signal Generator with Alith Integration
"""

import os
import sys
import uvicorn
import logging
from contextlib import asynccontextmanager
from typing import List, Optional
from datetime import datetime

# Add the current directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Check for required dependencies
try:
    from fastapi import FastAPI, HTTPException
    from fastapi.middleware.cors import CORSMiddleware
    from pydantic import BaseModel
except ImportError as e:
    print(f"⚠️ FastAPI dependencies missing: {e}")
    print("📦 Install with: pip install fastapi[all] uvicorn pydantic")
    sys.exit(1)

try:
    from hypermind_ai import HyperMindAI
except ImportError as e:
    print(f"❌ Failed to import HyperMindAI: {e}")
    sys.exit(1)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Global HyperMind AI instance
hypermind_ai = None

# Pydantic models for API requests/responses
class SignalRequest(BaseModel):
    pair: str = "ETH/USDC"

class BatchRequest(BaseModel):
    pairs: List[str] = ["ETH/USDC", "BTC/USDT", "MATIC/USDC"]

class SignalResponse(BaseModel):
    success: bool
    pair: str
    signal: Optional[dict] = None
    error: Optional[str] = None
    timestamp: str

class BatchResponse(BaseModel):
    success: bool
    results: List[dict]
    summary: dict
    timestamp: str

class HealthResponse(BaseModel):
    status: str
    version: str
    alith_status: str
    timestamp: str

# Lifespan event handler (modern FastAPI approach)
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    global hypermind_ai
    logger.info("🚀 Starting HyperMind AI API Server...")
    
    try:
        hypermind_ai = HyperMindAI()
        logger.info("✅ HyperMind AI Agent initialized")
    except Exception as e:
        logger.error(f"❌ Failed to initialize HyperMind AI: {e}")
        raise
    
    yield
    
    # Shutdown
    logger.info("🛑 Shutting down HyperMind AI API Server...")

# Create FastAPI app with lifespan
app = FastAPI(
    title="HyperMind AI Trading API",
    description="Advanced AI-powered trading signal generator with Alith integration",
    version="1.0.0",
    lifespan=lifespan
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", response_model=dict)
async def root():
    """Welcome endpoint"""
    return {
        "message": "🧠 HyperMind AI Trading API",
        "version": "1.0.0",
        "status": "operational",
        "endpoints": {
            "health": "/health",
            "signal": "/signal",
            "batch": "/batch",
            "pairs": "/pairs",
            "latest": "/signals/latest",
            "docs": "/docs"
        }
    }

@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint"""
    try:
        alith_status = "available" if hypermind_ai.agent else "unavailable"
        return HealthResponse(
            status="healthy",
            version="1.0.0",
            alith_status=alith_status,
            timestamp=datetime.utcnow().isoformat()
        )
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Service unhealthy: {str(e)}")

@app.post("/signal", response_model=SignalResponse)
async def generate_signal(request: SignalRequest):
    """Generate trading signal for a single pair"""
    try:
        logger.info(f"🔍 Generating signal for {request.pair}")
        
        # Call the method and handle both sync and async cases
        result = hypermind_ai.analyze_pair(request.pair)
        
        # Check if result is a coroutine (async function was called)
        if hasattr(result, '__await__'):
            # It's a coroutine, await it
            result = await result
        
        return SignalResponse(
            success=result.get("success", False),
            pair=request.pair,
            signal=result.get("signal"),
            error=result.get("error"),
            timestamp=datetime.utcnow().isoformat()
        )
    except Exception as e:
        logger.error(f"❌ Signal generation failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/batch", response_model=BatchResponse)
async def batch_analysis(request: BatchRequest):
    """Generate signals for multiple pairs"""
    try:
        logger.info(f"📊 Running batch analysis for {len(request.pairs)} pairs")
        
        results = []
        for pair in request.pairs:
            try:
                # Call the method and handle both sync and async cases
                result = hypermind_ai.analyze_pair(pair)
                
                # Check if result is a coroutine (async function was called)
                if hasattr(result, '__await__'):
                    # It's a coroutine, await it
                    result = await result
                
                results.append({
                    "pair": pair,
                    "result": result
                })
            except Exception as e:
                results.append({
                    "pair": pair,
                    "result": {"success": False, "error": str(e)}
                })
        
        # Generate summary
        successful = [r for r in results if r["result"].get("success")]
        summary = {
            "total": len(request.pairs),
            "successful": len(successful),
            "failed": len(request.pairs) - len(successful),
            "success_rate": len(successful) / len(request.pairs) if request.pairs else 0
        }
        
        return BatchResponse(
            success=True,
            results=results,
            summary=summary,
            timestamp=datetime.utcnow().isoformat()
        )
    except Exception as e:
        logger.error(f"❌ Batch analysis failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/pairs")
async def get_supported_pairs():
    """Get list of supported trading pairs"""
    try:
        supported_pairs = [
            "ETH/USDC", "BTC/USDT", "MATIC/USDC", 
            "LINK/USDT", "UNI/USDC", "AAVE/USDT",
            "SOL/USDC", "ADA/USDT", "DOT/USDC"
        ]
        
        return {
            "supported_pairs": supported_pairs,
            "count": len(supported_pairs),
            "timestamp": datetime.utcnow().isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/signals/latest")
async def get_latest_signals():
    """Get latest generated signals"""
    try:
        # This is a placeholder - you could implement signal storage/retrieval
        return {
            "signals": [],
            "message": "Signal history not implemented yet",
            "timestamp": datetime.utcnow().isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    print("✅ Alith SDK imported successfully" if 'alith' in sys.modules else "⚠️ Alith SDK not available")
    print("🌐 Starting HyperMind AI API Server on http://localhost:8000")
    print("📚 API docs available at: http://localhost:8000/docs")
    
    uvicorn.run(
        "api_server:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
