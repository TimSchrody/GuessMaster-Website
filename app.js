const express = require("express");
const path = require('path');
const mysql = require("mysql2");
const dotenv = require("dotenv");
const bcrypt = require('bcryptjs');
const { profile } = require("console");

dotenv.config({ path: './.env'});

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

const app = express();
let userN = "";

//neccessairy for style.css
const publicDirectory = path.join(__dirname + '/views');
app.use(express.static(publicDirectory));

//Parse URL-encoded bodies
//app.use(express.urlencoded({extended: true}));
//Parse JSON bodies
app.use(express.json());

//Set View Engine for NodeJS
app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: true }));


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
    userN = "";
    res.redirect("/"); 
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
        
                userN = username;
                return res.render('Profile', {
                    responseUser: userN
                });
    
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

app.get('/profileData',(req, res) => {
    db.query(`SELECT user.name, game.rounds, game.mode, game.date, score.score, score.ranking FROM user 
              JOIN score ON score.user_id = user.id JOIN game ON game.idgame = score.game_id WHERE name = '${userN}' ORDER BY game.date DESC;`, (error, results, fields) => {
      if (error) {
        console.error('Fehler bei der Abfrage: ', error);
      } 
        else {
          res.json(results);
      }
    });
});

app.get('/profileName',(req,res)=> {

    res.json(userN);

});


app.get("/statsTable", (req, res) => {
    db.query(`SELECT ROW_NUMBER() OVER (ORDER BY SUM(s.score) DESC) AS platzierung, u.id AS user_id, u.name AS spielername, SUM(s.score) AS punktzahl, SUM(g.rounds) AS gespielte_runden FROM score s INNER JOIN user u ON s.user_id = u.id INNER JOIN game g ON s.game_id = g.idgame GROUP BY s.user_id, u.name ORDER BY punktzahl DESC LIMIT 40`, async (error, results) => {
        if(error) {
            console.log("Fehler bei Stats-Abfrage: ", error);
        }
        else {
            res.json(results);
        }
    })
});

app.get("/playersTotal", (req, res) => {
    db.query(`SELECT COUNT(*) AS players_total FROM user;`, async (error, results) => {
        if(error) {
            console.log("Fehler bei playersTotal-Abfrage: ", error);
        }
        else {
            res.json(results);
        }
    })
});

app.get("/roundSum", (req, res) => {
    db.query(`SELECT SUM(rounds) AS round_sum FROM game;`, async (error, results) => {
        if(error) {
            console.log("Fehler bei roundSum-Abfrage: ", error);
        }
        else {
            res.json(results);
        }
    })
});

app.get("/scoreSum", (req, res) => {
    db.query(`SELECT SUM(score) AS score_sum FROM score;`, async (error, results) => {
        if(error) {
            console.log("Fehler bei scoreSum-Abfrage: ", error);
        }
        else {
            res.json(results);
        }
    })
});

app.get("/avgRPG", (req, res) => {
    db.query(`SELECT (SUM(rounds)/COUNT(idgame)) AS average_rounds_per_game FROM game;`, async (error, results) => {
        if(error) {
            console.log("Fehler bei scoreSum-Abfrage: ", error);
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
