const express = require('express');
const router = express.Router();
const Pet = require('../models/petSchema');

router.get('/', (req,res)=>{
    res.render('index.ejs')
});



module.exports = router;