const mysql = require('mysql');
require('dotenv').config({path:'./config/.env'})


const db = mysql.createConnection({
    host: process.env.HOST_KEY,
    user: process.env.USER_KEY,
    password: process.env.DB_PRIVATE_KEY,
    database: process.env.DB_KEY
})

db.connect((err) => {
    if(!err){
        console.log('database successfully connected!');
    } else {
        console.log('databse failed \n Error : ' + JSON.stringify((err, undefined, 2)));
    }
})

module.exports = db;

