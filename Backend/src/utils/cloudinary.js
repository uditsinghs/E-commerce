import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from 'dotenv'
dotenv.config()

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_KEY_SECRET,
});

// Upload an image
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const uploadResult = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto", // Auto-detects the file type (image, video, etc.)
    });

    console.log("Upload successful:", uploadResult);

    // Delete the local file after successful upload
    fs.unlinkSync(localFilePath);

    return uploadResult;
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);

    // Ensure the local file is deleted even on error
    fs.unlinkSync(localFilePath);

    return null;
  }
};

export default uploadOnCloudinary;
