import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  username: {
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
      ref: "Playlist",
      default: []
    }
  ]
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
