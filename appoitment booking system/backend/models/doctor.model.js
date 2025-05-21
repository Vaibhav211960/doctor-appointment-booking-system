// doctor model
const mongoose = require('mongoose')

const doctorSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password :{
        type : String,
        required : true,
        minlength: 8,
    },
    image :{
        type : String,
        required : true,
    },
    specialization : {
        type : String,
        required : true
    },
    qualification : {
        type : String,
        required : true
    },
    experience :{
        type : Number,
        required : true
    },
    fees :{
        type : Number,
        required : true
    },
    about : {
        type : String,
    },
    rating : {
        type : Number,
        min : 0,
        max : 5,
        default : 0
    }
}, {timestamps : true})

module.exports = mongoose.model("Doctor" , doctorSchema);