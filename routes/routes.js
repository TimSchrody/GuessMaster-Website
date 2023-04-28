const express = require("express");
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


router.get("", (req,res) => {
    res.render("Main");
});

router.get("/Profile", (req,res) => {
    res.render("Profile");
});

//Export the router
module.exports = router;