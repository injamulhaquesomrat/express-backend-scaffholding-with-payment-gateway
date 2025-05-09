const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const authRoutes = require("./routes/authRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const logger = require("./config/logger");
const loggerMiddleware = require("./middlewares/loggerMiiddleware");
const errorMiddleware = require("./middlewares/errorMiddleware");

dotenv.config();
const app = express();

app.use(express.json());
app.use(morgan("combined", { stream: logger.stream }));
app.use(loggerMiddleware);
app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);
app.use(errorMiddleware);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port: ${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => console.error(err));
