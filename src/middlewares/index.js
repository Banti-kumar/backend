import { V2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY_NAME,
  api_secret: process.env.API_KEY_SECRET,
});

const uploadOnCloudinary = async (localfilePath) => {
  try {
    if (!localfilePath) return null;
    // file upload on the cloudnary successfully
    const res = await cloudinary.uploader.upload(localfilePath, {
      resource_type: "auto",
    });
    console.log("file upload on the cloudnary successfully", res);
    return res;
  } catch (error) {
    fs.unlinkSync(localfilePath); // remove the locally saved temporary file as the upload operation got failed
    console.log("file is not upload on the cloudnary", error);
    return null;
  }
};

export default uploadOnCloudinary;

import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
 export default const upload = multer({ storage })
