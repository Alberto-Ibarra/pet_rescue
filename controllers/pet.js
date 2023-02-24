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
        console.log(foundPets)
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

// NEW PAGE
router.get('/pets/new', (req, res) => {
    res.render('new.ejs')
})

// POST
router.post('/pets', (req, res) => {
    Pet.create(req.body, (err, newPet) => {
        res.send(newPet)
    })
})

// EDIT
router.get('pets/:id/edit', (req, res) => {
    Pet.findById(req.params.id, (err, foundPet) => {
        res.render('edit.ejs', {
            Pet: foundPet
        })
    })
})

// router.get('/seed', (req,res)=>{
//     Pet.create(seed, (err, data)=>{
//         res.send(data);
//     })
// })




module.exports = router;