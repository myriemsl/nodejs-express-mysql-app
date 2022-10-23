const express = require('express');
const router = express.Router();
const { getAllPost, getPost, createPost, updatePost, deletePost } = require('../controllers/post.controllers');


// create post
router.post('/newpost', createPost);

// get all posts
router.get('/posts', getAllPost);

// get post by id
router.get('/post/:id', getPost);

// update post 
router.put('/post/:id', updatePost);

// delete post
router.delete('/post/:id', deletePost);


module.exports = router;