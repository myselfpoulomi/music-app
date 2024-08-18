import express from "express"
import uploadStorage from "../middleware/multer.js"
import { addAlbum } from "../controllers/Album.js"
const albumRouter = express.Router()
albumRouter.post("/admin/addalbum", uploadStorage.single("file"), addAlbum)
export default albumRouter