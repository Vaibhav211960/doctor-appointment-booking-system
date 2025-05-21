const Emergency = require('../models/emergency.model')

const createEmergency = async (req, res) => {
    try{
        const newEmergency = await Emergency.create({
            user : [],
            doctor : [],
            hospital : [],
            date : '12-03-2012',
            reason : 'cold' ,
            status : []
        })
        await newEmergency.save();
        console.log(newEmergency);
        
    }catch(err){
        res.status(500).json({error : err.message })
    }
}

module.exports = { createEmergency }