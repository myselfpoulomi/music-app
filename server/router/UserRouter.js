import express from "express";
import {
  sendOtp,
  verifyOtpNCreateUser,
  updateName,
  getUser,
  createPlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
  getAllPlaylists,
  getPlaylist,
  updatePlaylistName,
  deletePlaylist
} from "../controllers/UserController.js";

const UserRouter = express.Router();

UserRouter.post("/user/send-otp", sendOtp);
UserRouter.post("/user/verify-otp/create-user", verifyOtpNCreateUser);
UserRouter.put("/user/update-name/:userid", updateName);
UserRouter.get("/user/get-user", getUser);

UserRouter.post("/user/create-playlist", createPlaylist);
UserRouter.post("/user/add-song-to-playlist", addSongToPlaylist);
UserRouter.post("/user/remove-song-to-playlist", removeSongFromPlaylist);
UserRouter.get("/user/get-all-playlists/:userid", getAllPlaylists);
UserRouter.get("/user/get-playlist/:playlistid", getPlaylist);
UserRouter.put("/user/update-playlist-name/:playlistid", getPlaylist);
UserRouter.delete("/user/delete-playlist/:playlistid", deletePlaylist);

export default UserRouter;
