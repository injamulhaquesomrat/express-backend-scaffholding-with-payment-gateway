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
    credentials: true, // if you're using cookies or authorization headers
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
