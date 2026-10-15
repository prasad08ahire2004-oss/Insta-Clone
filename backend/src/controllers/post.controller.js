const postModel = require('../models/post.model')
const jwt = require('jsonwebtoken')
const ImageKit = require('@imagekit/nodejs')
const { toFile } = require('@imagekit/nodejs')
const { Folders } = require('@imagekit/nodejs/resources/index.js')

 
const imageKit = new ImageKit({
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY
 })


async function createPostController(req, res) {
    try {
        // Check whether an image was uploaded
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload an image to create a post"
            });
        }

        // Upload image to ImageKit
        const file = await imageKit.files.upload({
            file: await toFile(req.file.buffer, req.file.originalname),
            fileName: req.file.originalname,
            folder: "/insta-clone"
        });

        // Create post in MongoDB
        const post = await postModel.create({
            caption: req.body.caption || "",
            imgUrl: file.url,
            user: req.user.id
        });

        // Send success response
        return res.status(201).json({
            success: true,
            message: "Post created successfully",
            post
        });

    } catch (error) {
        console.error("Error creating post:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create post"
        });
    }
}

async function getFeedController(req, res) {
    try {
        const posts = await postModel
            .find()
            .populate('user');

        return res.status(200).json({
            message: "Feed fetched successfully",
            posts
        });

    } catch (error) {
        console.error("Error fetching feed:", error);

        return res.status(500).json({
            message: "Failed to fetch feed posts"
        });
    }
}


module.exports = {
    createPostController,
    getFeedController
}