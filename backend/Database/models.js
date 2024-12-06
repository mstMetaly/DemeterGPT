// models/User.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  phone: {
    type: Number,
    required: true,
    unique: true
    // match: /^[0-9]{10,15}$/ // Validates phone number format
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });



const userProfileSchema = new mongoose.Schema({
  name: {
    type: String
  },
  age: {
    type: Number,
    min: 0
  },
  phone: {
    type: Number
    // match: [/^\d{10,15}$/, 'Please enter a valid phone number'], // Regex for phone numbers (10-15 digits)
  },
  emergencyContact: {
    type: Number
    //match: [/^\d{10,15}$/, 'Please enter a valid emergency contact number'], // Regex for phone numbers (10-15 digits)
  },
  village: {
    type: String
  },
  upazilla: {
    type: String
  },
  postOffice: {
    type: String
  },
  district: {
    type: String
  },
  division: {
    type: String
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});


const User = mongoose.model('User', userSchema);
const UserProfile = mongoose.model('UserProfile', userProfileSchema);


module.exports = { User, UserProfile };
