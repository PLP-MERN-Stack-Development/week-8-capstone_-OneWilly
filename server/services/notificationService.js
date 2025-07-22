const nodemailer = require("nodemailer")
const twilio = require("twilio")
const User = require("../models/User")
const Notification = require("../models/Notification")

// Email transporter configuration
// This creates a connection to Gmail's SMTP server using your credentials
const transporter = nodemailer.createTransport({
  service: "gmail", // Using Gmail as our email service
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address (e.g., yourname@gmail.com)
    pass: process.env.EMAIL_PASS, // Your Gmail App Password (16-character code)
  },
})

// SMS client configuration
// This creates a connection to Twilio's SMS service
const smsClient = twilio(
  process.env.TWILIO_SID, // Your Twilio Account SID
  process.env.TWILIO_AUTH_TOKEN, // Your Twilio Auth Token
)

/**
 * Main function to send notifications to users
 * @param {string} userId - The ID of the user to notify
 * @param {string} type - Type of notification (new_message, property_approved, etc.)
 * @param {string} message - The message content to send
 * @param {object} data - Additional data for the notification
 */
exports.sendNotification = async (userId, type, message, data = {}) => {
  let notification
  try {
    // First, get the user's information from the database
    const user = await User.findById(userId)
    if (!user) {
      console.log(`User not found: ${userId}`)
      return
    }

    console.log(`Sending ${type} notification to user: ${user.name}`)

    // Save notification to database for tracking
    notification = new Notification({
      user: userId,
      type: type,
      message: message,
      data: data,
      status: "pending",
    })
    await notification.save()

    // Send email notification if user has email
    if (user.email) {
      await sendEmailNotification(user, type, message, data)
      console.log(`Email sent to: ${user.email}`)
    }

    // Send SMS notification if user has phone number
    if (user.phone) {
      await sendSMSNotification(user, type, message)
      console.log(`SMS sent to: +256${user.phone}`)
    }

    // Update notification status to sent
    notification.status = "sent"
    notification.sentAt = new Date()
    await notification.save()
  } catch (error) {
    console.error("Notification send failed:", error)

    // Update notification status to failed
    if (notification) {
      notification.status = "failed"
      notification.error = error.message
      await notification.save()
    }
  }
}

/**
 * Send email notification with professional HTML template
 * @param {object} user - User object with email and name
 * @param {string} type - Notification type
 * @param {string} message - Message content
 * @param {object} data - Additional data
 */
async function sendEmailNotification(user, type, message, data) {
  // Create different email templates based on notification type
  let subject = ""
  let htmlContent = ""

  switch (type) {
    case "new_message":
      subject = "New Message on Broka256"
      htmlContent = createMessageEmailTemplate(user, message, data)
      break

    case "property_approved":
      subject = "Property Approved - Broka256"
      htmlContent = createPropertyApprovedTemplate(user, message, data)
      break

    case "subscription_reminder":
      subject = "Subscription Reminder - Broka256"
      htmlContent = createSubscriptionReminderTemplate(user, message)
      break

    default:
      subject = "Broka256 Notification"
      htmlContent = createDefaultEmailTemplate(user, message)
  }

  // Email configuration object
  const mailOptions = {
    from: `"Broka256" <${process.env.EMAIL_USER}>`, // Sender name and email
    to: user.email, // Recipient email
    subject: subject, // Email subject
    html: htmlContent, // HTML content
  }

  // Send the email
  await transporter.sendMail(mailOptions)
}

/**
 * Send SMS notification via Twilio
 * @param {object} user - User object with phone number
 * @param {string} type - Notification type
 * @param {string} message - Message content
 */
async function sendSMSNotification(user, type, message) {
  // Format phone number for Uganda (+256)
  const phoneNumber = `+256${user.phone}`

  // Create SMS message based on type
  let smsMessage = ""

  switch (type) {
    case "new_message":
      smsMessage = `Broka256: You have a new message about a property. Check the app for details.`
      break

    case "property_approved":
      smsMessage = `Broka256: Your property listing has been approved and is now live!`
      break

    case "subscription_reminder":
      smsMessage = `Broka256: Your free trial expires soon. Subscribe to continue listing properties.`
      break

    default:
      smsMessage = `Broka256: ${message.substring(0, 140)}...` // Limit to 140 characters
  }

  // Send SMS via Twilio
  await smsClient.messages.create({
    body: smsMessage, // SMS content
    from: process.env.TWILIO_PHONE, // Your Twilio phone number
    to: phoneNumber, // Recipient phone number
  })
}

/**
 * Create HTML email template for new messages
 */
function createMessageEmailTemplate(user, message, data) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; }
        .header { background-color: #2563eb; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .button { background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
        .footer { background-color: #f3f4f6; padding: 20px; text-align: center; color: #6b7280; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Broka256</h1>
        <p>Uganda's Premier Property Platform</p>
      </div>
      
      <div class="content">
        <h2>Hello ${user.name}!</h2>
        <p>You have received a new message about one of your properties:</p>
        
        <div style="background-color: #f9fafb; padding: 15px; border-left: 4px solid #2563eb; margin: 20px 0;">
          <p><strong>Property:</strong> ${data.propertyTitle || "Your Property"}</p>
          <p><strong>Message:</strong> ${message}</p>
        </div>
        
        <a href="${process.env.CLIENT_URL}/properties/${data.propertyId}" class="button">
          View Property & Reply
        </a>
        
        <p>Don't keep potential buyers waiting - respond quickly to increase your chances of a sale!</p>
      </div>
      
      <div class="footer">
        <p>You're receiving this email because you have an account on Broka256.</p>
        <p>Visit <a href="${process.env.CLIENT_URL}">broka256.com</a> to manage your notifications.</p>
      </div>
    </body>
    </html>
  `
}

/**
 * Create HTML email template for property approval
 */
function createPropertyApprovedTemplate(user, message, data) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; }
        .header { background-color: #10b981; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .success-badge { background-color: #10b981; color: white; padding: 8px 16px; border-radius: 20px; display: inline-block; }
        .button { background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
        .footer { background-color: #f3f4f6; padding: 20px; text-align: center; color: #6b7280; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🎉 Congratulations!</h1>
        <p>Your property has been approved</p>
      </div>
      
      <div class="content">
        <h2>Hello ${user.name}!</h2>
        
        <div class="success-badge">✓ APPROVED</div>
        
        <p>Great news! Your property listing has been reviewed and approved by our team:</p>
        
        <div style="background-color: #f0fdf4; padding: 15px; border-left: 4px solid #10b981; margin: 20px 0;">
          <p><strong>Property:</strong> ${data.propertyTitle}</p>
          <p><strong>Status:</strong> Now Live on Broka256</p>
          <p><strong>Approved on:</strong> ${new Date().toLocaleDateString()}</p>
        </div>
        
        <p>Your property is now visible to thousands of potential buyers across Uganda!</p>
        
        <a href="${process.env.CLIENT_URL}/properties/${data.propertyId}" class="button">
          View Your Live Listing
        </a>
        
        <h3>Next Steps:</h3>
        <ul>
          <li>Share your listing on social media</li>
          <li>Respond quickly to inquiries</li>
          <li>Keep your listing updated</li>
        </ul>
      </div>
      
      <div class="footer">
        <p>Thank you for choosing Broka256 - Uganda's trusted property platform.</p>
      </div>
    </body>
    </html>
  `
}

/**
 * Create HTML email template for subscription reminders
 */
function createSubscriptionReminderTemplate(user, message) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; }
        .header { background-color: #f59e0b; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .warning-box { background-color: #fef3c7; padding: 15px; border-left: 4px solid #f59e0b; margin: 20px 0; }
        .button { background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
        .footer { background-color: #f3f4f6; padding: 20px; text-align: center; color: #6b7280; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>⏰ Subscription Reminder</h1>
        <p>Don't lose access to your listings</p>
      </div>
      
      <div class="content">
        <h2>Hello ${user.name}!</h2>
        
        <div class="warning-box">
          <p><strong>⚠️ Your free trial is ending soon!</strong></p>
          <p>To continue listing properties and reaching buyers, please subscribe to our premium plan.</p>
        </div>
        
        <h3>Premium Benefits:</h3>
        <ul>
          <li>✓ Unlimited property listings</li>
          <li>✓ Priority search placement</li>
          <li>✓ SMS + Email notifications</li>
          <li>✓ WhatsApp integration</li>
          <li>✓ Advanced analytics</li>
          <li>✓ 24/7 customer support</li>
        </ul>
        
        <p><strong>Only UGX 6,000/month</strong> - Less than UGX 200 per day!</p>
        
        <a href="${process.env.CLIENT_URL}/pricing" class="button">
          Subscribe Now
        </a>
        
        <p>Questions? Reply to this email or call our support team.</p>
      </div>
      
      <div class="footer">
        <p>Thank you for being part of the Broka256 community!</p>
      </div>
    </body>
    </html>
  `
}

/**
 * Create default HTML email template
 */
function createDefaultEmailTemplate(user, message) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; }
        .header { background-color: #2563eb; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .button { background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
        .footer { background-color: #f3f4f6; padding: 20px; text-align: center; color: #6b7280; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Broka256</h1>
        <p>Uganda's Premier Property Platform</p>
      </div>
      
      <div class="content">
        <h2>Hello ${user.name}!</h2>
        <p>${message}</p>
        
        <a href="${process.env.CLIENT_URL}" class="button">
          Visit Broka256
        </a>
      </div>
      
      <div class="footer">
        <p>You're receiving this email because you have an account on Broka256.</p>
        <p>Visit <a href="${process.env.CLIENT_URL}">broka256.com</a> to manage your preferences.</p>
      </div>
    </body>
    </html>
  `
}

/**
 * Send WhatsApp notification (future feature)
 * This function is prepared for WhatsApp Business API integration
 */
exports.sendWhatsAppNotification = async (userId, message) => {
  try {
    // TODO: Implement WhatsApp Business API integration
    // This would require WhatsApp Business API credentials
    console.log(`WhatsApp notification prepared for user: ${userId}`)
    console.log(`Message: ${message}`)

    // For now, we'll just log the message
    // In the future, this would send via WhatsApp Business API
  } catch (error) {
    console.error("WhatsApp notification failed:", error)
  }
}

/**
 * Get notification history for a user
 * @param {string} userId - User ID
 * @param {number} limit - Number of notifications to retrieve
 */
exports.getNotificationHistory = async (userId, limit = 50) => {
  try {
    const notifications = await Notification.find({ user: userId }).sort({ createdAt: -1 }).limit(limit)

    return notifications
  } catch (error) {
    console.error("Failed to get notification history:", error)
    return []
  }
}

/**
 * Mark notifications as read
 * @param {string} userId - User ID
 * @param {array} notificationIds - Array of notification IDs to mark as read
 */
exports.markNotificationsAsRead = async (userId, notificationIds) => {
  try {
    await Notification.updateMany(
      {
        _id: { $in: notificationIds },
        user: userId,
      },
      {
        isRead: true,
        readAt: new Date(),
      },
    )

    console.log(`Marked ${notificationIds.length} notifications as read for user: ${userId}`)
  } catch (error) {
    console.error("Failed to mark notifications as read:", error)
  }
}
