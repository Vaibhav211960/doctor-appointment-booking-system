
const express = require('express');
const { createEmergency } = require('../controller/emergencyController');

const router = express.Router();

router.post('/' , createEmergency)

module.exports = router;