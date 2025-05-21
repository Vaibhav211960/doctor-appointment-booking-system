// user route 

const express = require('express');
const { createUser , loginUser, getCurrentUser , updateUser } = require('../controller/userController');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.get('/get', authMiddleware ,getCurrentUser);

router.post('/signup', createUser);
router.post('/login', loginUser);

router.put('/update', authMiddleware, updateUser);


module.exports = router;