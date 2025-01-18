import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

// Configuration for cloudinary

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localfilePath) => {
  try {
    if (!localfilePath) return null;
    // Upload file on cloudinary server
    const res = await cloudinary.uploader.upload(localfilePath, {
      resource_type: "auto",
    });
    // file has been uploaded successfully on cloudnary server
    console.log(`file is upload on cloudnary`, res);
    return res;
  } catch (error) {
    fs.unlinkSync(localfilePath); // remove file from local directory if it is not uploaded on cloudinary
    return error;
  }
};

export default uploadOnCloudinary;
