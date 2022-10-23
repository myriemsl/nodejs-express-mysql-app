const db = require('../config/db');
const jwt = require('jsonwebtoken');


// @desc create post
// @route POST /newpost
// @access Private
 const createPost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json("Token is not valid!");

    const insert = "INSERT INTO posts(`title`, `description`, image, `category`, `date`,`userId`) VALUES (?)";

    const values = [
      req.body.title,
      req.body.description,
      req.body.image,
      req.body.category,
      req.body.date,
      user.id,
    ];

    db.query(insert, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("post has been successfully created.");
    });
  });
};


// @desc GET ALL POSTS
// @route POST /posts
// @access Public
const getAllPost = (req, res) => {
  const select = req.query.cat ?  "SELECT * FROM posts WHERE category=?" : "SELECT * FROM posts";
  db.query(select, [req.query.cat], (err, data) => {
    if (err) return res.status(500).json(err);   
    return res.status(200).json(data)
  });
};


// @desc GET ONE POST BY ID
// @route POST /post/:id
// @access Public
const getPost = (req, res) => {
  const select = "SELECT p.id, `username`, `job`, `title`, `description`, p.image, u.image As userImage, `category`, `date` FROM users u JOIN posts p ON u.id = p.userId WHERE p.id = ?";

  db.query(select, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data[0]);
  })
};


// @desc UPDATE POST
// @route POST /post/:id
// @access Private
const updatePost = async (req, res) => {
  const token = req.cookies.access_token;
  if(!token) return res.status(401).json("Not Authenticated!");
  
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json("Token is not valid!");
    const postId = req.params.id;
    const update = "UPDATE posts SET `title` =?, `description` =?, `image` =?, `category` =? WHERE `id` = ? AND `userId` = ?";

    const values = [
      req.body.title,
      req.body.description,
      req.body.image,
      req.body.category
    ]

    db.query(update, [...values, postId, user.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json('post has been successfully updated');
    });
  });
};



// @desc DELETE POST
// @route POST /post/:id
// @access Private
const deletePost =  (req,res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;
    const q = "DELETE FROM posts WHERE `id` = ? AND `userId` = ?";

    db.query(q, [postId, user.id], (err, data) => {
      if (err) return res.status(403).json("error");

      return res.json("Post has been deleted!");
    });
  });
};

module.exports = { createPost, getAllPost, getPost, updatePost, deletePost };
