#!/bin/bash

# Broka256 Deployment Script
# Run this script to deploy both frontend and backend

set -e  # Exit on any error

echo "🚀 Starting Broka256 Deployment Process..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root."
    exit 1
fi

# Check if git is clean
if [ -n "$(git status --porcelain)" ]; then
    print_warning "You have uncommitted changes. Committing them now..."
    git add .
    git commit -m "Auto-commit before deployment: $(date)"
fi

# Step 1: Test build locally
print_status "Testing local build..."
npm run build
if [ $? -ne 0 ]; then
    print_error "Local build failed. Please fix errors before deploying."
    exit 1
fi

# Step 2: Push to GitHub
print_status "Pushing to GitHub..."
git push origin main
if [ $? -ne 0 ]; then
    print_error "Git push failed. Please resolve conflicts and try again."
    exit 1
fi

# Step 3: Deploy to Vercel
print_status "Deploying to Vercel..."
if command -v vercel &> /dev/null; then
    vercel --prod --confirm
    if [ $? -eq 0 ]; then
        print_status "✅ Frontend deployed successfully to Vercel!"
    else
        print_error "Vercel deployment failed."
        exit 1
    fi
else
    print_warning "Vercel CLI not found. Please install it: npm install -g vercel"
    print_status "Manual deployment required at: https://vercel.com"
fi

# Step 4: Check backend deployment
print_status "Checking backend deployment on Render..."
print_status "Please verify your backend is running at your Render URL"
print_status "Backend should be accessible at: https://your-service.onrender.com/api/health"

# Step 5: Run post-deployment checks
print_status "Running post-deployment checks..."

# Check if frontend is accessible
FRONTEND_URL="https://broka256.vercel.app"  # Update with your actual URL
if curl -f -s "$FRONTEND_URL" > /dev/null; then
    print_status "✅ Frontend is accessible"
else
    print_warning "⚠️  Frontend might not be accessible yet (DNS propagation)"
fi

print_status "🎉 Deployment process completed!"
print_status "Frontend: $FRONTEND_URL"
print_status "Backend: Check your Render dashboard"
print_status ""
print_status "Next steps:"
print_status "1. Test all functionality on the live site"
print_status "2. Monitor logs for any errors"
print_status "3. Update DNS records if using custom domain"
