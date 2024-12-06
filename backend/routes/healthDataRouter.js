const express = require('express');
const router = express.Router();

const {getUserHealthInfo, insertUserHealthInfo} = require('../controllers/healthController');

router.post('/get', getUserHealthInfo);

router.post('/update', insertUserHealthInfo);

module.exports = router;