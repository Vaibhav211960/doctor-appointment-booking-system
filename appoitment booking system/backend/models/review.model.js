const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    user :[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User',
            required : true
        }
    ],
    doctor :[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Doctor',
            required : true
        }
    ],
    comment : {
        type : String,
        required : true
    },
}, {timestamps : true})

module.exports = mongoose.model('Review' , reviewSchema);