const mongoose = require('mongoose');


const fruitSchema = new mongoose.Schema({
    name:  { type: String, required: true },
    color:  { type: String, required: true },
    readyToEat: Boolean
});
// const Fruit = mongoose.model('Fruit', fruitSchema);
// app.get('/fruits', (req, res)=>{
//     res.send('index');
// });
module.exports = mongoose.model('Fruit', fruitSchema)