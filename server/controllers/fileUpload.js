const cloudinary = require("cloudinary").v2

require("dotenv").config();

function isFileTypeSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}

const uploadFileToCloudinary = async (file, folder, quality) => {
  const options = { folder };

  if (quality) {
    options.quality = quality;
  }

  options.resource_type = "auto";
  return await cloudinary.uploader.upload(file.tempFilePath, options);
};

module.exports= { uploadFileToCloudinary, isFileTypeSupported };