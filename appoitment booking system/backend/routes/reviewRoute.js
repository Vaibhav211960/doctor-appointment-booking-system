const express = require('express');
const { giveReview } = require('../controller/reviewController');

const router = express.Router();

router.get('/', function (req, res) {
    res.send('�� Review route is working!');
    console.log('Review route accessed');  // Log the request to the console for debugging purposes.  Remove this line when you're ready to deploy.  //
});

router.post('/', giveReview);

module.exports = router;