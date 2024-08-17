import { v2 as cloudinary } from "cloudinary"
import fs from "fs"
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
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
}

const deleteMp3FromCloudinary = async (url) => {
    try {
        const urlParts = url.split('/');
        const fileNameWithExtension = urlParts[urlParts.length - 1];
        const publicId = fileNameWithExtension.split('.')[0];

        const response = await cloudinary.uploader.destroy(publicId, { resource_type: "video" });
        console.log(response);
        return response;
    } catch (error) {
        console.log("Error deleting file from Cloudinary", error);
        return null;
    }
};

export { uploadOnCloudinary, deleteMp3FromCloudinary }