const {UserProfile} = require('../Database/models');

exports.getProfileInfo = async (req, res) => {
    //get profile info
    try {
        const phone = req.body.phone;

        if (!phone) {
            return res.status(400).json({ success: false, error: 'Phone is required' });
        }

        const profile = await UserProfile.findOne({ phone });

        if (!profile) {
            return res.status(404).json({ success: false, error: 'No user found' });
        }

        res.status(200).json({ success: true, data: profile });
    }
    catch (err) {
        console.log("error fetching profile info");
        res.status(500).json({ success: false, error: 'Internal server error for fetching profile info' });
    }

};


exports.updateProfileInfo = async (req, res) => {
    try {
        const { phone, name, age, emergencyContact, village, upazilla, postOffice, district, division } = req.body;

        // Validate required field
        if (!phone) {
            return res.status(400).json({ success: false, error: 'Phone is required for updating the profile' });
        }

        //newly added
        // Filter out fields with null values
       // Prepare the updated data by keeping existing values for null/undefined fields
       const existingProfile = await UserProfile.findOne({ phone });
       if (!existingProfile) {
           return res.status(404).json({ success: false, error: 'No user found with the given phone number' });
       }
       console.log("existing: ", existingProfile);
       const updatedData = {
        name: name !== null && name !== undefined  && name != '' ? name : existingProfile.name,
        age: age !== null && age !== undefined  && age != ''? age : existingProfile.age,
        emergencyContact: emergencyContact !== null && emergencyContact !== undefined && emergencyContact!='' ? emergencyContact : existingProfile.emergencyContact,
        village: village !== null && village !== undefined  && village != ''? village : existingProfile.village,
        upazilla: upazilla !== null && upazilla !== undefined  && upazilla!=''? upazilla : existingProfile.upazilla,
        postOffice: postOffice !== null && postOffice !== undefined && postOffice!=''? postOffice : existingProfile.postOffice,
        district: district !== null && district !== undefined && district !=''? district : existingProfile.district,
        division: division !== null && division !== undefined && division != '' ? division : existingProfile.division,
    };

    console.log("here u[dated]: ", updatedData);

    // Update the profile with the prepared data
    const updatedProfile = await UserProfile.findOneAndUpdate(
        { phone }, // Filter: Find the document with this phone
        { $set: updatedData }, // Update only non-null/undefined fields
        { new: true, runValidators: true } // Options: Return the updated document and validate the changes
    );

//ended newly added
        if (!updatedProfile) {
            return res.status(404).json({ success: false, error: 'No user found with the given phone number' });
        }

        return res.status(200).json({
            success: true,
            message: 'User profile updated successfully',
            data: updatedProfile
        });
    } catch (error) {
        console.error('Error updating user profile:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};
