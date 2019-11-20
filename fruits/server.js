const express = require('express');
const mongoose = require('mongoose');
const app = express()// create express app
const Fruit = require("./models/fruits")
const methodOverride = require('method-override');

app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.set("view engine", "ejs");
app.use(methodOverride('_method'));

app.post('/fruits/', (req, res)=>{
    if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true;
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false;
    }
    Fruit.create(req.body, (error, createdFruit)=>{
        res.redirect('/fruits');
    });
});

app.get('/fruits', (req, res)=>{
    Fruit.find({}, (error, allFruits)=>{
        res.render('index.ejs', {
            fruits: allFruits
        });
    });
});
app.get('/fruits/new', (req, res) => {
    Fruit.find({}, (error, allFruits) => {
        res.render('new.ejs', {
            fruit: allFruits
        });
    });
});

app.get('/fruits/:id', (req, res)=>{
    Fruit.findById(req.params.id, (err, foundFruit)=>{
        res.render('show.ejs', {
            fruit:foundFruit
        });
    });
});

app.delete('/fruits/:id', (req, res)=>{
    Fruit.findByIdAndRemove(req.params.id, (err,data)=>{
        res.redirect('/fruits')
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


mongoose.connect('mongodb://localhost/', {useNewUrlParser : true , useUnifiedTopology: true } )
.then(()=> console.log('Mongodb is running'),(err)=> console.log(err) );

// listen for requests
app.listen(3000, () => {
   console.log("Server is listening on port 3000");
}); 
