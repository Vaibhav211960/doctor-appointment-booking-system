const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    user: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    timeSlot:{
        type : String,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'postponed', 'cancelled'],
        default: 'pending'
    }
}, { timestamps: true });

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment
