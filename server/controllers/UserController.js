import UserModel from "../models/UserModel.js";
import OtpModel from "../models/otpModel.js";
import PlaylistModel from "../models/PlaylistModel.js";
import GenerateOTP from "../utils/GenerateOTP.js";
import SongModel from "../models/songModel.js";
import SendMail from "../utils/SendMai.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* ====== User Authentication ====== */

async function logout(req, res) {
  try {
    res.clearCookie("token");
    return res.status(200).json({ msg: "Logged out successfully!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Internal server error", error: error.message });
  }
}
async function registerSendOtp(req, res) {
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(400).json({ msg: "Email is required!" });
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
  const { otpid, otp, email } = req.body;
  if (!otpid || !otp || !email) {
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

    await OtpModel.findByIdAndDelete(existingOtp._id);

    return res.status(200).json({ msg: "OTP Verified successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Internal server error", error: error.message });
  }
}

async function registerCreateUser(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "All fields are required!" });
  }
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ msg: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword
    });
    await newUser.save();

    const token = jwt.sign(
      {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: "None"
    });

    newUser.password = null;

    return res.status(200).json({ msg: "User created successfully", user:newUser });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Internal server error", error: error.message });
  }
}
async function loginSendOtp(req, res) {
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(400).json({ msg: "Email is required!" });
    }

    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ msg: "User not found!" });
    }

    const otp = GenerateOTP(5);
    const newOtp = new OtpModel({ email, otp });

    const response = await SendMail(
      email,
      "OTP for Geet Music Login",
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
async function loginVerifyOtp(req, res) {
  const { otpid, otp, email } = req.body;
  if (!otpid || !otp || !email) {
    return res.status(400).json({ msg: "All fields are required!" });
  }
  try {
    const existingUser = await UserModel.findOne({ email }).select("-password");
    if (!existingUser) {
      return res.status(404).json({ msg: "User not found!" });
    }

    const existingOtp = await OtpModel.findById(otpid);
    if (!existingOtp) {
      return res.status(400).json({ msg: "OTP not found! Resend" });
    }
    if (existingOtp.otp !== otp) {
      return res.status(400).json({ msg: "Wrong OTP" });
    }

    const token = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
        name: existingUser.name,
        role: existingUser.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: "None"
    });

    await OtpModel.findByIdAndDelete(existingOtp._id);

    return res
      .status(200)
      .json({ msg: "Login successful", user: existingUser });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Internal server error", error: error.message });
  }
}
async function loginWithPassword(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "All fields are required!" });
  }
  try {
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ msg: "User not found!" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ msg: "Invalid password" });
    }
    existingUser.password = "";
    const token = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
        name: existingUser.name,
        role: existingUser.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: "None"
    });

    return res.status(300).json({ user: existingUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
}

/* ====== User Profile ====== */
async function updateName(req, res) {
  const { role } = req;
  if (role !== "user") {
    return res.status(403).json({ msg: "Unauthorized" });
  }
  const { name } = req.body;
  try {
    const existingUser = await UserModel.findByIdAndUpdate(req.id, { name });
    if (!existingUser) {
      return res.status(404).json({ msg: "User not found" });
    }
    return res.status(200).json({ msg: "Name updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
}
async function getUser(req, res) {
  const { role } = req;
  if (role !== "user") {
    return res.status(403).json({ msg: "Unauthorized" });
  }
  try {
    const user = await UserModel.findById(req.id).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    return res.status(200).json({ msg: "User fetched successfully", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
}

/* ====== Playlist Management ====== */
async function createPlaylist(req, res) {
  const { name } = req.body;
  try {
    const existingPlaylist = await PlaylistModel.findOne({ name });
    if (existingPlaylist) {
      return res.status(409).json({ msg: "Playlist already exists" });
    }
    const newPlaylist = new PlaylistModel({ name, user: req.id });
    await newPlaylist.save();

    await UserModel.findByIdAndUpdate(req.id, {
      $push: { playlists: newPlaylist._id }
    });

    return res.status(200).json({ msg: "Playlist created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
}
async function addSongToPlaylist(req, res) {
  const { playlistid, songid } = req.body;
  try {
    const [existingUser, playlist, song] = await Promise.all([
      UserModel.findById(req.id),
      PlaylistModel.findById(playlistid),
      SongModel.findById(songid)
    ]);

    if (!existingUser) {
      return res.status(404).json({ msg: "User not found!" });
    }

    if (
      !existingUser.playlists ||
      !existingUser.playlists.includes(playlistid)
    ) {
      return res.status(400).json({ msg: "Playlist not found on user!" });
    }

    if (!playlist) {
      return res.status(404).json({ msg: "Playlist not found" });
    }

    if (!song) {
      return res.status(404).json({ msg: "Song not found" });
    }

    if (playlist.songs.includes(songid)) {
      return res.status(400).json({ msg: "Song is already present" });
    }

    playlist.songs.push(songid);
    await playlist.save();

    return res.status(200).json({ msg: "Song added to playlist" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
}
async function removeSongFromPlaylist(req, res) {
  const { playlistid, songid } = req.body;
  if (!playlistid || !songid)
    return res.status(400).json({ msg: "Fill all the fields" });
  try {
    const [existingUser, playlist, song] = await Promise.all([
      UserModel.findById(req.id),
      PlaylistModel.findById(playlistid),
      SongModel.findById(songid)
    ]);

    if (!existingUser) return res.status(400).json({ msg: "User not found" });
    if (
      !existingUser.playlists ||
      !existingUser.playlists.includes(playlistid)
    ) {
      return res.status(400).json({ msg: "Playlist not found on user!" });
    }
    if (!playlist) return res.status(400).json({ msg: "Playlist not found" });
    if (!playlist.songs.includes(songid))
      return res.status(400).json({ msg: "Song not present on playlist" });
    if (!song) return res.status(400).json({ msg: "Song not found" });

    playlist.songs.pull(songid);
    await playlist.save();

    return res.status(200).json({ msg: "Song removed from playlist" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
}
async function getAllPlaylists(req, res) {
  try {
    const existingUser = await UserModel.findById(req.id)
      .select("-password")
      .populate({
        path: "playlists",
        populate: {
          path: "songs"
        }
      });
    console.log(existingUser);
    return res.status(200).json({ existingUser });
  } catch (error) {}
}
async function getPlaylist(req, res) {
  const { playlistid } = req.params;
  try {
    const [existingUser, playlist] = await Promise.all([
      UserModel.findById(req.id),
      PlaylistModel.findById(playlistid).populate("songs")
    ]);
    if (!playlist) {
      return res.status(400).json({ msg: "playlist not found" });
    }
    if (!existingUser.playlists.includes(playlistid)) {
      return res.status(400).json({ msg: "Playlist not found on user" });
    }
    return res.status(200).json({ playlist });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
}
async function updatePlaylistName(req, res) {
  const { playlistid } = req.params;
  const { name } = req.body;
  if (!name) return res.status(400).json({ msg: "Name field required" });
  try {
    const [existingUser, playlist] = await Promise.all([
      UserModel.findById(req.id),
      PlaylistModel.findById(playlistid)
    ]);

    if (!playlist) {
      return res.status(400).json({ msg: "Playlist not found!" });
    }

    if (!existingUser) {
      return res.status(400).json({ msg: "User not found!" });
    }

    console.log(existingUser);

    if (
      !existingUser.playlists ||
      !existingUser.playlists.includes(playlistid)
    ) {
      return res.status(400).json({ msg: "Playlist not found on user!" });
    }

    playlist.name = name;
    await playlist.save();

    return res.status(200).json({ msg: "Playlist name updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
}
async function deletePlaylist(req, res) {
  const { playlistid } = req.params;
  if (!playlistid) {
    return res.status(400).json({ msg: "Playlist ID is required" });
  }
  try {
    const [existingUser, playlist] = await Promise.all([
      UserModel.findById(req.id),
      PlaylistModel.findById(playlistid)
    ]);

    if (!existingUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (
      !existingUser.playlists ||
      !existingUser.playlists.includes(playlistid)
    ) {
      return res.status(400).json({ msg: "Playlist not found on user!" });
    }

    if (!playlist) {
      return res.status(404).json({ msg: "Playlist not found" });
    }

    await PlaylistModel.findByIdAndDelete(playlistid);

    existingUser.playlists.pull(playlistid);
    await existingUser.save();

    return res.status(200).json({ msg: "Playlist deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
}

export {
  /* User Authentication */
  registerSendOtp,
  registerCreateUser,
  registerVerify,
  loginSendOtp,
  loginVerifyOtp,
  loginWithPassword,
  logout,
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
