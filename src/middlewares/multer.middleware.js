import multer from "multer";

const storage = multer.diskStorage({
  // Destination to store image file
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  // Set the file name to save in the server
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Multer function to upload file

const upload = multer({
  storage,
});

export default upload;
