const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

/**
 * ТЕСТ
 */
app.get("/", (req, res) => {
  res.json({ status: "ok", service: "Flintheart Backend" });
});

/**
 * LOGIN
 */
app.post("/login", (req, res) => {
  const { login, password } = req.body;

  if (login === "admin" && password === "admin123") {
    return res.json({
      success: true,
      token: "test-token-123",
      role: "admin"
    });
  }

  return res.status(401).json({
    success: false,
    message: "Неверный логин или пароль"
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server started on", PORT);
});
