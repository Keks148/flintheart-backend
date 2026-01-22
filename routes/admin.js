const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/users", auth(["admin"]), async (req, res) => {
  const { login, password, role } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ login, password: hash, role });
  res.json(user);
});

router.get("/users", auth(["admin"]), async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

router.patch("/users/:id/block", auth(["admin"]), async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { blocked: true });
  res.json({ success: true });
});

module.exports = router;
