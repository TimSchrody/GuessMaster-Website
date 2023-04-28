const express = require("express");
const authController = require('../controller/auth');


const router = express.Router();


router.get("/Aboutus", (req,res) => {
    res.render("AboutUs");
});

router.get("/Blog", (req,res) => {
    res.render("Blog");
});

router.get("/ContactUs", (req,res) => {
    res.render("ContactUs");
});

router.get("/Stats", (req,res) =>{
    res.render("Stats");
});

router.get("/Login", (req,res) =>{
    res.render("LogReg");
});

router.get("", (req,res) => {
    res.render("Main");
});

router.get("/Profile", (req,res) => {
    res.render("Profile");
});


//Load Authentification Controller for Registration
//router.post('/register', authController.register);

//Load Controller for Login
router.post('/Login', authController.login); 

//Export the router
module.exports = router;