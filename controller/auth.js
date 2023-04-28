const mysql = require("mysql2");
const bcrypt = require('bcryptjs');



const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

//Registration Functionalities
exports.register = (req, res) => {

    //Destructoring the request
    const { username, password, passwordConfirm } = req.body;

    db.query('SELECT name FROM user WHERE name = ?', [username], async (error, results) => {

        if(error) {
            console.log(error);
        }

        //Results (array) if > 0 -> Eintrag existiert bereits
        if( results.length > 0){
            return res.render('LogReg', {
                message: 'That Username is already in use'
            });
            //Check if Passwords are equal
        } else if(password != passwordConfirm){
            return res.render('LogReg', {
                message: 'Passwords do not match'
            });
        } 

        //8 rounds Hashing
        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        //neuen Eintrag in Datenbank erstellen
        db.query('INSERT INTO user SET ?', {name: username, password: hashedPassword}, (error, results) => {
            if(error){
                console.log(error);
            } else{
                res.render('Profile');
            }
        });
    } );
}

//Login Functionalities
exports.login = (req, res) => {

    if(req.body.username && req.body.password){

        const {username, password} = req.body;
        
        db.query('SELECT name, password FROM user WHERE name = ?', [username], async (error, results) => {

            if(error) {
                console.log(error);
            }
    
            //Check if User exists
            if(results.length == 0){
                return res.render('LogReg', {
                    message: 'User does not exist'
                });
                
            } else if(await bcrypt.compare(req.body.password, results[0].password)){ //Check if password is correct
        
                res.render('Profile');
    
            } else {
                return res.render('LogReg', {
                    message: 'Password does not match'
                });
            }
    
        });
    
    }
}