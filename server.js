const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');

const PORT = process.env.PORT || 3000

const petController = require('./controllers/pet.js');
const userController = require('./controllers/userController.js');
const sessionController = require('./controllers/sessionController');
require('dotenv').config();
const seedData = require('./models/seed.js')
const Pet = require('./models/petSchema')
const albertURI = process.env.MONGODB;
const makaURI = process.env.MONGODB1;
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false
    })
)
app.use('/pets', petController);
app.use('/users', userController);
app.use('/sessions', sessionController);



mongoose.set('strictQuery', false);

mongoose.connect(makaURI, ()=>{
    console.log('connection to mongoDB made...');
});

app.get('/seed', (req, res) => {
    console.log(Pet)
    Pet.create(seedData, (err, pets) => {
        if(err) {
            console.log(err)
        }
        res.json(pets)
    })
})

app.listen(PORT, () => {
    console.log('Listening....');
});