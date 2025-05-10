/**
 * @fileoverview Entry point for the Express backend application.
 * Configures middleware, routes, and database connection.
 * Includes logging, error handling, and response time tracking.
 *
 * @requires express - Fast, unopinionated, minimalist web framework for Node.js.
 * @requires mongoose - MongoDB object modeling tool designed to work in an asynchronous environment.
 * @requires cors - Middleware to enable Cross-Origin Resource Sharing.
 * @requires dotenv - Loads environment variables from a .env file into process.env.
 * @requires morgan - HTTP request logger middleware for Node.js.
 * @requires uuid - Library to generate unique identifiers.
 * @requires response-time - Middleware to record response time for HTTP requests.
 * @requires ./utils/requestId - Custom middleware to attach a unique request ID to each request.
 * @requires ./routes/authRoutes - Routes for authentication-related operations.
 * @requires ./routes/paymentRoutes - Routes for payment-related operations.
 * @requires ./config/logger - Custom logger configuration.
 * @requires ./middlewares/loggerMiiddleware - Middleware for logging request details.
 * @requires ./middlewares/errorMiddleware - Middleware for handling errors.
 *
 * @module index
 */

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const { v4: uuidv4 } = require("uuid");
const requestId = require("./utils/requestId");
const responseTime = require("response-time");
const authRoutes = require("./routes/authRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const logger = require("./config/logger");
const loggerMiddleware = require("./middlewares/loggerMiiddleware");
const errorMiddleware = require("./middlewares/errorMiddleware");

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined", { stream: logger.stream }));
app.use(loggerMiddleware);

app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);

app.use(errorMiddleware);
app.use(requestId);
app.use(
  responseTime((req, res, time) => {
    logger.info({
      reqId: req.id,
      url: req.originalUrl,
      responseTime: `${time.toFixed(2)}ms`,
    });
  })
);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port: ${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => console.error(err));
