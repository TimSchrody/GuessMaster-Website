const express = require("express");
const path = require('path');
const app = express();

const rout = require("./routes/routes.js");

//Routes ...
app.use("", rout);

//neccessairy for style.css
const publicDirectory = path.join(__dirname + '/views');
app.use(express.static(publicDirectory));

//Set View Engine for NodeJS
app.set('view engine', 'hbs');

//Port 3005
app.listen(3005,() =>{
    console.log("Server started on Port 3005");
});