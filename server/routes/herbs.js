const express = require('express');
const Herb = require('../models/Herb');

const router = express.Router();

// Dummy herbs data for seeding
const dummyHerbs = [
  {
    name: "Ashwagandha (Withania somnifera)",
    description: "An ancient medicinal herb classified as an adaptogen, meaning it can help your body manage stress. Ashwagandha also provides numerous other benefits for your body and brain.",
    benefits: ["Stress & Anxiety relief", "Energy boost", "Improved sleep quality", "Immunity support"],
    usageMethod: "Take 1-2 capsules daily with meals, or mix 1/2 teaspoon of pure root powder with warm milk or water before bed.",
    image: "/images/herbs/ashwagandha.jpg",
    recommendedFor: ["Vata", "Kapha"]
  },
  {
    name: "Triphala",
    description: "A traditional Ayurvedic formulation consisting of three fruits: Amalaki, Bibhitaki, and Haritaki. It is renowned for its gentle yet effective digestive and detoxifying properties.",
    benefits: ["Digestive regularity", "Natural detoxification", "Antioxidant support", "Healthy skin"],
    usageMethod: "Steep 1/2 teaspoon of powder in hot water for 10 minutes, drink before bed. Alternatively, take 2 tablets in the evening.",
    image: "/images/herbs/triphala.jpg",
    recommendedFor: ["Vata", "Pitta", "Kapha"]
  },
  {
    name: "Turmeric (Curcuma longa)",
    description: "The golden spice of Ayurveda, known for its powerful anti-inflammatory and antioxidant properties thanks to the active compound Curcumin.",
    benefits: ["Joint health", "Inflammation reduction", "Digestion aid", "Immune boost"],
    usageMethod: "Use 1/2 teaspoon in cooking daily, or make 'Golden Milk' by heating it with milk, a pinch of black pepper, and honey.",
    image: "/images/herbs/turmeric.jpg",
    recommendedFor: ["Kapha", "Vata"]
  },
  {
    name: "Brahmi (Bacopa monnieri)",
    description: "A staple plant in traditional Ayurvedic medicine, primarily used to enhance brain function, memory, and concentration while reducing stress.",
    benefits: ["Memory enhancement", "Cognitive focus", "Anxiety reduction", "Nervous system support"],
    usageMethod: "Take 300mg of extract daily, or steep 1 teaspoon of dried leaves in hot water for a calming tea.",
    image: "/images/herbs/brahmi.jpg",
    recommendedFor: ["Pitta", "Vata"]
  },
  {
    name: "Shatavari (Asparagus racemosus)",
    description: "Known as the premier Ayurvedic herb for women's health, it's an adaptogenic herb that supports the reproductive system and hormonal balance.",
    benefits: ["Hormonal balance", "Reproductive health", "Vitality", "Cooling effect on the body"],
    usageMethod: "Mix 1/2 teaspoon of powder with warm milk and a pinch of cardamom, taken once or twice daily.",
    image: "/images/herbs/shatavari.jpg",
    recommendedFor: ["Pitta", "Vata"]
  },
  {
    name: "Tulsi (Holy Basil)",
    description: "Revered in India as 'The Queen of Herbs', Tulsi is a powerful adaptogen that helps the body adapt to stress and supports lung health.",
    benefits: ["Respiratory health", "Stress relief", "Immune support", "Heart health"],
    usageMethod: "Steep 1 tea bag or 1 teaspoon of fresh/dried leaves in hot water for 5-10 minutes. Drink 1-3 cups daily.",
    image: "/images/herbs/tulsi.jpg",
    recommendedFor: ["Kapha", "Vata"]
  }
];

// GET /api/herbs — list all herbs
router.get('/', async (req, res) => {
  try {
    const herbs = await Herb.find().lean();
    const formattedHerbs = herbs.map(herb => ({
      ...herb,
      id: herb._id.toString(),
    }));
    res.json({ herbs: formattedHerbs });
  } catch (error) {
    console.error('Get herbs error:', error);
    res.status(500).json({ message: 'Server error fetching herbs' });
  }
});

// POST /api/herbs/seed — seed dummy data
router.post('/seed', async (req, res) => {
  try {
    const existingCount = await Herb.countDocuments();
    if (existingCount > 0) {
      return res.status(400).json({ message: 'Database already has herbs. Clear first to re-seed.' });
    }

    const herbs = await Herb.insertMany(dummyHerbs);
    const formattedHerbs = herbs.map(herb => ({
      ...herb.toObject(),
      id: herb._id.toString(),
    }));

    res.status(201).json({ herbs: formattedHerbs, message: `Seeded ${herbs.length} herbs` });
  } catch (error) {
    console.error('Seed herbs error:', error);
    res.status(500).json({ message: 'Server error seeding herbs' });
  }
});

// POST /api/herbs/reset — clear and re-seed with latest data
router.post('/reset', async (req, res) => {
  try {
    await Herb.deleteMany({});
    const herbs = await Herb.insertMany(dummyHerbs);
    const formattedHerbs = herbs.map(herb => ({
      ...herb.toObject(),
      id: herb._id.toString(),
    }));

    res.status(200).json({ herbs: formattedHerbs, message: `Database reset! Seeded ${herbs.length} herbs.` });
  } catch (error) {
    console.error('Reset herbs error:', error);
    res.status(500).json({ message: 'Server error resetting herbs' });
  }
});

module.exports = router;
