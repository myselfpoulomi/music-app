import express from "express";
import uploadStorage from "../middleware/multer.js";
import {
  addSong,
  deleteSong,
  getAllSongs,
  getSongById
} from "../controllers/Song.js";
const songRouter = express.Router();
songRouter.post(
  "/admin/addsong",
  uploadStorage.fields([
    { name: "song", maxCount: 1 },
    { name: "image", maxCount: 1 }
  ]),
  addSong
);
songRouter.get("/getallsongs", getAllSongs);
songRouter.get("/getsongbyid/:songid", getSongById);
songRouter.delete("/admin/deletesongbyid/:songid", deleteSong);
export default songRouter;
