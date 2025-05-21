const express = require('express');
const moment = require('moment')
const { makeAppointment, getAvailableSlots, getAppointment, getAllAppointments , getUserAppointments, cancelAppointment} = require('../controller/appointmentController');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.get("/", getAllAppointments);
router.get('/available-slots', getAvailableSlots);
router.get("/myAppoint",authMiddleware , getUserAppointments);
  
router.get("/:id", getAppointment);

router.post('/make',makeAppointment);

router.delete("/:id", cancelAppointment);


module.exports = router;