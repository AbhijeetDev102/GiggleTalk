const user = require("../models/Schema");
const { isFileTypeSupported, uploadFileToCloudinary } = require("./fileUpload");

exports.createProfile = async (req, res) => {
  try {
    const { bio, data } = req.body;
    const userId = data.userId
    if (!req.files || !req.files.profilePic) {
      return res.status(400).json({
          success: false,
          message: "No file uploaded"
      });
  }
    const file = req?.files?.profilePic;
    console.log(bio);
    console.log(userId);
    
    console.log(file);
    
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    if (!bio) {
      return res.status(400).json({
        success: false,
        message: "Bio  are required",
      });
    }
    if ( !file) {
      return res.status(400).json({
        success: false,
        message: "imagefile  are required",
      });
    }

    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file?.name.split(".")[1].toLowerCase();

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File format not supported",
      });
    }

    const response = await uploadFileToCloudinary(file, "Giggletalk");

    if (!response.secure_url) {
      return res.status(400).json({
        success: false,
        message: "Failed to upload profile picture",
      });
    }

    const User = await user.findOne({ where: { id: userId } });
    if (!User) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await user.update(
      { bio: bio, profilePic: response.secure_url,userId:userId, profileSetup: true },
      { where: { id: userId } }
    );

    const updatedUser = await user.findOne({ where: { id: userId } });

    if (!updatedUser) {
      return res.status(500).json({
        success: false,
        message: "Failed to update profile",
      });
    }

    updatedUser.Password=null;

    res.status(201).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors,
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
