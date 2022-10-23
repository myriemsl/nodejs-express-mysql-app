const  db  = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// @desc REGISTER
// @route POST /register
// @access Public
const register = async (req, res) => {

  const { email, username, password } = req.body;

  // confirm data
  if(!email || !username || !password) {
    return res.json({message: 'all fields are required!'})
  }

  // check if user already exist
const select = "SELECT * FROM users WHERE email = ? OR username = ?";
db.query(select, [email, email] ,(err, data) => {
  if (err) 
  { 
   return res.status(500).json(err)
  }
  
  if (data.length) { 
    return res.status(409).json('user with email, username already exists!')
    }

    // hash password
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(req.body.password, salt);


 // create account
  const insert = "INSERT INTO users(email, username, password) Values(?,?,?)";
  db.query(insert, [email, username, hashPassword], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("account was created successfully!")
  })
})

};



// @desc LOGIN
// @route POST /login
// @access Public
const login = async (req, res) => {

  const { username, password } = req.body;

  // confirm data
  if(!username || !password) {
    return res.json({message: 'all fields are required!'})
  }

    //CHECK USER

    const select = "SELECT * FROM users WHERE username = ?";

    db.query(select, [username], (err, data) => {
      if (err) return res.status(500).json(err);
      if (!data.length) return res.status(404).json("User not found!");
  
      //Check password
      const matchedPassword = bcrypt.compareSync(
        req.body.password,
        data[0].password
      );
  
      if (!matchedPassword)
        return res.status(400).json("Wrong password!");
  
      const token = jwt.sign({id: data[0].id}, process.env.ACCESS_TOKEN_SECRET);
      
  


      res.cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(token);
    });

};


// @desc LOGOUT
// @desc route /logout
// @access Public - just to clear cookie if exists
const logout = async (req, res) => {
  res.clearCookie('access_token', {
    sameSite: 'none',
    secure: true
  }).status(200).json('logged out successfully')
};


module.exports = { register, login, logout };


