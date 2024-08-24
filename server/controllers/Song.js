import SongModel from "../models/songModel.js";
import { uploadMp3OnCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js"

async function addSong(req, res) {
    try {
        const { title, artist, album } = req.body
        const song = req.files['song'] ? req.files['song'][0] : null;
        const image = req.files['image'] ? req.files['image'][0] : null;
        if (!title || !artist || !image || !song) {
            return res.status(404).json({ msg: "Not all fields are provided!", status: false })
        }
        const song_cloud_res = await uploadMp3OnCloudinary(song.path, "songs")
        const image_cloud_res = await uploadOnCloudinary(image.path, "songcover")
        if (!song_cloud_res || !image_cloud_res) {
            return res.status(400).json({ msg: "Error while uploading on cloud!", status: false })
        }

        const newSong = new SongModel({
            title,
            image: image_cloud_res.url,
            song: song_cloud_res.url,
            artist,
        })
        if (album) {
            newSong.album = album
        }

        const response = await newSong.save()

        if (response) {
            return res.status(200).json({ msg: "New song added", success: true, song: response })
        }

    } catch (error) {
        return res.status(500).json({ msg: "Error while uploading song!", status: false })
    }
}

async function getAllSongs(req, res) {
    try {
        const resonse = await SongModel.find({})
        return res.status(200).json({ msg: "All songs fetched", status: true, songs: resonse })
    } catch (error) {
        return res.status(500).json({ msg: "Error while fetching songs!", status: false })
    }
}

export { addSong, getAllSongs }