const mongoose = require("mongoose");
const ChatSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    messages: [
      {
        userMessage: String,
        aiResponse: String,
        timestamp: { type: Date, default: Date.now },
      },
    ],
  });
  
  module.exports = mongoose.model("Chat", ChatSchema);