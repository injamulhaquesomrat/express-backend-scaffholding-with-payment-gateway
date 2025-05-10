const SSLCommerzPayment = require("sslcommerz-lts");

/**
 * Initiates a payment request using SSLCommerz.
 *
 * @async
 * @function initiatePayment
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body containing payment details.
 * @param {number} req.body.amount - The total amount to be paid.
 * @param {string} req.body.currency - The currency of the payment (e.g., "BDT", "USD").
 * @param {string} req.body.customerEmail - The email address of the customer.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} Sends a JSON response with the payment gateway URL or an error message.
 */

/**
 * Handles the success callback for a payment.
 *
 * @function paymentSuccess
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void} Sends a success message to the client.
 */

/**
 * Handles the failure callback for a payment.
 *
 * @function paymentFail
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void} Sends a failure message to the client.
 */

/**
 * Handles the cancellation callback for a payment.
 *
 * @function paymentCancel
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void} Sends a cancellation message to the client.
 */

exports.initiatePayment = async (req, res) => {
  const { amount, currency, customerEmail } = req.body;

  const data = {
    total_amount: amount,
    currency: currency,
    tran_id: "REF123", // use unique tran_id for each api call
    success_url: "http://localhost:3030/success",
    fail_url: "http://localhost:3030/fail",
    cancel_url: "http://localhost:3030/cancel",
    ipn_url: "http://localhost:3030/ipn",
    shipping_method: "Courier",
    product_name: "Computer.",
    product_category: "Electronic",
    product_profile: "general",
    cus_name: "Customer Name",
    cus_email: customerEmail,
    cus_add1: "Dhaka",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: "01711111111",
    cus_fax: "01711111111",
    ship_name: "Customer Name",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };

  const sslcz = new SSLCommerzPayment(
    process.env.SSL_STORE_ID,
    process.env.SSL_STORE_PASSWORD,
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
