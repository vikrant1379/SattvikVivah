#!/bin/bash

# Netlify Deployment Script for SattvikVivah
# This script automates the build and deployment process

set -e  # Exit on any error

echo "🚀 Starting Netlify deployment for SattvikVivah..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run type checking
echo "🔍 Running type checks..."
npm run type-check

# Run linting
echo "🧹 Running linting..."
npm run lint:check

# Build the client
echo "🏗️ Building client..."
npm run build:client

# Check if build was successful
if [ ! -d "dist/public" ]; then
    echo "❌ Error: Build failed. dist/public directory not found."
    exit 1
fi

echo "✅ Build completed successfully!"

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "⚠️  Netlify CLI not found. Installing..."
    npm install -g netlify-cli
fi

# Deploy to Netlify
echo "🚀 Deploying to Netlify..."
netlify deploy --prod --dir=dist/public

echo "🎉 Deployment completed!"
echo "📝 Don't forget to:"
echo "   1. Set up environment variables in Netlify dashboard"
echo "   2. Configure your database connection"
echo "   3. Set up a custom domain (optional)"
