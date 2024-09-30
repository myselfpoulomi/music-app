import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  playlists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Playlist"
    }
  ]
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
