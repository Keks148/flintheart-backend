require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");

const app = express();

// 🔥 CORS ДЛЯ TELEGRAM MINI APP
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options("*", cors()); // ← ОБЯЗАТЕЛЬНО

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("Mongo error:", err));

app.get("/", (req, res) => {
  res.json({ status: "ok", service: "Flintheart Backend" });
});

app.get("/health", (req, res) => {
  res.json({ status: "healthy" });
});

// 🔑 ROUTES
app.use("/login", authRoutes);
app.use("/admin", adminRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server started on", PORT));
