const express = require('express');

const router = express.Router();

const {getMedicalHistory, updateMedicalHistory} =  require('../controllers/medicalHistoryController.js');

router.post('/update', updateMedicalHistory);
router.post('/get', getMedicalHistory);

module.exports = router;
