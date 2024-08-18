import albumModel from "../models/albumModel.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";

async function addAlbum(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ msg: "file is required" })
        }
        const filePath = req.file.path;
        const { title, desc, songs } = req.body;
        if (!title || !desc) {
            return res.status(400).json({ message: 'Title, description are required.' });
        }
        let album = {
            title, desc
        }
        if (songs && songs != "") {
            album.songs = songs.split(',')
        }
        const cloudinary_response = await uploadOnCloudinary(filePath, "albums")
        if (!cloudinary_response) return res.status(400).json({ msg: "File not uploaded on cloud" })
        album.image = cloudinary_response.url
        const newAlbum = new albumModel(album)
        const albumres = await newAlbum.save()
        return res.status(200).json({ msg: "Album added successfully", album: albumres })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Error while adding album", error })
    }
}

export { addAlbum }