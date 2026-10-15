const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        default: ""
    },
    imgUrl: {
        type: String,
        required: [true, "Image URL is required for creating the post"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "User ID is required for creating the post"]
    }
}, { timestamps: true });

const postModel = mongoose.model("posts", postSchema);

module.exports = postModel;