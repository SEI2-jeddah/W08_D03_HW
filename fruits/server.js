const express = require('express');
const app = express();
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const ejs = require('ejs');
mongoose.connect('mongodb://localhost/', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Mongodb is running'), (err) => console.log(err));

app.use(express.urlencoded({
    extended: false
}));

app.use(express.json())


app.set('view engine', ejs)
app.use(methodOverride('_method'));

// define a simple route
app.get('/', (req, res) => {
    // your code here
    res.send("<h1>Welcome to the fruits website?<h1><a href='/fruits'>See Fruits List</a>");
});

const Fruit = require('./models/fruits.js');
app.get('/fruits/new', (req, res) => {
    res.render('create.ejs');
});

app.post('/fruits/new', (req, res) => {

    if (req.body.readyToEat === 'on') { //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true;
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false;
    }
    Fruit.create(req.body, (error, createdFruit) => {
        res.redirect('/fruits');
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
        res.redirect('/fruits'); //redirect back to fruits index
    });
});

app.get('/fruits/:id/edit', (req, res) => {
    Fruit.findById(req.params.id, (err, foundFruit) => { //find the fruit
        res.render(
            'edit.ejs', {
                fruit: foundFruit //pass in found fruit
            }
        );
    });
});

app.put('/fruits/:id', (req, res) => {
    if (req.body.readyToEat === 'on') {
        req.body.readyToEat = true;
    } else {
        req.body.readyToEat = false;
    }
    Fruit.findByIdAndUpdate(req.params.id, req.body, (err, updatedModel) => {
        res.redirect('/fruits');
    });
});
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});