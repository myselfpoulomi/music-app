import mongoose from "mongoose";

const playlistSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  songs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song"
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  visibility: {
    type: String,
    enum: ["public", "private"],
    default: "public"
  },
  collaborators: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

const playlistModel = mongoose.model("Playlist", playlistSchema);

export default playlistModel;
