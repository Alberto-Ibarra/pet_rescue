const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    name: {type:String, required:true},
    type: String,
    breed: String,
    age: Number,
    color: [String],
    aggressive: Boolean,
    img: String
}, {timestamps:true});

petSchema.index({ name: "text", type: "text", breed: "text", color: "text" });


const Pet = mongoose.model('Pet', petSchema);
module.exports = Pet;