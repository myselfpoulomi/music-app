import mongoose, { Mongoose } from "mongoose";

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    song: {
        type: String,
        required: true
    },
    artist: {
        type: mongoose.Types.ObjectId,
        ref: "Artist",
        required: true,
    },
    album: {
        type: mongoose.Types.ObjectId,
        ref: "Album"
    },
});

const SongModel = mongoose.model("Song", songSchema);

export default SongModel;
