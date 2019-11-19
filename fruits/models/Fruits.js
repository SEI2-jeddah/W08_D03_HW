const mongoose = require('mongoose');
const Schema=mongoose.Schema
const fruitSchema = new Schema({
    name:  { type: String, required: true },
    color:  { type: String, required: true },
    readyToEat: Boolean
});

const Fruits = mongoose.model('Fruits', fruitSchema);

module.exports.Fruits = Fruits;