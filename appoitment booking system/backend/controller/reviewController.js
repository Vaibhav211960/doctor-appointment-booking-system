const Review = require('../models/review.model')

const giveReview = async (req, res) => {
    try {
        // const existingReview = await Review.findById(req.params.id)
        // if (existingReview) {
        //     return res.status(404).json({ message: 'Review is already given.' })
        // }

        const review = await Review.create({
            user : [],
            doctor : [],
            hospital : [],
            comment : 'yoo',
        })
        await review.save()
        console.log(review);
        
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}

module.exports = { giveReview }