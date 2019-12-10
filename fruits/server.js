const express = require('express');


const app = express();
const mongoose = require('mongoose');
const Fruit = require('./models/fruits.js');
const methodOverride = require('method-override');

app.use(express.urlencoded({ extended: false }));


app.use(express.json())
app.use(methodOverride('_method'));
    app.get('/fruits', (req, res)=>{
        Fruit.find({}, (error, allFruits)=>{
            res.render('index.ejs', {
                fruits: allFruits
            });
        });
    });

    Fruit.create(req.body, (error, createdFruit)=>{
        res.redirect('/fruits');
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
        // Fruit.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel)=>{
        //     res.send(updatedModel);
        // });
        Fruit.findByIdAndUpdate(req.params.id, req.body, (err, updatedModel)=>{
            res.redirect('/fruits');
        });
    });

// listen for requests
app.listen(3000, () => {
   console.log("Server is listening on port 3000");
});

app.post('/fruits/', (req, res)=>{
    if(req.body.readyToEat === 'on'){ 
        req.body.readyToEat = true;
    } else { 
        req.body.readyToEat = false;
    }
    Fruit.create(req.body, (error, createdFruit)=>{
        res.send(createdFruit);
    });
});

mongoose.connect('mongodb://localhost/', {useNewUrlParser : true , useUnifiedTopology: true } )
.then(()=> console.log('Mongodb is running'),(err)=> console.log(err) );