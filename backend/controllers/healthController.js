const UserHealthInfo = require('../Database/healthSchema');

exports.getUserHealthInfo = async (req, res) => {
    //get profile info
    try{
        const phone = req.body.phone;

        if(!phone)
        {
            return res.status(400).json({success: false, error:'Phone is required'});
        }
    
        const healthInfo = await UserHealthInfo.findOne({phone});
    
        if(!healthInfo)
        {
            return res.status(404).json({success: false, error:'No user found'});
        }
        console.log("Ami weoe" + healthInfo);
    
        res.status(200).json({success:true, data:healthInfo});
    }
    catch(err)
    {
        console.log("error fetching profile info");
        res.status(500).json({ success: false, error: 'Internal server error for fetching profile info' });
    }
   
};

exports.insertUserHealthInfo = async (req, res) => {
    //update profile info
    try {
        const { phone, height, weight, duration,diastolicBP,blood_sugar,body_temp,heart_rate  } = req.body;

        if (!phone) {
            return res.status(400).json({ success: false, error: 'Phone is required for updating the profile' });
        }

        // Check if the NID is already in use
        const existingProfile = await UserHealthInfo.findOne({ phone });

        const updatedData = {
            height: (height !== null && height !== undefined && height != '') ? height : existingProfile.height,
            weight: (weight !== null && weight !== undefined && weight != '') ? weight : existingProfile.weight,
            duration: (duration !== null && duration !== undefined && duration != '') ? duration : existingProfile.duration,
            diastolicBP: (diastolicBP !== null && diastolicBP !== undefined && diastolicBP != '') ? diastolicBP : existingProfile.diastolicBP,
            blood_sugar: (blood_sugar !== null && blood_sugar !== undefined && blood_sugar != '') ? blood_sugar : existingProfile.blood_sugar,
            body_temp: (body_temp !== null && body_temp !== undefined && body_temp != '') ? body_temp : existingProfile.body_temp,
            heart_rate: (heart_rate !== null && heart_rate !== undefined && heart_rate != '') ? heart_rate : existingProfile.heart_rate,

        };

        console.log("here updated health: ", updatedData);
        console.log("here updated health: ", updatedData.healthActivity);
    
        // Update the profile with the prepared data
        const updatedHealthInfo = await UserHealthInfo.findOneAndUpdate(
            { phone }, // Filter: Find the document with this phone
            { $set: updatedData }, // Update only non-null/undefined fields
            { new: true, runValidators: true } // Options: Return the updated document and validate the changes
        );
        console.log("Ami weee" + updatedHealthInfo);

        if (!updatedHealthInfo) {
            return res.status(404).json({ success: false, error: 'No user found with the given phone number' });
        }

        console.log("updated health:", updatedHealthInfo);

        return res.status(200).json({
            message: 'User health info added successfully',
            data: updatedHealthInfo,
        });

    } catch (error) {
        console.error('Error adding user health info:', error);
        return res.status(500).json({
            message: 'Server error',
            error: error.message,
        });
    }
};
