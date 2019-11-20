const express = require('express');
const mongoose = require('mongoose');
const Fruit = require('./models/fruits.js');

// create express app
const app = express();


mongoose.connect('mongodb://localhost/', {useNewUrlParser : true , useUnifiedTopology: true } )
.then(()=> console.log('Mongodb is running'),(err)=> console.log(err) );


// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// parse requests of content-type - application/json
app.use(express.json())

// define a simple route
app.get('/', (req, res) => {
    // console.log("welcome")
});

//Create Index Route
app.get('/fruits', (req, res)=>{
    res.send('index');
});

//Render the ejs file
app.get('/fruits', (req, res)=>{
    res.render('index.ejs');
});

//Have Index Route Render All Fruits
app.get('/fruits', (req, res)=>{
    Fruit.find({}, (error, allFruits)=>{
        res.render('index.ejs', {
            fruits: allFruits
        });
    });
});

app.post('/fruits/', (req, res)=>{
    if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true;
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false;
    }
    Fruit.create(req.body, (error, createdFruit)=>{
        res.send(createdFruit);
    });
});

// listen for requests
app.listen(3000, () => {
   console.log("Server is listening on port 3000");
});