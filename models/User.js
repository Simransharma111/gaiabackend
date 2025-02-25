const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  thoughts: [String],  // Store user's messages
  tags: [String],       // Store AI-generated tags
});

module.exports = mongoose.model("User", UserSchema);
