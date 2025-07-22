# Broka256 Deployment & Git Troubleshooting Guide

## 🚨 Current Issues Analysis

### Git Push Failure Investigation

Based on the 17-hour gap since last successful push, here are the most likely causes:

#### 1. Authentication Issues
\`\`\`bash
# Check current Git configuration
git config --list | grep user
git config --list | grep remote

# Verify remote repository URL
git remote -v

# Test authentication
git ls-remote origin
\`\`\`

#### 2. Repository Access Problems
\`\`\`bash
# Check if you have write access
git push --dry-run origin main

# Verify branch tracking
git branch -vv

# Check for upstream issues
git status
\`\`\`

#### 3. Local Repository State
\`\`\`bash
# Check for uncommitted changes
git status

# Check for merge conflicts
git log --oneline -10

# Verify working directory is clean
git diff --cached
\`\`\`

## 🔧 Step-by-Step Resolution

### Phase 1: Git Repository Diagnosis

1. **Check Repository Status**
\`\`\`bash
cd /path/to/broka256
git status
git log --oneline -5
git remote -v
\`\`\`

2. **Verify Authentication**
\`\`\`bash
# For HTTPS (recommended)
git config --global credential.helper store
git push origin main

# For SSH
ssh -T git@github.com
\`\`\`

3. **Fix Common Issues**
\`\`\`bash
# If behind remote
git pull origin main --rebase

# If diverged
git pull origin main --allow-unrelated-histories

# If authentication failed
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
\`\`\`

### Phase 2: Vercel Deployment Setup

1. **Install Vercel CLI**
\`\`\`bash
npm install -g vercel@latest
vercel login
\`\`\`

2. **Initialize Vercel Project**
\`\`\`bash
cd /path/to/broka256
vercel init
\`\`\`

3. **Configure Environment Variables**
\`\`\`bash
# Set production environment variables
vercel env add NEXT_PUBLIC_API_URL production
vercel env add NEXT_PUBLIC_SOCKET_URL production
\`\`\`

### Phase 3: Backend Deployment (Render)

1. **Verify Render Configuration**
\`\`\`yaml
# server/render.yaml should exist with correct settings
services:
  - type: web
    name: broka256-backend
    env: node
    plan: free
    buildCommand: npm install
    startCommand: npm start
    healthCheckPath: /api/health
\`\`\`

2. **Test Backend Locally**
\`\`\`bash
cd server
npm install
npm start
# Should start on port 5000
\`\`\`

## 🚀 Complete Deployment Process

### Step 1: Resolve Git Issues

\`\`\`bash
# Navigate to project directory
cd /path/to/broka256

# Check current status
git status

# Add all changes
git add .

# Commit changes
git commit -m "Fix: Resolve deployment configuration and Git issues"

# Force push if necessary (use with caution)
git push origin main --force-with-lease
\`\`\`

### Step 2: Deploy Backend to Render

1. **Push to GitHub** (must be resolved first)
\`\`\`bash
git push origin main
\`\`\`

2. **Configure Render Service**
- Go to https://render.com
- Connect GitHub repository
- Select `server` as root directory
- Set environment variables from `.env.example`

3. **Required Environment Variables for Render**
\`\`\`
NODE_ENV=production
PORT=10000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/broka256
JWT_SECRET=your_super_secure_jwt_secret_key_here
CLIENT_URL=https://broka256.vercel.app
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
TWILIO_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE=your_twilio_phone_number
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
\`\`\`

### Step 3: Deploy Frontend to Vercel

1. **Deploy via CLI**
\`\`\`bash
# From project root
vercel --prod
\`\`\`

2. **Or Deploy via Dashboard**
- Go to https://vercel.com
- Import GitHub repository
- Configure build settings:
  - Framework: Next.js
  - Root Directory: ./
  - Build Command: npm run build
  - Output Directory: .next

3. **Set Environment Variables in Vercel**
\`\`\`
NEXT_PUBLIC_API_URL=https://your-render-service.onrender.com
NEXT_PUBLIC_SOCKET_URL=https://your-render-service.onrender.com
\`\`\`

## 🔍 Common Error Solutions

### Git Push Errors

#### Error: "Permission denied (publickey)"
\`\`\`bash
# Generate new SSH key
ssh-keygen -t ed25519 -C "your.email@example.com"
# Add to GitHub: Settings > SSH and GPG keys
\`\`\`

#### Error: "Updates were rejected"
\`\`\`bash
# Pull latest changes first
git pull origin main --rebase
git push origin main
\`\`\`

#### Error: "Authentication failed"
\`\`\`bash
# Use personal access token
git remote set-url origin https://username:token@github.com/username/repo.git
\`\`\`

### Vercel Deployment Errors

#### Error: "Build failed"
\`\`\`bash
# Check build locally
npm run build

# Fix TypeScript errors
npm run lint
\`\`\`

#### Error: "Environment variables not found"
- Verify all NEXT_PUBLIC_ variables are set in Vercel dashboard
- Check variable names match exactly

### Render Deployment Errors

#### Error: "Build failed"
- Check Node.js version compatibility
- Verify package.json in server directory
- Check build logs for specific errors

#### Error: "Health check failed"
\`\`\`javascript
// Add to server.js
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});
\`\`\`

## 📋 Deployment Checklist

### Pre-Deployment
- [ ] All code committed and pushed to GitHub
- [ ] Environment variables configured
- [ ] Build passes locally (`npm run build`)
- [ ] Tests pass (if any)
- [ ] Dependencies updated

### Backend Deployment (Render)
- [ ] Service created and connected to GitHub
- [ ] Environment variables set
- [ ] Build completes successfully
- [ ] Health check endpoint responds
- [ ] Database connection works

### Frontend Deployment (Vercel)
- [ ] Project imported from GitHub
- [ ] Build settings configured
- [ ] Environment variables set
- [ ] Domain configured (if custom)
- [ ] SSL certificate active

### Post-Deployment Testing
- [ ] Frontend loads without errors
- [ ] API endpoints respond correctly
- [ ] Database operations work
- [ ] Real-time features function (Socket.io)
- [ ] Image uploads work (Cloudinary)
- [ ] Email notifications send
- [ ] SMS notifications send (if configured)

## 🆘 Emergency Recovery

If deployment fails completely:

1. **Rollback Strategy**
\`\`\`bash
# Revert to last working commit
git log --oneline -10
git reset --hard <last-working-commit>
git push origin main --force-with-lease
\`\`\`

2. **Alternative Deployment**
\`\`\`bash
# Deploy specific branch
vercel --prod --branch main

# Deploy with different configuration
vercel --prod --env NODE_ENV=production
\`\`\`

## 📞 Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Render Docs**: https://render.com/docs
- **Git Troubleshooting**: https://docs.github.com/en/authentication/troubleshooting-ssh
- **Next.js Deployment**: https://nextjs.org/docs/deployment

## 🔄 Monitoring & Maintenance

### Set Up Monitoring
1. **Vercel Analytics**: Enable in project settings
2. **Render Monitoring**: Check service health regularly
3. **Error Tracking**: Consider Sentry integration

### Regular Maintenance
- Update dependencies monthly
- Rotate API keys quarterly
- Monitor performance metrics
- Check error logs weekly
