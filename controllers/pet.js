const express = require('express');
const router = express.Router();
const Pet = require('../models/petSchema.js');
const seed = require('../models/seed.js');



// NEW PAGE
router.get('/new', (req, res) => {
    res.render('new.ejs')
})

// POST
router.post('/', (req, res) => {
    Pet.create(req.body, (err, newPet) => {
        res.send(newPet)
    })
})

// // EDIT
router.get('/:id/edit', (req, res) => {
    console.log(Pet)
    Pet.findById(req.params.id, (err, foundPet) => {
        res.render('edit.ejs', {
            Pet: foundPet
        })
    })
})


router.get('/search', (req,res)=>{
    const query = req.query.search;
    console.log(typeof(query));
    Pet.find({$text: {$search: query}}, (err, searchedPets)=>{
        if(err){
            console.log(err);
        }else{
            // console.log(searchedPets);
            res.render('search.ejs',{
                results: searchedPets
            });
        }
    });
});

router.get('/new', (req,res)=>{
    res.send('test')
})


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
        res.render('show.ejs', {
            pet: foundPet
        });
    });
});



// router.get('/seed', (req,res)=>{
//     Pet.create(seed, (err, data)=>{
//         res.send(data);
//     })
// })




module.exports = router;