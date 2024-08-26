import express from "express"
import uploadStorage from "../middleware/multer.js"
import { addAlbum, updateAlbum } from "../controllers/Album.js"
const albumRouter = express.Router()
albumRouter.post("/admin/addalbum", uploadStorage.single("file"), addAlbum)
albumRouter.put("/admin/updatealbum/:albumid",uploadStorage.single("file"), updateAlbum)
export default albumRouter