import nodemailer from "nodemailer"

interface EmailTemplate {
  to: string
  subject: string
  html: string
}

// Create Nodemailer transporter
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number.parseInt(process.env.SMTP_PORT || "587"),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendEmail(template: EmailTemplate) {
  try {
    // In development, log the email
    if (process.env.NODE_ENV === "development") {
      console.log("📧 Email would be sent:", template)
      return { success: true }
    }

    // Send actual email in production
    const info = await transporter.sendMail({
      from: `"BlookMySpace" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: template.to,
      subject: template.subject,
      html: template.html,
    })

    console.log("Email sent:", info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error("Email sending error:", error)
    return { success: false, error }
  }
}

export async function sendPasswordResetEmail(email: string, userName: string, resetToken: string) {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`

  const template: EmailTemplate = {
    to: email,
    subject: "Reset Your BlookMySpace Password",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          .warning { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔐 Password Reset Request</h1>
          </div>
          <div class="content">
            <h2>Hello ${userName},</h2>
            <p>We received a request to reset your password for your BlookMySpace account.</p>
            <p>Click the button below to reset your password:</p>
            
            <div style="text-align: center;">
              <a href="${resetUrl}" class="button">Reset My Password</a>
            </div>
            
            <div class="warning">
              <strong>⚠️ Important:</strong>
              <ul>
                <li>This link will expire in 1 hour</li>
                <li>If you didn't request this reset, please ignore this email</li>
                <li>Never share this link with anyone</li>
              </ul>
            </div>
            
            <p>If the button doesn't work, copy and paste this link into your browser:</p>
            <p style="word-break: break-all; background: #f0f0f0; padding: 10px; border-radius: 5px;">
              ${resetUrl}
            </p>
            
            <p>If you have any questions, please contact our support team.</p>
            
            <p>Best regards,<br>The BlookMySpace Team</p>
          </div>
          <div class="footer">
            <p>© 2024 BlookMySpace. All rights reserved.</p>
            <p>This is an automated email. Please do not reply to this message.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }

  return await sendEmail(template)
}

export function getWelcomeEmailTemplate(userName: string, userRole: string): EmailTemplate {
  return {
    to: "",
    subject: `Welcome to BlookMySpace - ${userRole} Account Created`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">Welcome to BlookMySpace!</h1>
        <p>Dear ${userName},</p>
        <p>Thank you for registering as a ${userRole} on BlookMySpace. Your account has been created successfully.</p>
        <p>You can now:</p>
        <ul>
          ${
            userRole === "space_owner"
              ? `
            <li>List your spaces for advertising</li>
            <li>Create BlookPerks campaigns</li>
            <li>Track analytics and earnings</li>
          `
              : ""
          }
          ${
            userRole === "brand"
              ? `
            <li>Discover advertising spaces</li>
            <li>Create marketing campaigns</li>
            <li>Track campaign performance</li>
          `
              : ""
          }
          ${
            userRole === "vendor"
              ? `
            <li>Browse available jobs</li>
            <li>Submit proposals</li>
            <li>Manage your services</li>
          `
              : ""
          }
          ${
            userRole === "blookforce_agent"
              ? `
            <li>Start referring new users</li>
            <li>Track your commissions</li>
            <li>Access marketing materials</li>
          `
              : ""
          }
          ${
            userRole === "telecaller"
              ? `
            <li>Access lead management system</li>
            <li>Track call performance</li>
            <li>Monitor earnings and targets</li>
          `
              : ""
          }
        </ul>
        <p>Get started by logging into your dashboard.</p>
        <p>Best regards,<br>The BlookMySpace Team</p>
      </div>
    `,
  }
}

export function getCampaignNotificationTemplate(campaignName: string, spaceOwnerName: string): EmailTemplate {
  return {
    to: "",
    subject: `New Campaign Request - ${campaignName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">New Campaign Request</h1>
        <p>Dear ${spaceOwnerName},</p>
        <p>You have received a new campaign request for "${campaignName}".</p>
        <p>Please log into your dashboard to review and respond to this request.</p>
        <p>Best regards,<br>The BlookMySpace Team</p>
      </div>
    `,
  }
}
