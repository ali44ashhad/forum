const router = require("express").Router();
const Thread = require("../models/Thread");
const authMiddleware = require("../middleware/authMiddleware");

// Create a thread
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, categoryId } = req.body;
    const thread = new Thread({
      title,
      category: categoryId,
      author: req.userId,
    });
    await thread.save();
    res.json(thread);
  } catch (err) {
    res.status(500).json({ msg: "Error creating thread" });
  }
});

// Get all threads in a category
router.get("/category/:categoryId", async (req, res) => {
  try {
    const threads = await Thread.find({
      category: req.params.categoryId,
    }).populate("author", "username");
    res.json(threads);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching threads" });
  }
});

// Get single thread by ID
router.get("/:id", async (req, res) => {
  try {
    const thread = await Thread.findById(req.params.id).populate(
      "author",
      "username"
    );
    res.json(thread);
  } catch (err) {
    res.status(500).json({ msg: "Thread not found" });
  }
});

module.exports = router;
