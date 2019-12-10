const express = require('express');
const Fruit = require('./models/fruits');
// create express app
const app = express();
const methodOverride = require('method-override');
// parse requests of content-type - application/x-www-form-urlencoded
app.set('view engine' , 'ejs')
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
// parse requests of content-type - application/json
app.use(express.json())

// define a simple route
app.get('/fruits', (req, res) => {
    Fruit.find({}, (error, allFruits)=>{
        res.render('index.ejs', {
            fruits: allFruits
        });
    });
});
app.post('/fruits', (req, res)=>{
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
    res.send('index');
});
app.get('/fruits/new', (req, res)=>{
    res.render('new.ejs');
});


app.delete('/fruits/:id', (req, res)=>{
    Fruit.findByIdAndRemove(req.params.id, (err, data)=>{
        res.redirect('/fruits');
    });
});


app.get('/fruits/:id', (req, res)=>{
    Fruit.findById(req.params.id, (err, foundFruit)=>{
        res.render('show.ejs', {
            fruits:foundFruit
        });
    });
});

app.get('/fruits/edit/:id',(req,res)=>{
    Fruit.findById(req.params.id)
    .then(data=>{
        res.render('edit',{fruits:data})
    })
    .catch(err=>res.send(err))
})

app.put('/fruits/edit/:id', (req, res)=>{
    if(req.body.readyToEat === 'on'){
        req.body.readyToEat = true;
    } else {
        req.body.readyToEat = false;
    }
    Fruit.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel)=>{
        res.redirect('/fruits');
    });
});
app.delete('/fruits/:id', (req, res)=>{
    res.send('deleting...');
});


const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/', {useNewUrlParser : true , useUnifiedTopology: true } )
.then(()=> console.log('Mongodb is running'),(err)=> console.log(err) );
// listen for requests
app.listen(3222, () => {
   console.log("Server is listening on port 3000");
});