import express from "express";
import uploadStorage from "../middleware/multer.js";
import {
  addAlbum,
  deleteAlbum,
  getAlbumById,
  getAllAlbums,
  updateAlbum
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
albumRouter.get("/admin/getallalbums", getAllAlbums);
export default albumRouter;
