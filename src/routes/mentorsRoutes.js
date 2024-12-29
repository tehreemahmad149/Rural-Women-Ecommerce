const express = require('express');
const { getMentors, addMentor } = require('../controllers/mentorsController');
const router = express.Router();

router.get('/mentors', getMentors); // Get all mentors
router.post('/mentors', addMentor); // Add a new mentor

module.exports = router;