const express = require('express');
const router = express.Router();
const Pet = require('../models/petSchema.js');
const seed = require('../models/seed.js');

router.get('/', (req,res)=>{
    Pet.find({}, (err, foundPets)=>{
        res.render('index.ejs', {
            pets: foundPets
        });
    });
});

router.get('/:id', (req,res)=>{
    Pet.findById(req.params.id, (err, foundPet)=>{
        res.render('show.ejs', {
            pet: foundPet
        });
    });
});

// router.get('/seed', (req, res) => {
//     Pet.create(seed, (err, data)=>{
//         res.send(data);
//     })
// })


module.exports = router;