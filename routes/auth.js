const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const { login, password } = req.body;

  if (login === "admin" && password === "admin123") {
    return res.json({
      success: true,
      token: "test-token-123",
      role: "admin"
    });
  }

  return res.status(401).json({ success: false });
});

module.exports = router;
