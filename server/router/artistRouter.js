import express from "express"
import { addArtist, deleteAritst } from "../controllers/Artist.js"
import uploadStorage from "../middleware/multer.js"
const artistRouter = express.Router()

artistRouter.post("/admin/addartist/", uploadStorage.single("file"), addArtist)
artistRouter.delete("/admin/deleteartist/:artistid", deleteAritst)

export default artistRouter