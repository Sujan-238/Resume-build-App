const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const app = express();

// Production CORS: Add your frontend URL here later for better security
app.use(cors({
  origin: "*", // Change to "https://your-frontend-domain.com" in production
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());

// Server Health Check (Useful for Global Monitoring)
app.get('/', (req, res) => {
  res.status(200).json({ status: "Online", service: "ResumeForge Payment API" });
});

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.post('/api/payment/create-order', async (req, res) => {
  try {
    const { amount } = req.body;
    const options = {
      amount: amount * 100, // amount in smallest currency unit (paise)
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);
    if (!order) return res.status(500).send("Some error occured while creating order");
    
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating order");
  }
});

// --- NEW: PROFESSIONAL PAYMENT LINK ENGINE ---
// This generates a secure link that works 100% on all mobile phones
app.post('/api/payment/create-link', async (req, res) => {
  try {
    const { amount, email, phone } = req.body;
    const paymentLink = await razorpay.paymentLink.create({
      amount: amount * 100,
      currency: "INR",
      accept_partial: false,
      description: "ResumeBuilder Premium",
      notify: { sms: false, email: true },
      reminder_enable: true,
      callback_url: `https://resumeforge.onrender.com/payment-success`,
      callback_method: "get"
    });
    res.json({ url: paymentLink.short_url, id: paymentLink.id });
  } catch (error) {
    console.error("Link Creation Failed:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/payment/verify', (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      return res.status(200).json({ message: "Payment verified successfully" });
    } else {
      return res.status(400).json({ message: "Invalid signature sent!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error verifying payment");
  }
});

// --- HOSTED PAYMENT CHECKOUT ---
app.get("/api/payment/checkout", (req, res) => {
  const { amount, order_id, email } = req.query;
  // This redirects to a clean Razorpay page for UPI support
  res.send(`
    <html>
      <body onload="document.forms[0].submit()">
        <form method="POST" action="https://api.razorpay.com/v1/checkout/embedded">
          <input type="hidden" name="key_id" value="${process.env.RAZORPAY_KEY_ID || 'rzp_live_SiuRcn1z6rrHNW'}">
          <input type="hidden" name="order_id" value="${order_id}">
          <input type="hidden" name="name" value="ResumeForge Premium">
          <input type="hidden" name="description" value="Resume Download">
          <input type="hidden" name="prefill[email]" value="${email}">
        </form>
      </body>
    </html>
  `);
});

// --- PAYMENT STATUS CHECK ---
app.get("/api/payment/status/:orderId", async (req, res) => {
  res.json({ paid: true }); // Testing bypass
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Production Server live on port ${PORT}`);
});
