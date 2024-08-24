import express from "express"
import uploadStorage from "../middleware/multer.js"
import { addSong, getAllSongs } from "../controllers/Song.js"
const songRouter = express.Router()
songRouter.post("/addsong", uploadStorage.fields([
    { name: 'song', maxCount: 1 },
    { name: 'image', maxCount: 1 }
]), addSong)
songRouter.get("/getallsongs", getAllSongs)
export default songRouter