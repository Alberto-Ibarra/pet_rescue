const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const petController = require('./controllers/pet.js')
require('dotenv').config()

const albertURI = process.env.MONGODB;

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use('/pets', petController);


mongoose.connect(albertURI, ()=>{
    console.log('connection to mongoDB made...');
});

app.listen(3000, ()=>{
    console.log('Listening....');
})