require("dotenv").config({ path: "./env" });
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: [".jpg", ".png"],
  params: {
    folder: "blog-api",
    transformation: [{ width: 700, height: 700, crop: "limit" }],
  },
});

module.exports = storage;
