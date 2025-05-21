const mongoose = require('mongoose')

const emergencySchema = mongoose.Schema({
    user :[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        }
    ],
    doctor :[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        }
    ],
    date : {
        type : Date,
        required : true
    },
    reason : {
        type : String,
        required : true
    },
    status : ['pending', 'cancelled', 'rejected']
},{ timestamps : true })

module.exports = mongoose.model('Emergency' , emergencySchema);