const express = require("express");
const path = require('path');
const mysql = require("mysql2");
const dotenv = require("dotenv");
const session = require("express-session");
const bcrypt = require('bcryptjs');

dotenv.config({ path: './.env'});

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

const app = express();

//neccessairy for style.css
const publicDirectory = path.join(__dirname + '/views');
app.use(express.static(publicDirectory));

//Parse URL-encoded bodies
//app.use(express.urlencoded({extended: true}));
//Parse JSON bodies
app.use(express.json());

//Set View Engine for NodeJS
app.set('view engine', 'hbs');

//Session ...
app.use(session({
    secret: "geheimnis", // ein zufälliger Schlüssel für die Verschlüsselung der Daten
    resave: false,
    saveUninitialized: true
}));


app.use(express.urlencoded({ extended: true }));


app.get("/Aboutus", (req,res) => {
    res.render("AboutUs");
});

app.get("/Blog", (req,res) => {
    res.render("Blog");
});

app.get("/ContactUs", (req,res) => {
    res.render("ContactUs");
});

app.get("/Stats", (req,res) =>{
    res.render("Stats");
});

app.get("/Login", (req,res) =>{
    res.render("Login");
});

app.get("", (req,res) => {
    res.render("Main");
});

app.get("/Logout", (req, res) => {
    req.session.loggedIn = false;
    req.session.username = null;
    res.redirect("/"); 
  });

app.get("/Profile", (req,res) => {
    if (req.session.loggedIn) {
        const username = req.session.username;
        res.render("Profile", { username});

    } else {
        res.redirect("/"); 
    }
});


app.post("/Login", (req, res) => {

    if(req.body.username && req.body.password){

        const {username, password} = req.body;
        
        db.query('SELECT name, password FROM user WHERE name = ?', [username], async (error, results) => {

            if(error) {
                console.log(error);
            }
    
            //Check if User exists
            if(results.length == 0){

                return res.render('Login', {
                    message: 'This User does not exist!'
                });
                
            } else if(await bcrypt.compare(req.body.password, results[0].password)){ //Check if password is correct
        
                req.session.loggedIn = true;
                req.session.username = username;
                res.redirect("/Profile");
    
            } else {
                return res.render('Login', {
                    message: 'Wrong Password or Username!'
                });
            }
    
        });
    } else{
        return res.render('Login', {
            message: 'Please fill in the missing values'
        });
    }
});

app.get('/stats_table', (req, res) => {
    db.query(`SELECT ROW_NUMBER() OVER (ORDER BY SUM(s.score) DESC) AS platzierung, u.id AS user_id, u.name AS spielername, SUM(s.score) AS punktzahl, SUM(g.rounds) AS gespielte_runden FROM score s INNER JOIN user u ON s.user_id = u.id INNER JOIN game g ON s.game_id = g.idgame GROUP BY s.user_id, u.name ORDER BY punktzahl DESC LIMIT 40`, async (error, results) => {
        if(error) {
            console.log("Fehler bei Stats-Abfrage: ", error);
        }
        else {
            res.json(results);
        }
    })
})

//Port 3005
app.listen(3005,() =>{
    console.log("Server started on Port 3005");
});
