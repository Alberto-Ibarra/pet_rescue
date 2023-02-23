const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    name: String,
    breed: [String],
    age: String,
    color: [String],
    aggressive: Boolean,
});


const Pet = mongoose.model('PetRescue', petSchema);
module.exports = Pet;