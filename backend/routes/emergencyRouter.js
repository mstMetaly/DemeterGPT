const express = require('express');
const router = express.Router();
const axios = require('axios');
const path = require('path');

router.get('/nearby-hospitals', async(req, res)=>{
    const { latitude, longitude, radius = 5000 } = req.query;

    if (!latitude || !longitude) {
        return res.status(400).json({ error: 'Latitude and longitude are required.' });
    }

    console.log("lat:", latitude, "logitute:", longitude);

    const apiKey = 'AIzaSyB1UOBnfU2NMx2soTgoz1BqhcA2jkhzflA';
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=hospital&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        const hospitals = response.data.results.map((hospital) => ({
            name: hospital.name,
            location: hospital.geometry.location,
            address: hospital.vicinity,
        }));
        console.log("response,",hospitals);

        res.json(hospitals);
    } catch (error) {
        console.error('Error fetching nearby hospitals:', error.message);
        res.status(500).json({ error: 'Failed to fetch nearby hospitals.' });
    }
});


module.exports = router;