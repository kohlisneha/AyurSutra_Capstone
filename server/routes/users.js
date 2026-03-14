const express = require('express');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

// PUT /api/users/dosha — save dosha test results
router.put('/dosha', protect, async (req, res) => {
  try {
    const { dosha, doshaScores } = req.body;

    if (!dosha || !doshaScores) {
      return res.status(400).json({ message: 'Please provide dosha and doshaScores' });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        dosha,
        doshaScores,
        lastTestDate: new Date(),
      },
      { new: true }
    );

    res.json({ user: user.toJSON() });
  } catch (error) {
    console.error('Save dosha error:', error);
    res.status(500).json({ message: 'Server error saving dosha results' });
  }
});

module.exports = router;
