const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  login: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["admin", "trader", "client"] },
  blocked: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
