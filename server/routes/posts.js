const express = require('express');
const Post = require('../models/Post');
const { protect, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// GET /api/posts — list all posts (newest first)
router.get('/', optionalAuth, async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .lean();

    // Convert ObjectId likes to strings for frontend comparison
    const formattedPosts = posts.map(post => ({
      ...post,
      id: post._id.toString(),
      likes: post.likes.map(id => id.toString()),
      createdAt: post.createdAt,
    }));

    res.json({ posts: formattedPosts });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ message: 'Server error fetching posts' });
  }
});

// POST /api/posts — create a new post
router.post('/', protect, async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({ message: 'Post content is required' });
    }

    const post = await Post.create({
      content: content.trim(),
      authorId: req.user._id,
      authorName: req.user.name,
      likes: [],
      commentCount: 0,
    });

    res.status(201).json({
      post: {
        ...post.toObject(),
        id: post._id.toString(),
        likes: [],
      },
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ message: 'Server error creating post' });
  }
});

// PUT /api/posts/:id/like — toggle like on a post
router.put('/:id/like', protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const userId = req.user._id;
    const hasLiked = post.likes.some(id => id.equals(userId));

    if (hasLiked) {
      post.likes = post.likes.filter(id => !id.equals(userId));
    } else {
      post.likes.push(userId);
    }

    await post.save();

    res.json({
      post: {
        ...post.toObject(),
        id: post._id.toString(),
        likes: post.likes.map(id => id.toString()),
      },
    });
  } catch (error) {
    console.error('Toggle like error:', error);
    res.status(500).json({ message: 'Server error toggling like' });
  }
});

module.exports = router;
