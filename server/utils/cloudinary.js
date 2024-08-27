import { v2 as cloudinary } from "cloudinary";
import { v2 as cloudinaryMusic } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

cloudinaryMusic.config({
  cloud_name: process.env.MUSIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.MUSIC_CLOUDINARY_API_KEY,
  api_secret: process.env.MUSIC_CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath, subfolderName) => {
  try {
    if (!localFilePath || !subfolderName) return null;

    const options = {
      resource_type: "auto",
      folder: `geet-music/${subfolderName}`
    };

    const response = await cloudinary.uploader.upload(localFilePath, options);

    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.log("Error uploading file to Cloudinary", error);
    fs.unlinkSync(localFilePath);
    return null;
  }
};

const deleteImageFromCloudinary = async url => {
  try {
    const parts = url.split("/");
    const last = parts[parts.length - 1].split(".");
    const publicId =
      parts[parts.length - 3] + "/" + parts[parts.length - 2] + "/" + last[0];
    const response = await cloudinary.uploader.destroy(publicId);
    return response;
  } catch (error) {
    console.log("Error deleting file from Cloudinary", error);
    return null;
  }
};

const uploadMp3OnCloudinary = async (localFilePath, subfolderName) => {
  try {
    if (!localFilePath || !subfolderName) return null;

    const options = {
      resource_type: "auto",
      folder: `geet-music/${subfolderName}`
    };

    const response = await cloudinaryMusic.uploader.upload(
      localFilePath,
      options
    );

    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.log("Error uploading mp3 file to Cloudinary", error);
    fs.unlinkSync(localFilePath);
    return null;
  }
};

const deleteMp3FromCloudinary = async url => {
  try {
    const urlParts = url.split("/");
    const fileNameWithExtension = urlParts.pop();
    const publicId = fileNameWithExtension.split(".")[0];

    if (!publicId) {
      throw new Error("Invalid URL format");
    }

    const response = await cloudinaryMusic.uploader.destroy(
      `geet-music/songs/${publicId}`,
      {
        resource_type: "video"
      }
    );
    return response;
  } catch (error) {
    console.error("Error deleting mp3 file from Cloudinary:", error);
    return null;
  }
};

export {
  uploadOnCloudinary,
  deleteImageFromCloudinary,
  deleteMp3FromCloudinary,
  uploadMp3OnCloudinary
};
