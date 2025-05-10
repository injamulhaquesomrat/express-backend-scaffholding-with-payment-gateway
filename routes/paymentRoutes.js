/**
 * @fileoverview Defines the routes for handling payment-related operations.
 *
 * This file sets up the Express router for payment-related endpoints,
 * including initiating a payment, handling payment success, failure,
 * and cancellation. The corresponding controller functions are imported
 * from the paymentController module.
 *
 * @module routes/paymentRoutes
 */

const express = require("express");
const {
  initiatePayment,
  paymentSuccess,
  paymentFail,
  paymentCancel,
} = require("../controllers/paymentController");

const router = express.Router();

router.post("/initiate", initiatePayment);
router.post("/success", paymentSuccess);
router.post("/fail", paymentFail);
router.post("/cancel", paymentCancel);

module.exports = router;
