const mongoose = require("mongoose");

const ThreadSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Thread", ThreadSchema);
