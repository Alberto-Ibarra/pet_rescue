const bcrypt = require('bcrypt');
const express = require('express');
const sessions = express.Router();
const User = require('../models/userSchema.js');


sessions.get('/new', (req, res) => {
    res.render('sessions/new.ejs', { currentUser: req.session.currentUser })
    })

sessions.post('/', (req,res)=>{
    User.findOne({email: req.body.email}, (err,foundUser)=>{
        if(err){
            console.log(err);
        }else if (!foundUser){
            res.send('<a  href="/users/new">Sorry, no user found </a>')
        }else{
            if(bcrypt.compareSync(req.body.password, foundUser.password)){
                req.session.currentUser = foundUser;
                res.redirect('/pets')
            }else{
                res.send('<a href="/users/new"> password does not match </a>')
            }
        }
    })
})

sessions.delete('/', (req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/pets')
    })
})

module.exports = sessions;