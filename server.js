require("dotenv").config(); // Load environment variables

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/UserSchema");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

app.post("/api/users", async (req, res) => {
  try {
    const { name, topic } = req.body;

    if (!name || !topic) {
      return res.status(400).json({ error: "Name and topic are required." });
    }

    const newUser = new User({ name, topic });
    await newUser.save();
    res.json({ message: "User saved successfully!" });
  } catch (error) {
    console.error("❌ Error saving user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/connect", async (req, res) => {
  try {
    const { topic } = req.body;

    if (!topic) {
      return res.status(400).json({ error: "Topic is required." });
    }

    const matchedUsers = await User.find({ topic });

    if (matchedUsers.length > 0) {
      res.json({ matchedUsers });
    } else {
      res.json({ message: "No match found yet." });
    }
  } catch (error) {
    console.error("❌ Error in /api/connect:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
