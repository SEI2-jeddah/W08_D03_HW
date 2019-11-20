const express = require('express');

// create express app
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/', {useNewUrlParser : true , useUnifiedTopology: true } )
.then(()=> console.log('Mongodb is running'),(err)=> console.log(err) );
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
//include the method-override package
const methodOverride = require('method-override');
//...
//after app has been defined
//use methodOverride.  We'll be adding a query parameter to our delete form named _method
app.use(methodOverride('_method'));
// parse requests of content-type - application/json
app.use(express.json())
const Fruit = require('./models/fruits.js');
//... and then farther down the file
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
app.get('/fruits', (req, res)=>{
    Fruit.find({}, (error, allFruits)=>{
        res.render('index.ejs', {
            fruits: allFruits
        });
    });
});

// define a simple route
app.get('/', (req, res) => {
// your code here
});

// listen for requests
app.listen(3000, () => {
   console.log("Server is listening on port 3000");
});
app.get('/fruits/:id', (req, res)=>{
    Fruit.findById(req.params.id, (err, foundFruit)=>{
        res.render('show.ejs', {
            fruit:foundFruit
        });
    });
});
app.delete('/fruits/:id', (req, res)=>{
    Fruit.findByIdAndRemove(req.params.id, (err, data)=>{
        res.redirect('/fruits');//redirect back to fruits index
    });
});
app.get('/fruits/:id/edit', (req, res)=>{
    Fruit.findById(req.params.id, (err, foundFruit)=>{ //find the fruit
        res.render(
    		'edit.ejs',
    		{
    			fruit: foundFruit //pass in found fruit
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
    Fruit.findByIdAndUpdate(req.params.id, req.body, (err, updatedModel)=>{
        res.redirect('/fruits');
    });
});