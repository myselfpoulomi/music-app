import SongModel from "../models/songModel.js";
import {
  deleteImageFromCloudinary,
  deleteMp3FromCloudinary,
  uploadMp3OnCloudinary,
  uploadOnCloudinary
} from "../utils/cloudinary.js";

async function addSong(req, res) {
  try {
    const { title, artist, album } = req.body;
    const song = req.files["song"] ? req.files["song"][0] : null;
    const image = req.files["image"] ? req.files["image"][0] : null;

    if (!title || !artist || !image || !song) {
      return res
        .status(404)
        .json({ msg: "Not all fields are provided!", status: false });
    }
    const song_cloud_res = await uploadMp3OnCloudinary(song.path, "songs");
    const image_cloud_res = await uploadOnCloudinary(image.path, "songcover");
    if (!song_cloud_res || !image_cloud_res) {
      return res
        .status(400)
        .json({ msg: "Error while uploading on cloud!", status: false });
    }

    const newSong = new SongModel({
      title,
      image: image_cloud_res.url,
      song: song_cloud_res.url,
      artist
    });
    if (album) {
      newSong.album = album;
    }

    const response = await newSong.save();

    if (response) {
      return res
        .status(200)
        .json({ msg: "New song added", success: true, song: response });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error while uploading song!", status: false });
  }
}

async function getAllSongs(req, res) {
  try {
    const resonse = await SongModel.find({});
    return res
      .status(200)
      .json({ msg: "All songs fetched", status: true, songs: resonse });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error while fetching songs!", status: false });
  }
}

async function deleteSong(req, res) {
  const { songid } = req.params;
  try {
    const songres = await SongModel.findById(songid);
    if (!songres) {
      return res.status(400).json({ msg: "Song not found", status: false });
    }
    await deleteImageFromCloudinary(songres.image);
    await deleteMp3FromCloudinary(songres.song);
    const deletedRes = await SongModel.findByIdAndDelete(songid);
    if (deletedRes) {
      return res.status(200).json({
        msg: "Song deleted successfully",
        status: true,
        songs: deletedRes
      });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ msg: "Error while deleting song!", status: false });
  }
}

async function getSongById(req, res) {
  const { songid } = req.params;
  try {
    const songres = await SongModel.findById(songid);
    if (!songres) {
      return res.status(400).json({ msg: "Song not found", status: false });
    }
    return res
      .status(200)
      .json({ msg: "Song fetched successfully", status: true, song: songres });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ msg: "Error while deleting song!", status: false });
  }
}

async function updateSong(req, res) {
  const { songid } = req.params;
  const { title, artist, album } = req.body;
  const song = req.files["song"] ? req.files["song"][0] : null;
  const image = req.files["image"] ? req.files["image"][0] : null;
  if (!title && !artist && !album && !song && !image) {
    return res.status(400).json({ msg: "nothing to update", success: false });
  }
  try {
    const songres = await SongModel.findById(songid);
    if (!songres) {
      return res.status(400).json({ msg: "Song not found", status: false });
    }
    const obj = {};
    if (title) obj.title = title;
    if (artist) obj.artist = artist;
    if (album) obj.album = album;
    if (image) {
      if (songres && songres.image) {
        await deleteImageFromCloudinary(songres.image);
      }
      const cloudinaryResponse = await uploadOnCloudinary(
        image.path,
        "songcover"
      );
      obj.image = cloudinaryResponse.url;
    }
    if (song) {
      if (songres && songres.song) {
        await deleteMp3FromCloudinary(songres.song);
      }
      const cloudinaryResponse = await uploadMp3OnCloudinary(
        song.path,
        "songs"
      );
      obj.song = cloudinaryResponse.url;
    }
    const updatedSong = await SongModel.findByIdAndUpdate(songid, obj, {
      new: true
    });
    if (updatedSong) {
      return res.status(200).json({
        msg: "Song updated successfully",
        status: true,
        song: updatedSong
      });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ msg: "Error while updating song!", status: false });
  }
}

export { addSong, getAllSongs, deleteSong, getSongById, updateSong };
