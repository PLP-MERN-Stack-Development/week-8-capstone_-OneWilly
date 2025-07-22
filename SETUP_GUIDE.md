# 📧📱 Complete Setup Guide for Email & SMS Notifications

This guide will help you set up all 5 environment variables needed for Broka256's notification system. Don't worry - I'll explain everything step by step!

## 🎯 What We're Setting Up

1. **EMAIL_USER** - Your Gmail address for sending emails
2. **EMAIL_PASS** - Special password for your Gmail account
3. **TWILIO_SID** - Your Twilio account identifier
4. **TWILIO_AUTH_TOKEN** - Your Twilio secret key
5. **TWILIO_PHONE** - Phone number for sending SMS

## 📧 Part 1: Setting Up Gmail (EMAIL_USER & EMAIL_PASS)

### Step 1: Prepare Your Gmail Account

1. **Use existing Gmail or create new one**
   - Go to [gmail.com](https://gmail.com)
   - Sign in or create account
   - **Recommendation**: Use a dedicated email like `broka256notifications@gmail.com`

2. **Enable 2-Factor Authentication (REQUIRED!)**
   - Go to [myaccount.google.com](https://myaccount.google.com)
   - Click "Security" in left menu
   - Find "2-Step Verification" and click "Get Started"
   - Follow the setup process (you'll need your phone)
   - **This is mandatory** - Gmail won't give app passwords without 2FA

### Step 2: Generate App Password

1. **Go to App Passwords**
   - Still in Google Account → Security
   - Look for "App passwords" (appears only after 2FA is enabled)
   - Click on "App passwords"

2. **Create New App Password**
   - Select app: Choose "Mail"
   - Select device: Choose "Other (custom name)"
   - Type: "Broka256 Notifications"
   - Click "Generate"

3. **Copy the 16-Character Password**
   - Google will show a 16-character password like: `abcd efgh ijkl mnop`
   - **Copy this exactly** - you'll need it for EMAIL_PASS
   - **Important**: This is NOT your regular Gmail password!

### Step 3: Test Your Gmail Setup

Create a test file to verify Gmail works:

\`\`\`javascript
// test-email.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',        // Replace with your Gmail
    pass: 'your-16-char-app-password'    // Replace with app password
  }
});

// Test email
transporter.sendMail({
  from: 'your-email@gmail.com',
  to: 'your-email@gmail.com',  // Send to yourself for testing
  subject: 'Broka256 Email Test',
  html: '<h1>Success!</h1><p>Gmail is working correctly!</p>'
}, (error, info) => {
  if (error) {
    console.log('Error:', error);
  } else {
    console.log('Email sent successfully!');
  }
});
\`\`\`

Run the test:
\`\`\`bash
node test-email.js
\`\`\`

## 📱 Part 2: Setting Up Twilio (TWILIO_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE)

### Step 1: Create Twilio Account

1. **Sign Up**
   - Go to [twilio.com](https://twilio.com)
   - Click "Sign up for free"
   - Fill in your details
   - **Use your real phone number** - Twilio will verify it

2. **Verify Your Account**
   - Twilio will send you a verification code
   - Enter the code to activate your account
   - You'll get **$15 free credit** to start!

### Step 2: Get Your Credentials

1. **Find Your Account SID and Auth Token**
   - After logging in, you'll see the Twilio Console
   - On the main dashboard, look for "Account Info" section
   - **Account SID**: Starts with "AC..." (like `ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)
   - **Auth Token**: Click the eye icon to reveal it
   - **Copy both values** - you'll need them

### Step 3: Buy a Phone Number

1. **Go to Phone Numbers**
   - In Twilio Console, click "Phone Numbers" in left menu
   - Click "Manage" → "Buy a number"

2. **Choose Your Number**
   - **Country**: Select "Uganda (+256)" if available
   - **If Uganda not available**: Choose "United States (+1)" - it still works for Uganda
   - **Capabilities**: Make sure "SMS" is checked
   - **Cost**: About $1/month

3. **Purchase the Number**
   - Click "Buy" on a number you like
   - **Copy the full number** (like `+1234567890` or `+256700123456`)
   - This is your TWILIO_PHONE value

### Step 4: Test Your Twilio Setup

Create a test file:

\`\`\`javascript
// test-sms.js
const twilio = require('twilio');

const client = twilio(
  'your-account-sid',     // Replace with your Account SID
  'your-auth-token'       // Replace with your Auth Token
);

// Test SMS
client.messages.create({
  body: 'Hello from Broka256! SMS is working correctly!',
  from: '+1234567890',    // Replace with your Twilio phone number
  to: '+256700123456'     // Replace with your Uganda phone number
})
.then(message => {
  console.log('SMS sent successfully!');
  console.log('Message SID:', message.sid);
})
.catch(error => {
  console.log('Error:', error);
});
\`\`\`

Run the test:
\`\`\`bash
npm install twilio
node test-sms.js
\`\`\`

## 🔧 Part 3: Adding Variables to Render

### Step 1: Go to Your Render Service

1. **Login to Render**
   - Go to [render.com](https://render.com)
   - Sign in to your account

2. **Find Your Broka256 Service**
   - Click on your `broka256-backend` service
   - Go to "Environment" tab

### Step 2: Add All 5 Variables

Click "Add Environment Variable" for each:

1. **EMAIL_USER**
   - Key: `EMAIL_USER`
   - Value: `your-email@gmail.com` (your Gmail address)

2. **EMAIL_PASS**
   - Key: `EMAIL_PASS`
   - Value: `abcd efgh ijkl mnop` (your 16-character app password)

3. **TWILIO_SID**
   - Key: `TWILIO_SID`
   - Value: `ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` (your Account SID)

4. **TWILIO_AUTH_TOKEN**
   - Key: `TWILIO_AUTH_TOKEN`
   - Value: `your-auth-token` (your Auth Token)

5. **TWILIO_PHONE**
   - Key: `TWILIO_PHONE`
   - Value: `+1234567890` (your Twilio phone number)

### Step 3: Deploy

- Click "Save Changes"
- Render will automatically redeploy your service
- Wait for deployment to complete (green checkmark)

## ✅ Part 4: Testing Everything

### Test Notification Function

Create this test in your backend:

\`\`\`javascript
// test-notifications.js
const { sendNotification } = require('./services/notificationService');

// Test with a real user ID from your database
const testUserId = 'your-user-id-here';

// Test email and SMS
sendNotification(
  testUserId,
  'new_message',
  'This is a test notification from Broka256!',
  {
    propertyTitle: 'Test Property',
    propertyId: 'test-123'
  }
);

console.log('Test notification sent!');
\`\`\`

### Check Your Logs

In Render dashboard:
1. Go to your service
2. Click "Logs" tab
3. Look for success messages like:
   - `Email sent to: your-email@gmail.com`
   - `SMS sent to: +256700123456`

## 💰 Cost Breakdown

### Gmail
- **Cost**: FREE
- **Limits**: 500 emails/day (more than enough)

### Twilio
- **Phone Number**: ~$1/month
- **SMS Cost**: ~$0.0075 per SMS to Uganda
- **Monthly Budget**: $5-10 covers hundreds of SMS

### Total Monthly Cost: $1-10

## 🔍 Troubleshooting

### Gmail Issues

**Problem**: "Username and Password not accepted"
- **Solution**: Make sure you're using the 16-character app password, not your regular Gmail password
- **Check**: 2FA must be enabled first

**Problem**: "Less secure app access"
- **Solution**: Use app passwords instead - they're more secure

### Twilio Issues

**Problem**: "Authentication Error"
- **Solution**: Double-check your Account SID and Auth Token
- **Check**: Make sure there are no extra spaces

**Problem**: "Phone number not verified"
- **Solution**: In Twilio Console, verify the recipient phone number first (for trial accounts)

**Problem**: SMS not delivered to Uganda
- **Solution**: Make sure the number format is correct: `+256700123456`

### General Issues

**Problem**: Environment variables not working
- **Solution**: 
  1. Check spelling of variable names
  2. Restart your Render service
  3. Check logs for error messages

**Problem**: Notifications not sending
- **Solution**:
  1. Check user has email/phone in database
  2. Verify all 5 environment variables are set
  3. Check Render logs for errors

## 🎉 Success Indicators

You'll know everything is working when:

1. **Email Test**: You receive a test email in your Gmail
2. **SMS Test**: You receive a test SMS on your phone
3. **Render Logs**: Show "Email sent" and "SMS sent" messages
4. **User Experience**: Users get notifications for new messages, property approvals, etc.

## 📞 Support

If you get stuck:

1. **Gmail Help**: [support.google.com](https://support.google.com)
2. **Twilio Help**: [help.twilio.com](https://help.twilio.com)
3. **Render Help**: [render.com/docs](https://render.com/docs)

## 🚀 Next Steps

Once notifications are working:

1. **Test with real users** - Have friends sign up and test
2. **Monitor usage** - Check Twilio usage dashboard
3. **Customize templates** - Modify email templates in `notificationService.js`
4. **Add WhatsApp** - Future enhancement using WhatsApp Business API

Congratulations! Your Broka256 app now has professional email and SMS notifications! 🎊
