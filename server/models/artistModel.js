import mongoose from "mongoose";
const artistSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    songs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'songs'
        }
    ]
})

const artistModel = mongoose.model("Artist", artistSchema)

export default artistModel