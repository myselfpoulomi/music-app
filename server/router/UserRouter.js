import express from "express";
import AuthToken from "../middleware/AuthUser.js";
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
  deletePlaylist,
  loginWithPassword
} from "../controllers/UserController.js";

const UserRouter = express.Router();

/* ====== Registration Routes ====== */
UserRouter.post("/user/register/send-otp", registerSendOtp);
UserRouter.post("/user/register/verify-otp/create-user", registerVerify);

/* ====== Login Routes ====== */
UserRouter.post("/user/login/send-otp", loginSendOtp);
UserRouter.post("/user/login/verify-otp", loginVerifyOtp);
UserRouter.post("/user/login/with-password", loginWithPassword);

/* ====== User Profile Routes ====== */
UserRouter.get("/user/get-user", AuthToken, getUser);
UserRouter.put("/user/update-name", AuthToken, updateName);

/* ====== Playlist Management Routes ====== */
UserRouter.post("/user/create-playlist", AuthToken, createPlaylist);
UserRouter.post("/user/add-song-to-playlist", AuthToken, addSongToPlaylist);
UserRouter.post(
  "/user/remove-song-from-playlist",
  AuthToken,
  removeSongFromPlaylist
);
UserRouter.get("/user/get-all-playlists", AuthToken, getAllPlaylists);
UserRouter.get("/user/get-playlist/:playlistid", AuthToken, getPlaylist);
UserRouter.put(
  "/user/update-playlist-name/:playlistid",
  AuthToken,
  updatePlaylistName
);
UserRouter.delete(
  "/user/delete-playlist/:playlistid",
  AuthToken,
  deletePlaylist
);

export default UserRouter;
