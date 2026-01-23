require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/login", authRoutes);
app.use("/admin", adminRoutes);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Server started on", PORT);
});
