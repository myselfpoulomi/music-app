import UserModel from "../models/UserModel.js";
import OtpModel from "../models/otpModel.js";
import GenerateOTP from "../utils/GenerateOTP.js";

/* ====== User Authentication ====== */
async function registerSendOtp(req, res) {
  const { name, password, email } = req.body;
  try {
    if (!name || !password || !email) {
      return res.status(400).json({ msg: "All fields are required!" });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ msg: "User already exists!" });
    }

    const otp = GenerateOTP(5);
    const newOtp = new OtpModel({ email, otp });

    await newOtp.save();
    return res
      .status(200)
      .json({ msg: "OTP sent to your email", otpid: newOtp._id });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Internal server error", error: error.message });
  }
}
async function registerVerify(req, res) {}
async function loginSendOtp(req, res) {}
async function loginVerifyOtp(req, res) {}

/* ====== User Profile ====== */
async function updateName(req, res) {}
async function getUser(req, res) {}

/* ====== Playlist Management ====== */
async function createPlaylist(req, res) {}
async function addSongToPlaylist(req, res) {}
async function removeSongFromPlaylist(req, res) {}
async function getAllPlaylists(req, res) {}
async function getPlaylist(req, res) {}
async function updatePlaylistName(req, res) {}
async function deletePlaylist(req, res) {}

export {
  /* User Authentication */
  registerSendOtp,
  registerVerify,
  loginSendOtp,
  loginVerifyOtp,
  /* User Profile */
  updateName,
  getUser,
  /* Playlist Management */
  createPlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
  getAllPlaylists,
  getPlaylist,
  updatePlaylistName,
  deletePlaylist
};
