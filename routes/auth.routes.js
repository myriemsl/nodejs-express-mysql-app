const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/auth.controllers');


// create account
router.post('/register', register);

// login 
router.post('/login', login);

// logout
router.post('/logout', logout)

module.exports = router;
