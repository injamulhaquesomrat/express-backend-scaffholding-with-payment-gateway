require("dotenv").config();
const cors = require("cors");

const connectDB = require("./config/db");
const express = require("express");

const authRoutes = require("./routes/auth");
const paymentRoutes = require("./routes/payment");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Express Backend Running...");
});

app.use("/auth", authRoutes);

app.use("/payment", paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
