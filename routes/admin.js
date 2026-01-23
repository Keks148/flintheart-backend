const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/users", auth, (req, res) => {
  res.json([
    { login: "admin", role: "admin" },
    { login: "trader1", role: "trader" },
    { login: "client1", role: "client" }
  ]);
});

module.exports = router;
