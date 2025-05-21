// user model

const mongoose  = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password :{
        type : String,
        required : true,
        minLength : 8,
    },
    phone :{
        type : Number,
        required : true,
        minlength: 10, 
        maxlength: 10
    },
    address : {
        type : String,
        required : true
    },
    appointments : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Appointment',
            required : true
        }
    ]

}, {timestamps : true})

// userSchema.methods.matchPassword = async function(password) {
//     return await bcrypt.compare(this.password , password)
// }


const User = mongoose.model('User', userSchema);

module.exports = User