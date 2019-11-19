const express = require('express');
const app = express();
const mongoose = require('mongoose');

const Fruit = require('./models/fruits.js');
const ejs = require('ejs')
const methodOverride = require('method-override');

mongoose.connect('mongodb://localhost/fruits', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Mongodb is running'), (err) => console.log(err));

//midleware ------
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

//add to database---
app.post('/fruits/', (req, res) => {
    if (req.body.readyToEat === 'on') { //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true;
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false;
    }
    Fruit.create(req.body, (error, createdFruit) => {
        res.redirect('/fruits');
    });
})
app.get('/fruits/new', (req, res) => {
    Fruit.find({}, (error, allFruits) => {
        res.render('create.ejs', {
            fruit: allFruits
        });
    });
});

app.get('/fruits', (req, res) => {
    Fruit.find({}, (error, allFruits) => {
        res.render('index.ejs', {
            fruits: allFruits
        });
    });
});

app.get('/fruits/:id', (req, res) => {
    Fruit.findById(req.params.id, (err, foundFruit) => {
        res.render('show.ejs', {
            fruit: foundFruit
        });
    });
});

app.delete('/fruits/:id', (req, res) => {
    Fruit.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/fruits');
    });
});

app.get('/fruits/:id/edit', (req, res) => {
    Fruit.findById(req.params.id, (err, foundFruit) => {
        res.render(
            'edit.ejs',
            {
                fruit: foundFruit 
            }
        );
    });
}); 
app.put('/fruits/:id', (req, res)=>{
    if(req.body.readyToEat === 'on'){
        req.body.readyToEat = true;
    } else {
        req.body.readyToEat = false;
    }
    Fruit.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel)=>{
        res.redirect('/fruits');
    });
});
// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

