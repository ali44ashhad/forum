const router = require("express").Router();
const Category = require("../models/Category");
const authMiddleware = require("../middleware/authMiddleware");

// Create category (protected)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const category = new Category({ name: req.body.name });
    await category.save();
    res.json(category);
  } catch (err) {
    res.status(500).json({ msg: "Error creating category" });
  }
});

// Get all categories (public)
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching categories" });
  }
});

module.exports = router;
