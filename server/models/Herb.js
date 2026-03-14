const mongoose = require('mongoose');

const herbSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  benefits: [{
    type: String,
  }],
  usageMethod: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: '',
  },
  recommendedFor: [{
    type: String,
    enum: ['Vata', 'Pitta', 'Kapha'],
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Herb', herbSchema);
