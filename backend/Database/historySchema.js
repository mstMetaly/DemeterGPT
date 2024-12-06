// models/MedicalHistory.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Schema for Medical History Information
const medicalHistorySchema = new Schema({
    phone: {
        type: Number,
        unique: true,
        required: true, // Ensures phone number is provided
    },
    inducedAbortion: {
        type: Number
    },
    accidentalAbortion:{
        type:Number
    },
    neonatalDeath:{
        type:Number
    },
    stillBirth:{
        type:Number
    },
    abnormalChild:{
        type:Number
    },
    description:{
        type:String
    },
    pretermLabour:{
        type:Number
    },
    caesareanSection:{
        type:Number
    },
    diseases:{
        type:String
    },
    surgeryHistory:{
        type:String
    }
   
}, { timestamps: true });

// Creating the model for Medical History Information
const MedicalHistory = mongoose.model('MedicalHistory', medicalHistorySchema);

module.exports = MedicalHistory;
