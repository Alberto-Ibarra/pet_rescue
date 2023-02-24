const express = require('express');
const router = express.Router();
const Pet = require('../models/petSchema.js');
const seed = require('../models/seed.js');


router.get('/search', (req,res)=>{
    const query = req.query.search;
    console.log(query);
    Pet.find({$text: {$search: query}}, (err, searchedPets)=>{
        if(err){
            console.log(err);
        }else{
            console.log(searchedPets);
            res.render('search.ejs',{
                results: searchedPets
            });
        }
    });
});


router.get('/', (req,res)=>{
    Pet.find({}, (err, foundPets)=>{
        res.render('index.ejs', {
            pets: foundPets
        });
    });
});

router.get('/:id', (req,res)=>{
    Pet.findById(req.params.id, (err, foundPet)=>{
        console.log(foundPet);
        // res.render('show.ejs', {
        //     pet: foundPet
        // });
    });
});

module.exports = router;