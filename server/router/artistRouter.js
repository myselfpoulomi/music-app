import express from "express"
import { addArtist, deleteAritst, getAllArtist, getArtistById, updateArtist } from "../controllers/Artist.js"
import uploadStorage from "../middleware/multer.js"
const artistRouter = express.Router()

artistRouter.post("/admin/addartist/", uploadStorage.single("file"), addArtist)
artistRouter.delete("/admin/deleteartist/:artistid", deleteAritst)
artistRouter.get("/getallartists", getAllArtist)
artistRouter.get("/getartistbyid/:artistid", getArtistById)
artistRouter.put("/admin/updateartist/:artistid", uploadStorage.single("file"), updateArtist)

export default artistRouter