// doctorcontroller 
const Doctor = require('../models/doctor.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const createDoctor = async (req, res) => {
    try{
        const { name, email, password,image, specialization, qualification, experience, fees, about , rating } = req.body;

        const existingDoctor = await Doctor.findOne( { email })
        if(existingDoctor) return res.status(400).json({ massage : 'Doctor already exists'})

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newDoctor = await Doctor.create({
            name,
            email,
            password : hashedPassword,
            image,
            specialization,
            qualification,
            experience,
            fees,
            about,
            rating
        })
        
        res.status(201).json({ message : 'doctor is created successfully.', newDoctor})

    }catch(err){
        res.status(500).json({ error : err.message })
    }
}

const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body
        
        const doc = await Doctor.findOne({ email })
        if (!doc) return res.status(400).json({ message: 'Invalid email.' })

        const isMatch = await bcrypt.compare(password, doc.password)
        if (!isMatch) return res.status(400).json({ message: 'Invalid password.' })

        const token = jwt.sign(
            { id: doc._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' }
        )
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 3600000 // 1 hour
        })

        return res.status(201).json({ message: 'User has been logged in successfully.', token })

    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find().select("-password"); // Exclude password for security
        res.status(200).json(doctors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


module.exports = { createDoctor , loginDoctor , getAllDoctors }