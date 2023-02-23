const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    name: {type:String, required:true},
    breed: [String],
    age: Number,
    color: [String],
    aggressive: Boolean,
    img: String
}, {timestamps:true});


const Pet = mongoose.model('PetRescue', petSchema);
module.exports = Pet;