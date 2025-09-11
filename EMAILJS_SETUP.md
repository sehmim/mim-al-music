# EmailJS Setup Instructions

## 🚀 Quick Setup (5 minutes)

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### Step 2: Create Email Service
1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose **Gmail** (or your preferred email provider)
4. Follow the setup instructions
5. **Copy your Service ID** (you'll need this)

### Step 3: Create Email Template
1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template:

```
Subject: New {{type}} Subscription - {{from_email}}

Hello,

You have a new {{type}} subscription:

Email: {{from_email}}
Type: {{type}}
Timestamp: {{timestamp}}

Message: {{message}}

Best regards,
MIM AL Website
```

4. **Copy your Template ID**

### Step 4: Get Public Key
1. Go to **Account** → **General**
2. **Copy your Public Key**

### Step 5: Update Configuration
1. Open `src/lib/emailjs.ts`
2. Replace these values:
   ```typescript
   const EMAILJS_SERVICE_ID = 'your_service_id'; // Replace with your Service ID
   const EMAILJS_TEMPLATE_ID = 'your_template_id'; // Replace with your Template ID  
   const EMAILJS_PUBLIC_KEY = 'your_public_key'; // Replace with your Public Key
   ```

### Step 6: Test It!
1. Run your development server: `npm run dev`
2. Try subscribing to the newsletter
3. Check your email for the notification

## 📧 What Happens When Someone Subscribes

1. **Primary**: EmailJS sends you an email notification
2. **Fallback**: If EmailJS fails, email is stored in browser's localStorage
3. **Success**: User sees confirmation message

## 🔍 Viewing Captured Emails

### Option 1: Check Your Email
- You'll receive an email for each subscription

### Option 2: Check Browser Console
- Open Developer Tools → Console
- Look for "Email sent successfully" or "Email stored locally"

### Option 3: Check localStorage (Fallback)
- Open Developer Tools → Application → Local Storage
- Look for `captured_emails` key

## 🆓 Free Tier Limits
- **200 emails/month** (perfect for getting started)
- **2 email services**
- **2 email templates**

## 🚀 Upgrade Options
- **Pro Plan**: $20/month for 1,000 emails
- **Business Plan**: $50/month for 10,000 emails

## 🔧 Troubleshooting

### Common Issues:
1. **"EmailJS failed"** → Check your Service ID, Template ID, and Public Key
2. **"CORS error"** → Make sure your domain is added to EmailJS allowed origins
3. **"Template not found"** → Double-check your Template ID

### Need Help?
- EmailJS Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- EmailJS Support: [https://www.emailjs.com/support/](https://www.emailjs.com/support/)
