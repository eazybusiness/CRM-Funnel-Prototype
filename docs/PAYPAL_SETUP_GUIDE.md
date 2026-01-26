# PayPal Setup & Course Testing Guide

## 🎯 Current Status

### What's Working:
- ✅ Registration & Login system
- ✅ Member dashboard (shows user name)
- ✅ PayPal checkout page exists
- ✅ PayPal payment API endpoints
- ✅ Demo course in database

### What's Missing:
- ❌ Course links on homepage
- ❌ PayPal live credentials
- ❌ Course purchase flow from homepage

---

## 💳 PayPal Testing (Sandbox)

### 1. Current Setup
- Using **PayPal Sandbox** (test environment)
- Demo course: "Minimalismus-Grundlagen" - €49.00

### 2. Test the Purchase Flow

#### Method 1: Direct Checkout URL
```
https://crm-funnel-prototype.vercel.app/checkout?courseId=1&courseName=Minimalismus-Grundlagen&price=49&description=Lerne die Grundlagen des Minimalismus&duration=3 Stunden&modules=3&lessons=6
```

#### Method 2: From Database
1. Go to: https://crm-funnel-prototype.vercel.app/api/test-db
2. Note the course ID from the database
3. Use it in the checkout URL

### 3. PayPal Sandbox Test Accounts

If you need to test PayPal payments:

1. **Go to PayPal Developer Dashboard**: https://developer.paypal.com/
2. **Login with your PayPal account**
3. **Go to: Apps & Credentials → Sandbox**
4. **Create test accounts** if needed:
   - Personal/Buyer account (for making purchases)
   - Business account (for receiving payments)

### 4. Test Payment Process
1. Visit the checkout URL above
2. Click "Jetzt mit PayPal bezahlen"
3. You'll be redirected to PayPal Sandbox
4. Login with sandbox test account
5. Complete the payment
6. You'll be redirected back to success page
7. Check your member dashboard - course should appear!

---

## 🏪 PayPal Live Setup

### 1. Get Live Credentials
1. Go to: https://developer.paypal.com/
2. Go to: Apps & Credentials
3. Switch from **Sandbox** to **Live**
4. Create a new App or use existing one
5. Copy:
   - Client ID
   - Client Secret

### 2. Update Environment Variables
In Vercel → Settings → Environment Variables:

```
PAYPAL_CLIENT_ID=your-live-client-id
PAYPAL_CLIENT_SECRET=your-live-client-secret
PAYPAL_API_URL=https://api-m.paypal.com
```

**Important**: Change API URL from sandbox to live!

### 3. Update Webhook
1. In PayPal Live dashboard, create a webhook
2. URL: https://crm-funnel-prototype.vercel.app/api/payment/webhook
3. Events: CHECKOUT.ORDER.APPROVED, PAYMENT.CAPTURE.COMPLETED
4. Update `PAYPAL_WEBHOOK_ID` in Vercel

---

## 📚 Adding Course Links to Homepage

The homepage needs course sections. Here's what to add:

### In `/pages/index.js`, add after hero section:

```jsx
{/* Courses Section */}
<section className="py-20 bg-gray-50">
  <div className="max-w-6xl mx-auto px-4">
    <h2 className="text-3xl font-light text-center mb-12">Unsere Kurse</h2>
    <div className="grid md:grid-cols-2 gap-8">
      {/* Course Card */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-xl font-semibold mb-4">Minimalismus-Grundlagen</h3>
        <p className="text-gray-600 mb-6">Lerne die Grundlagen des Minimalismus</p>
        <div className="flex justify-between items-center mb-6">
          <span className="text-2xl font-bold">€49,00</span>
          <span className="text-sm text-gray-500">3 Module • 6 Lektionen</span>
        </div>
        <Link 
          href="/checkout?courseId=1&courseName=Minimalismus-Grundlagen&price=49&description=Lerne die Grundlagen des Minimalismus&duration=3 Stunden&modules=3&lessons=6"
          className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition text-center block"
        >
          Jetzt anmelden
        </Link>
      </div>
    </div>
  </div>
</section>
```

---

## 📋 Email Templates Status

### Implemented:
- ✅ Welcome email after registration
- ✅ Course access email after purchase
- ✅ Password reset (basic)

### Need to Configure:
1. **Brevo API Key** in environment variables
2. **Email design** in Brevo templates
3. **Automation rules** in Brevo

See: `/docs/BREVO_AUTOMATION_GUIDE.md`

---

## 🎯 Quick Test Checklist

### Sandbox Testing:
- [ ] Visit checkout URL
- [ ] Complete PayPal sandbox payment
- [ ] Check email (demo only)
- [ ] Verify course appears in dashboard

### Live Setup:
- [ ] Get PayPal live credentials
- [ ] Update environment variables
- [ ] Change API URL to live
- [ ] Update webhook
- [ ] Test with real payment (small amount)

### Course Display:
- [ ] Add course section to homepage
- [ ] Create course overview page
- [ ] Add "Zu den Kursen" link to /courses

---

## 🚨 Important Notes

1. **Never commit real PayPal credentials** to git
2. **Test thoroughly in sandbox** before going live
3. **Email requires Brevo setup** for actual delivery
4. **Webhook must be HTTPS** (already is with Vercel)

---

## 📞 Need Help?

1. For PayPal issues: Check Vercel function logs
2. For database issues: Use /api/test-db
3. For email issues: Check Brevo dashboard
