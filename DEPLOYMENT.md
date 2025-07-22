# Broka256 Deployment Guide

## Overview
This guide covers deploying Broka256 to production using Render (backend) and Vercel (frontend).

## Prerequisites
- Node.js 18+ installed
- Git repository on GitHub
- MongoDB Atlas account
- Render account
- Vercel account

## Backend Deployment (Render)

### 1. Prepare MongoDB Atlas
1. Create a MongoDB Atlas account at https://cloud.mongodb.com
2. Create a new cluster (free tier is sufficient)
3. Create a database user with read/write permissions
4. Get your connection string (replace `<password>` with actual password)
5. Whitelist all IP addresses (0.0.0.0/0) for development

### 2. Deploy to Render
1. Push your code to GitHub
2. Go to https://render.com and sign up/login
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure the service:
   - **Name**: `broka256-backend`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

### 3. Set Environment Variables in Render
Go to your service → Environment tab and add:

\`\`\`
NODE_ENV=production
PORT=10000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secure_jwt_secret_key_here
CLIENT_URL=https://your-vercel-app.vercel.app
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
\`\`\`

### 4. Deploy
Click "Create Web Service" and wait for deployment to complete.

## Frontend Deployment (Vercel)

### 1. Install Vercel CLI
\`\`\`bash
npm install -g vercel
\`\`\`

### 2. Login to Vercel
\`\`\`bash
vercel login
\`\`\`

### 3. Deploy from Project Root
\`\`\`bash
cd your-project-directory
vercel
\`\`\`

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N**
- Project name: `broka256`
- In which directory is your code located? **./** (current directory)

### 4. Set Environment Variables in Vercel
Go to your Vercel dashboard → Project → Settings → Environment Variables

Add these variables:
\`\`\`
NEXT_PUBLIC_API_URL=https://your-render-service.onrender.com
\`\`\`

**Note**: Only add environment variables that start with `NEXT_PUBLIC_` to the Vercel dashboard. Other sensitive variables should be handled server-side.

### 5. Redeploy for Production
\`\`\`bash
vercel --prod
\`\`\`

## Required External Services

### MongoDB Atlas (Database)
- Free tier: 512MB storage
- Setup: Create cluster → Database Access → Network Access
- Get connection string for MONGO_URI

### Cloudinary (Image Storage)
- Free tier: 25GB storage, 25GB bandwidth
- Setup: Create account → Dashboard → Copy credentials
- Used for property image uploads

### Gmail (Email Notifications)
- Setup: Enable 2FA → Generate App Password
- Use app password for EMAIL_PASS variable

## Post-Deployment Checklist

### Backend (Render)
- [ ] Service is running without errors
- [ ] Health check endpoint responds: `GET /api/health`
- [ ] Database connection is successful
- [ ] Environment variables are set correctly

### Frontend (Vercel)
- [ ] Site loads without errors
- [ ] API calls to backend work
- [ ] Environment variables are configured
- [ ] All pages render correctly

### Testing
- [ ] User registration/login works
- [ ] Property listing creation works
- [ ] Image uploads function
- [ ] Search and filtering work
- [ ] Responsive design on mobile

## Troubleshooting

### Common Backend Issues
1. **Build fails**: Check Node.js version compatibility
2. **Database connection fails**: Verify MongoDB URI and network access
3. **Environment variables missing**: Double-check all required vars are set

### Common Frontend Issues
1. **API calls fail**: Verify NEXT_PUBLIC_API_URL is correct
2. **Build fails**: Check for TypeScript errors
3. **Images don't load**: Verify Cloudinary configuration

### Performance Optimization
1. **Enable caching**: Configure Redis for session storage
2. **Image optimization**: Use Cloudinary transformations
3. **Database indexing**: Add indexes for search queries

## Monitoring and Maintenance

### Render Monitoring
- Check service logs regularly
- Monitor resource usage
- Set up uptime monitoring

### Vercel Analytics
- Enable Vercel Analytics for performance insights
- Monitor Core Web Vitals
- Track user engagement

## Security Considerations

### Environment Variables
- Never commit sensitive data to Git
- Use different secrets for production
- Rotate secrets regularly

### Database Security
- Use strong passwords
- Enable MongoDB Atlas security features
- Regular backups

### API Security
- Implement rate limiting
- Use HTTPS only
- Validate all inputs

## Scaling Considerations

### When to Upgrade
- Render: Upgrade when hitting memory/CPU limits
- Vercel: Pro plan for team features and higher limits
- MongoDB: Upgrade for more storage/performance

### Performance Monitoring
- Set up error tracking (Sentry)
- Monitor API response times
- Track user metrics

## Support
For deployment issues:
- Render: https://render.com/docs
- Vercel: https://vercel.com/docs
- MongoDB Atlas: https://docs.atlas.mongodb.com

## Production URLs
- Frontend: https://your-app.vercel.app
- Backend API: https://your-service.onrender.com
- Admin Dashboard: https://your-app.vercel.app/admin
