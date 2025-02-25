const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
  userId: String,
  message: String,
  aiResponse: String,
  tags: [String],
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ChatHistory", ChatSchema);
