import express from "express";
import uploadStorage from "../middleware/multer.js";
import {
  addAlbum,
  deleteAlbum,
  getAlbumById,
  getAllAlbums,
  updateAlbum,
  getAlbumSongs
} from "../controllers/Album.js";
const albumRouter = express.Router();
albumRouter.post("/admin/addalbum", uploadStorage.single("file"), addAlbum);
albumRouter.put(
  "/admin/updatealbum/:albumid",
  uploadStorage.single("file"),
  updateAlbum
);
albumRouter.delete("/admin/deletealbum/:albumid", deleteAlbum);
albumRouter.get("/admin/getalbumbyid/:albumid", getAlbumById);
albumRouter.get("/getallalbums", getAllAlbums);
albumRouter.get("/album/:albumid", getAlbumSongs);

export default albumRouter;
