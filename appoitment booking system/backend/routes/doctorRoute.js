// doctor route

const express = require('express')
const { createDoctor, loginDoctor , getAllDoctors } = require('../controller/doctorController')

const router = express.Router()

router.post('/', (req, res) => {
    res.send("✅ doctor route is working!");
});

router.get('/', getAllDoctors);

router.post('/register' , createDoctor)
router.post('/login' , loginDoctor)

module.exports = router

