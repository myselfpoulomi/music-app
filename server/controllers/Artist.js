import {
  deleteImageFromCloudinary,
  uploadOnCloudinary
} from "../utils/cloudinary.js";
import artistModel from "../models/artistModel.js";
import songModel from "../models/songModel.js";

async function addArtist(req, res) {
  const filepath = req.file.path;
  const name = req.body.name;
  if (!filepath || !name) {
    return res.status(400).json({ msg: "File path or artist name missing" });
  }
  try {
    const cloudinary_response = await uploadOnCloudinary(filepath, "artists");
    if (!cloudinary_response)
      return res.status(400).json({ msg: "File not uploaded on cloud" });
    const newArtist = await artistModel({
      name,
      image: cloudinary_response.url
    });
    const response = await newArtist.save();
    if (response) {
      return res.status(200).json({ response });
    } else {
      return res.status(400).json({ msg: "Artist not added to the database" });
    }
  } catch (error) {
    console.error("Error while adding artist", error);
    return res.status(500).json({ msg: "Error while adding artist", error });
  }
}

async function deleteAritst(req, res) {
  const { artistid } = req.params;
  try {
    const artistRes = await artistModel.findById(artistid);
    if (!artistRes) {
      return res.status(404).json({ msg: "Artist not found" });
    }
    if (artistRes.image) {
      await deleteImageFromCloudinary(artistRes.image);
    }
    const response = await artistModel.findByIdAndDelete(artistid);
    return res
      .status(200)
      .json({ msg: "Artist deleted successfully", response });
  } catch (error) {
    console.error("Error while deleting artist", error);
    return res.status(500).json({ msg: "Error while deleting artist", error });
  }
}

async function getAllArtist(req, res) {
  try {
    const artistList = await artistModel.find({});
    return res.status(200).json({ artistList });
  } catch (error) {
    console.error("Error while fetching all artist", error);
    return res
      .status(500)
      .json({ msg: "Error while fetching all artist", error });
  }
}

async function updateArtist(req, res) {
  try {
    const { artistid } = req.params;
    const { name } = req.body;
    const filepath = req.file?.path;
    const updateData = {};
    if (name) {
      updateData.name = name;
    }
    if (filepath) {
      const artistRes = await artistModel.findById(artistid);
      if (artistRes && artistRes.image) {
        await deleteImageFromCloudinary(artistRes.image);
      }
      const cloudinaryResponse = await uploadOnCloudinary(filepath, "artists");
      updateData.image = cloudinaryResponse.url;
    }
    const updatedArtist = await artistModel.findByIdAndUpdate(
      artistid,
      updateData,
      { new: true }
    );
    res.status(200).json({ msg: "Artist updated successfully", updatedArtist });
  } catch (error) {
    console.error("Error updating artist:", error);
    res
      .status(500)
      .json({ msg: "An error occurred while updating the artist" });
  }
}

async function getArtistById(req, res) {
  try {
    const { artistid } = req.params;
    const artist = await artistModel.findById(artistid);
    if (!artist) {
      return res.status(400).json({ msg: "Artist not found" });
    }
    res.status(200).json({ artist });
  } catch (error) {
    console.error("Error finding artist:", error);
    res.status(500).json({ msg: "An error occurred while finding the artist" });
  }
}

async function getArtistSongs(req, res) {
  const { artistid } = req.params;
  try {
    console.log(artistid);

    const artst = await artistModel.findById(artistid);

    if (!artst) {
      return res.status(404).json({ msg: "Artist not found" });
    }

    const songs = await songModel.find({ artist: artistid });

    const data = {
      artist: artst,
      songs
    };

    return res.status(200).json({ result: data });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Error while getting artist songs", error });
  }
}

export {
  getArtistSongs,
  addArtist,
  deleteAritst,
  getAllArtist,
  updateArtist,
  getArtistById
};
