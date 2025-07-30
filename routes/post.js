const router = require("express").Router();
const Post = require("../models/Post");
const authMiddleware = require("../middleware/authMiddleware");

// Create a post (comment on thread)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { threadId, content } = req.body;
    const post = new Post({
      content,
      thread: threadId,
      author: req.userId,
    });
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ msg: "Error creating post" });
  }
});

// Get all posts in a thread
router.get("/thread/:threadId", async (req, res) => {
  try {
    const posts = await Post.find({ thread: req.params.threadId }).populate(
      "author",
      "username"
    );
    res.json(posts);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching posts" });
  }
});

module.exports = router;
