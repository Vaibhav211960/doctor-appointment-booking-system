const Appointment = require('../models/appointment.model');
const User = require('../models/user.model');
const moment = require("moment");
const mongoose = require("mongoose");


const makeAppointment = async (req, res) => {
    console.log("Request Body:", req.body);

    try {
        const { user, doctor, date, timeSlot, reason, status } = req.body;

        // Validate user ID
        if (!mongoose.Types.ObjectId.isValid(user)) {
            return res.status(400).json({ message: "Invalid User ID format" });
        }
        console.log(user);
        
        const userId = new mongoose.Types.ObjectId(user);

        // Ensure the user exists in the database
        const existingUser = await User.findOne({ _id: userId });
        console.log("Existing User:", existingUser);
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the selected time slot is in the past
        const now = moment();
        const selectedDateTime = moment(`${date} ${timeSlot.split('-')[0]}`, "YYYY-MM-DD HH:mm");

        if (selectedDateTime.isBefore(now)) {
            return res.status(400).json({ message: "Cannot book a past time slot" });
        }

        // Check if the selected date is within the next 7 days
        const weekLater = moment().add(7, "days");
        const selectedDate = moment(date, "YYYY-MM-DD");
        if (selectedDate.isAfter(weekLater)) {
            return res.status(400).json({ message: "Appointments can only be booked within a week" });
        }

        // Check if the slot is already booked
        const existingAppointment = await Appointment.findOne({ doctor, date, timeSlot });
        if (existingAppointment) {
            return res.status(400).json({ message: "This time slot is already booked" });
        }

        // Create a new appointment
        const newAppointment = new Appointment({
            user: userId,
            doctor,
            date,
            timeSlot,
            reason,
            status: status || 'pending',
        });

        await newAppointment.save();

        console.log("New Appointment:", newAppointment);

        // Add the appointment ID to the user's appointment array
        if (!existingUser.appointments) {
            existingUser.appointments = [];
        }

        existingUser.appointments.push(newAppointment._id);
        await existingUser.save();

        console.log("Updated User:", existingUser);

        // Fetch and populate appointments
        const appointments = await Appointment.find().populate("user");
        // console.log("Appointments List:", appointments);

        res.status(201).json({ message: "Appointment booked successfully.", appointment: newAppointment });

    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: err.message });
    }
};


const getAvailableSlots = async (req, res) => {
    try {
        const { doctorId, date } = req.query;

        if (!doctorId || !date) {
            return res.status(400).json({ message: "Doctor ID and date are required" });
        }

        // Define working hours (e.g., 9 AM - 6 PM)
        const startTime = moment(`${date} 09:00`, "YYYY-MM-DD HH:mm");
        const endTime = moment(`${date} 18:00`, "YYYY-MM-DD HH:mm");
        const now = moment(); // Get current time

        let slots = [];
        while (startTime.isBefore(endTime)) {
            if (startTime.isAfter(now)) {  // Filter past slots
                slots.push(startTime.format("HH:mm"));
            }
            startTime.add(1, 'hour'); // Increment by 1 hour
        }

        return res.json({ availableSlots: slots });

    } catch (error) {
        return res.status(500).json({ message: "Error fetching available slots", error: error.message });
    }
};

const getAppointment = async (req, res) => {
    const { id } = req.params;
    console.log("Fetching appointment with ID:", id); // Debugging log

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid appointment ID" });
    }

    try {
        const appointment = await Appointment.findById(id)
            .populate("doctor", "name")
            .populate("user", "username");

        if (!appointment) {
            return res.status(404).json({ error: "Appointment not found" });
        }

        res.json(appointment);
    } catch (error) {
        console.error("Error fetching appointment:", error);
        res.status(500).json({ error: "Server error" });
    }
};

const getAllAppointments = async (req, res) => {
    try {
        // Fetch all appointments from the database
        const appointments = await Appointment.find();
        // console.log(appointments);


        // If no appointments found, send an empty array
        if (!appointments || appointments.length === 0) {
            return res.status(404).json({ message: "No appointments found" });
        }

        // Send the fetched appointments as a response
        res.status(200).json(appointments);
    } catch (error) {
        console.error("Error fetching appointments:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
const getUserAppointments = async (req, res) => {
    try {
        const userId = req.user.id; // Extract user ID from token
        console.log("Fetching appointments for user:", userId);

        // Fetch appointments only for the logged-in user
        const appointments = await Appointment.find({ user: userId }) // Filter by userId
            .populate("doctor", "name specialization") // Fetch doctor name & specialization
            .populate("user", "username");

        if (!appointments.length) {
            return res.status(404).json({ message: "No appointments found." });
        }

        res.status(200).json(appointments);
    } catch (error) {
        console.error("Error fetching user appointments:", error);
        res.status(500).json({ message: "Server error, please try again later." });
    }
};


const cancelAppointment = async (req, res) => {
    try {
        await Appointment.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Appointment canceled" });
    } catch (error) {
        res.status(500).json({ error: "Failed to cancel appointment" });
    }
}

module.exports = { makeAppointment, getAvailableSlots, getAppointment, getAllAppointments, getUserAppointments, cancelAppointment};
