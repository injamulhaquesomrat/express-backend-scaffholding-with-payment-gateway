const SSLCommerzPayment = require("sslcommerz-lts");

exports.initiatePayment = async (req, res) => {
  const { amount, name, email } = req.body;

  const data = {
    total_amount: amount,
    currency: "BDT",
    tran_id: "REF123",
    success_url: "http://localhost:5000/api/payment/success",
    fail_url: "http://localhost:5000/api/payment/fail",
    cancel_url: "http://localhost:5000/api/payment/cancel",
    cus_name: name,
    cus_email: email,
    product_name: "Product",
    product_category: "General",
    product_profile: "general",
  };

  const sslcz = new SSLCommerzPayment(
    process.env.STORE_ID,
    process.env.STORE_PASSWORD,
    false
  );

  sslcz
    .init(data)
    .then((apiResponse) => {
      let GatewayPageURL = apiResponse.GatewayPageURL;
      res.json({ url: GatewayPageURL });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Payment initiation failed", error: err });
    });
};

exports.paymentSuccess = (req, res) => res.send("Payment Successful");
exports.paymentFail = (req, res) => res.send("Payment Failed");
exports.paymentCancel = (req, res) => res.send("Payment Cancelled");
