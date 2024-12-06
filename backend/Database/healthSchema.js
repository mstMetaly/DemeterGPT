// models/User.js
const mongoose = require('mongoose');
const { Schema } = mongoose;



const userHealthInfoSchema = new Schema({
    phone: {
        type: Number,
        unique: true
      },
    height: {
        type: Number
      },
    weight: {
        type: Number
      },
      duration: {
        type: Number
      },
      diastolicBP:{
        type:Number
      },
      blood_sugar:{
        type:Number
      },
      body_temp:{
        type:Number
      },
      heart_rate:{
        type:Number
      }

}, { timestamps: true });

const UserHealthInfo = mongoose.model('UserHealthInfo', userHealthInfoSchema);

module.exports = UserHealthInfo;