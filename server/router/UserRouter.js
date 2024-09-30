import express from "express";
import {
  registerSendOtp,
  registerVerify,
  updateName,
  loginSendOtp,
  loginVerifyOtp,
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

/* ====== Registration Routes ====== */
UserRouter.post("/user/register/send-otp", registerSendOtp);
UserRouter.post("/user/register/verify-otp/create-user", registerVerify);

/* ====== Login Routes ====== */
UserRouter.post("/user/login/send-otp", loginSendOtp);
UserRouter.post("/user/login/verify-otp", loginVerifyOtp);

/* ====== User Profile Routes ====== */
UserRouter.get("/user/get-user", getUser);
UserRouter.put("/user/update-name/:userid", updateName);

/* ====== Playlist Management Routes ====== */
UserRouter.post("/user/create-playlist", createPlaylist);
UserRouter.post("/user/add-song-to-playlist", addSongToPlaylist);
UserRouter.post("/user/remove-song-from-playlist", removeSongFromPlaylist);
UserRouter.get("/user/get-all-playlists/:userid", getAllPlaylists);
UserRouter.get("/user/get-playlist/:playlistid", getPlaylist);
UserRouter.put("/user/update-playlist-name/:playlistid", updatePlaylistName);
UserRouter.delete("/user/delete-playlist/:playlistid", deletePlaylist);

export default UserRouter;
