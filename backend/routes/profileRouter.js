const express = require('express');
const router = express.Router();

const {getProfileInfo, updateProfileInfo} = require('../controllers/profileController');

router.post('/get', getProfileInfo);

router.post('/update', updateProfileInfo);

module.exports = router;
