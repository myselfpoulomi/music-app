import mongoose from "mongoose";
const albumSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    desc: {
        type: String,
    },
    image: {
        type: String,
    },
    songs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'songs'
        }
    ]
    // songs: [
    //     String
    // ]
})
const albumModel = mongoose.model("Album", albumSchema)
export default albumModel