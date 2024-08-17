import { uploadOnCloudinary } from "../utils/cloudinary.js"
import artistModel from "../models/artistModel.js"

async function addArtist(req, res) {
    const filepath = req.file.path
    const name = req.body.name
    try {
        const cloudinary_response = await uploadOnCloudinary(filepath, "artists")
        if (!cloudinary_response) res.status(400).json({ msg: "File not uploaded on cloud" })
        const newArtist = await artistModel({
            name,
            image: cloudinary_response.url
        })
        const response = await newArtist.save()
        if (response) {
            res.status(200).json({ response })
        } else {
            res.status(401).json({ msg: "Artist not added to database" })
        }
    } catch (error) {
        console.error("Error while adding artist", error);
        res.status(500).json({ msg: "Error while adding artist", error })
    }
}

async function deleteAritst(req, res) {

}

export { addArtist, deleteAritst }