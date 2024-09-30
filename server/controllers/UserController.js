import UserModel from "../models/UserModel.js";
import OtpModel from "../models/otpModel.js";
import GenerateOTP from "../utils/GenerateOTP.js";
import SendMail from "../utils/SendMai.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

    const response = await SendMail(
      email,
      "OTP for Geet Music",
      `Your OTP is ${otp}`
    );
    if (!response) {
      throw new Error("Email not sent, Resend OTP");
    }

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
async function registerVerify(req, res) {
  const { otpid, otp, name, email, password } = req.body;
  if (!otpid || !otp || !name || !email || !password) {
    return res.status(400).json({ msg: "All fields are required!" });
  }
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ msg: "User already exists!" });
    }

    const existingOtp = await OtpModel.findById(otpid);
    if (!existingOtp) {
      return res.status(400).json({ msg: "OTP not found! resend" });
    }
    if (existingOtp.otp !== otp) {
      return res.status(400).json({ msg: "Wrong OTP" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword
    });
    await newUser.save();
    await newOtp.remove();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Internal server error", error: error.message });
  }
}
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
