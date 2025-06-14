#!/bin/bash
# Quick deployment script

echo "🚀 Deploying HyperMind AI..."

# Add all changes
git add .

# Commit with timestamp
git commit -m "🚀 Deploy update - $(date '+%Y-%m-%d %H:%M:%S')"

# Push to GitHub
git push origin main

echo "✅ Deployed successfully!"
echo "🌐 Live at: https://$(git config --get remote.origin.url | sed 's/.*github.com[:/]\([^/]*\)\/\([^.]*\).*/\1.github.io\/\2/')/"
