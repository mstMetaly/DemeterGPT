// routes/signupRoute.js
const express = require('express');
const bcrypt = require('bcrypt');
const {User, UserProfile} = require('../Database/models');
const MedicalHistory = require('../Database/historySchema');
const UserHealthInfo = require('../Database/healthSchema');


const router = express.Router();

// Signup route
router.post('/', async (req, res) => {
    try {
        const { phone, password } = req.body;

        // Validate input
        if (!phone || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ phone });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            phone,
            password: hashedPassword
        });

        //create user for userProfile
        const newProfile = new UserProfile({
            phone,
            emergencyContact: phone, 
        });

        const newHistory = new MedicalHistory({
            phone
        });

        const newHealthInfo = new UserHealthInfo({
            phone
        });

        console.log("sign up er age");
        await newHealthInfo.save();
        console.log("health info e pushed");
        await newHistory.save();
        await newUser.save();
        await newProfile.save();
    
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
