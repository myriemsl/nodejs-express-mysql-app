const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const multer = require("multer");


// middelwares to parse data
app.use(express.json());
app.use(cookieParser());


// upload images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

// define routes
app.use('/', require('./routes/auth.routes'));
app.use('/', require('./routes/post.routes'));


// set port
PORT = 8080
// running server
app.listen(PORT, (req, res, err) => {
    if (err) console.log(err)
    else console.log(`server is running on port ${PORT}`)
})
