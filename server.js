const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');


// middelwares to parse data
app.use(express.json());
app.use(cookieParser());


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
