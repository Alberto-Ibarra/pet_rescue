const express = require('express');
const router = express.Router();
const Pet = require('../models/petSchema.js');
const seed = require('../models/seed.js');

const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) {
        return next()
    } else {
        res.redirect('/sessions/new')
    }
}


// INDEX PAGE
router.get('/', (req,res)=>{
    Pet.find({}, (err, foundPets)=>{
        console.log(foundPets)
        res.render('index.ejs', {
            pets: foundPets,
            currentUser: req.session.currentUser 
        });
    });
});

// NEW PAGE
router.get('/new', isAuthenticated, (req, res) => {
    res.render('new.ejs',{
        currentUser: req.session.currentUser 
    })
})

// POST
router.post('/', (req, res) => {
    if(req.body.aggressive === 'on') {
        req.body.aggressive = true
    } else {
        req.body.aggressive = false
    }
    Pet.create(req.body, (err, newPet) => {
        console.log(newPet)
        res.redirect('/pets')
    })
})
// EDIT
router.get('/:id/edit', isAuthenticated, (req, res) => {
    Pet.findById(req.params.id, (err, foundPet) => {
        res.render('edit.ejs', {
            Pet: foundPet,
            currentUser: req.session.currentUser 
        })
    })
})

router.put('/:id', (req, res) => {
    if(req.body.aggressive === 'on') {
        req.body.aggressive = true
    } else {
        req.body.aggressive = false
    }
    Pet.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatePet) => {
        console.log(updatePet)
        res.redirect('/pets')
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
                results: searchedPets,
                currentUser: req.session.currentUser 
            });
        }
    });
});




router.get('/:id', (req,res)=>{
    Pet.findById(req.params.id, (err, foundPet)=>{
        console.log(foundPet);
        res.render('show.ejs', {
            pet: foundPet,
            currentUser: req.session.currentUser 
        });
    });
});


// DELETE
router.delete('/:id', isAuthenticated, (req, res) => {
    Pet.findByIdAndRemove(req.params.id, (err, deletePet) => {
        if(err) {
            console.log(err)
        } else {
            res.redirect('/pets')
        }
    })
})

// router.get('/seed', (req,res)=>{
//     Pet.create(seed, (err, data)=>{
//         res.send(data);
//     })
// })




module.exports = router;