const express = require("express");
const router = express.Router();

// 🔐 Простейшая проверка токена (пока тест)
router.use((req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth || auth !== "Bearer test-token-123") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
});

// 👤 СПИСОК ПОЛЬЗОВАТЕЛЕЙ
router.get("/users", (req, res) => {
  res.json({
    success: true,
    users: [
      { login: "admin", role: "admin" },
      { login: "trader1", role: "trader" }
    ]
  });
});

module.exports = router;
const express = require("express");
const router = express.Router();

// тестовый admin endpoint
router.get("/users", (req, res) => {
  res.json({
    success: true,
    users: [
      { id: 1, login: "admin", role: "admin" }
    ]
  });
});

module.exports = router;
