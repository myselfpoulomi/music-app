import { populate } from "dotenv";
import albumModel from "../models/albumModel.js";
import {
  deleteImageFromCloudinary,
  uploadOnCloudinary
} from "../utils/cloudinary.js";

async function addAlbum(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "file is required" });
    }
    const filePath = req.file.path;
    const { title, desc, songs } = req.body;
    if (!title || !desc) {
      return res
        .status(400)
        .json({ message: "Title, description are required." });
    }
    let album = {
      title,
      desc
    };
    if (songs && songs != "") {
      album.songs = songs.split(",");
    }
    const cloudinary_response = await uploadOnCloudinary(filePath, "albums");
    if (!cloudinary_response)
      return res.status(400).json({ msg: "File not uploaded on cloud" });
    album.image = cloudinary_response.url;
    const newAlbum = new albumModel(album);
    const albumres = await newAlbum.save();
    return res
      .status(200)
      .json({ msg: "Album added successfully", album: albumres });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error while adding album", error });
  }
}

async function updateAlbum(req, res) {
  const { albumid } = req.params;
  const { title, desc, songs } = req.body;
  const file = req.file;
  if (!title && !desc && !songs && !file) {
    return res.status(400).json({ msg: "Nothing to update!", success: false });
  }
  try {
    const albumres = await albumModel.findById(albumid);
    if (!albumres)
      return res.status(400).json({ msg: "Album not found!", success: false });
    const obj = {};
    if (title) obj.title = title;
    if (desc) obj.desc = desc;
    if (songs && songs != "") {
      obj.songs = songs.split(",");
    }
    if (file) {
      if (albumres && albumres.image) {
        await deleteImageFromCloudinary(albumres.image);
      }
      const cloudinaryResponse = await uploadOnCloudinary(file.path, "albums");
      obj.image = cloudinaryResponse.url;
    }
    const updatedAlbum = await albumModel.findByIdAndUpdate(albumid, obj, {
      new: true
    });
    if (updatedAlbum) {
      return res
        .status(200)
        .json({ msg: "Album udpated", success: true, album: updatedAlbum });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error while updating album", error });
  }
}

async function deleteAlbum(req, res) {
  const { albumid } = req.params;
  try {
    const albumres = await albumModel.findById(albumid);
    if (!albumres) {
      return res.status(400).json({ msg: "Album not found!", success: false });
    }
    const deletedAlbum = await albumModel.findByIdAndDelete(albumid);
    return res.status(200).json({
      msg: "Album deleted successfully",
      success: true,
      album: deletedAlbum
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error while deleting album", error });
  }
}

async function getAlbumById(req, res) {
  const { albumid } = req.params;
  try {
    const albumres = await albumModel.findById(albumid);
    if (!albumres) {
      return res.status(400).json({ msg: "Album not found!", success: false });
    }
    return res.status(200).json({
      msg: "Album fetched successfully",
      success: true,
      album: albumres
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ msg: "Error while getting album by id", error });
  }
}

async function getAllAlbums(req, res) {
  try {
    const albumList = await albumModel.find({});
    return res.status(200).json({
      msg: "All albums feched successfully",
      success: true,
      albumList
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ msg: "Error while fetching all albums", error });
  }
}

async function getAlbumSongs(req, res) {
  const { albumid } = req.params;
  try {
    const album = await albumModel.findById(albumid).populate({
      path: "songs",
      populate: {
        path: "artist"
      }
    });
    if (!album) {
      return res.status(400).json({ msg: "Album not found!", success: false });
    }
    return res.status(200).json({
      msg: "Album songs fetched successfully",
      success: true,
      album
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Error while getting album songs", error });
  }
}

export {
  getAlbumSongs,
  addAlbum,
  updateAlbum,
  deleteAlbum,
  getAlbumById,
  getAllAlbums
};
