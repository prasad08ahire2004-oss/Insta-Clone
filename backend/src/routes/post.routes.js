const express = require('express');

const postRouter = express.Router();

const postController = require('../controllers/post.controller');
const multer = require('multer');
const identifyUser = require('../middleware/auth.middleware');

const upload = multer({
    storage: multer.memoryStorage()
});

// API 1: Create a post and also identifies which user created it
postRouter.post(
    '/',
    identifyUser,
    upload.single('image'),
    postController.createPostController
);

// API 2: Fetch feed posts and also identifies which user is fetching all the posts
postRouter.get(
    '/feed',
    identifyUser,
    postController.getFeedController
);

module.exports = postRouter;