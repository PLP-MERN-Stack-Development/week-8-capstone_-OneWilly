#!/bin/bash

# Broka256 Deployment Health Check Script

set -e

echo "🔍 Checking Broka256 Deployment Health..."

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# URLs (update these with your actual URLs)
FRONTEND_URL="https://broka256.vercel.app"
BACKEND_URL="https://your-service.onrender.com"

print_status() {
    echo -e "${GREEN}[✓]${NC} $1"
}

print_error() {
    echo -e "${RED}[✗]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[!]${NC} $1"
}

# Check frontend
echo "Checking frontend..."
if curl -f -s "$FRONTEND_URL" > /dev/null; then
    print_status "Frontend is accessible at $FRONTEND_URL"
else
    print_error "Frontend is not accessible at $FRONTEND_URL"
fi

# Check backend health endpoint
echo "Checking backend..."
if curl -f -s "$BACKEND_URL/api/health" > /dev/null; then
    print_status "Backend health check passed at $BACKEND_URL"
else
    print_error "Backend health check failed at $BACKEND_URL"
fi

# Check API endpoints
echo "Checking API endpoints..."
API_ENDPOINTS=(
    "/api/properties"
    "/api/auth/me"
    "/api/users"
)

for endpoint in "${API_ENDPOINTS[@]}"; do
    if curl -f -s "$BACKEND_URL$endpoint" > /dev/null; then
        print_status "API endpoint $endpoint is responding"
    else
        print_warning "API endpoint $endpoint might require authentication"
    fi
done

# Check environment variables (frontend)
echo "Checking frontend environment variables..."
if [ -n "$NEXT_PUBLIC_API_URL" ]; then
    print_status "NEXT_PUBLIC_API_URL is set"
else
    print_warning "NEXT_PUBLIC_API_URL might not be set"
fi

echo ""
echo "🎯 Deployment Health Check Complete!"
echo "If any checks failed, please review the deployment configuration."
