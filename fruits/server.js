/*import express module. Express:is a web framework used building the REST APIs.
create an express app, add two parsing middlewares using express’s app.use() method.
A middleware is a function that has access to the request and response objects. 
It can execute any code,transform the request object, or return a response.*/
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Fruit = require('./models/fruits.js');
const ejs = require('ejs')
const methodOverride = require('method-override');
// create express app



// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// parse requests of content-type - application/json
app.use(express.json())
app.use(methodOverride('_method'))
//app.use(express.static(__dirname + '/node_modules/bootstrap/dist'))



// define a simple route
// app.get('/', (req, res) => {
// //your code here
// });

//Route Create data in MongoDB
app.post('/fruits', (req, res) => {
    if (req.body.readyToEat === 'on') { //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true;
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false;
    }
    Fruit.create(req.body, (error, createdFruit) => {
        res.redirect('/fruits');
    });
})

//Render the ejs file
app.get('/fruits/new', (req, res) => {
    Fruit.find({}, (error, allFruits) => {
        res.render('create.ejs', {
            fruit: allFruits
        });
    });
});


// //Index Route Render All Fruits
app.get('/fruits', (req, res)=>{
    Fruit.find({}, (error, allFruits)=>{
        res.render('index', {
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

//Connect Express to Mongo
mongoose.connect('mongodb://localhost/', {useNewUrlParser : true , useUnifiedTopology: true } )
.then(()=> console.log('Mongodb is running'),(err)=> console.log(err) );
// listen for requests
app.listen(3000, () => {
   console.log("Server is listening on port 3000");
});