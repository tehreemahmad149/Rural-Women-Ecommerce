const Tutorial = require('../models/Tutorials');

// Get all tutorials
const getTutorials = async (req, res) => {
  try {
    const tutorials = await Tutorial.find({}, 'title'); // Fetch only titles
    res.status(200).json(tutorials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get links for a specific tutorial
const getLinksByTutorial = async (req, res) => {
  try {
    const tutorial = await Tutorial.findOne({ title: req.params.title });
    if (!tutorial) return res.status(404).json({ message: 'Tutorial not found' });
    res.status(200).json(tutorial.links);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new tutorial
const addTutorial = async (req, res) => {
  try {
    const { title, links } = req.body;
    const newTutorial = new Tutorial({ title, links });
    await newTutorial.save();
    res.status(201).json({ message: 'Tutorial added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTutorials, getLinksByTutorial, addTutorial };
