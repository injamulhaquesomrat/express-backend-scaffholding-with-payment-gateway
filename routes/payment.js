const express = require("express");
const SSLCommerzPayment = require("ssl-commerz-node");
const router = express.Router();

router.post("/payment", async (req, res) => {
  const { amount, currency, customerEmail } = req.body;
  
  const data = {
    total_amount: amount,
    currency,
    tran_id: `txn_${Date.now()}`,
    success_url: `${process.env.BASE_URL}/payment-success`,
    fail_url: `${process.env.BASE_URL}/payment-fail`,
    cancel_url: `${process.env.BASE_URL}/payment-cancel`,
    customer_email: customerEmail,
    store_id: process.env.SSL_STORE_ID,
    store_passwd: process.env.SSL_STORE_PASSWORD,
    shipping_method: "No",
    product_name: "Test Payment",
    product_category: "General",
    product_profile: "non-physical-goods",
  };

  const sslcz = new SSLCommerzPayment(
    process.env.SSL_STORE_ID,
    process.env.SSL_STORE_PASSWORD,
    process.env.SSL_IS_LIVE
  );

  sslcz
    .init(data)
    .then((response) => res.json(response))
    .catch((error) =>
      res.status(500).json({ message: "Payment failed", error })
    );
});

module.exports = router;
