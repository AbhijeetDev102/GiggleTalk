const user = require("../models/Schema");


exports.createProfile = async (req, res) => {
  try {
    const { bio, profilePic, location, userId } = req.body;
    const User = await user.findOne({ where: { id: userId } });
    if (!User) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    
    const profileUpdate = await user.update( { bio, profilePic, location,userId, profileSetup:true }, { where: { id: userId } });

    res.status(201).json({
      success: true,
      message: "Profile updated successfully",
      data: User,
    }); 


    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
