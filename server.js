const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const PORT = process.env.PORT || 3000

const petController = require('./controllers/pet.js');
require('dotenv').config();

const albertURI = process.env.MONGODB;
const makaURI = process.env.MONGODB1;
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use('/pets', petController);


mongoose.set('strictQuery', false);
mongoose.connect(makaURI, ()=>{
    console.log('connection to mongoDB made...');
});

app.listen(PORT, ()=>{
    console.log('Listening....');
});