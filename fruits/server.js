const express = require('express'); 
const app = express(); 
const mongoose = require('mongoose'); 
const Fruit = require('./models/Fruits.js'); 
const ejs = require('ejs') 
const methodeOverriad = require('method-override') 

mongoose.connect('mongodb://localhost/', { useNewUrlParser: true, useUnifiedTopology: true }) 
     .then(() => console.log('Mongodb is running'), (err) => console.log(err)) 
 
 
app.set('view engine', 'ejs') 
 
 
app.use(express.urlencoded({ extended: false })); 
app.use(express.json()) 

app.use(methodeOverriad('_method')) 

 
app.get('/', (req, res) => { 
    res.send("Welcome to fruits website") 
  }); 
  
app.get('/fruits/new',(req,res)=>{ 
   res.render('new') 
 }) 
  
app.post('/fruits/', (req, res) => { 
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
       res.render('show', { 
          fruit: foundFruit 
          
      }); 
  }); 
}); 
 
 
app.get('/fruits/edit/:id',(req,res)=>{ 
   Fruit.findById(req.params.id) 
  .then(data=>{ 
    res.render('edit',{fruit:data}) 
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
 Fruit.findByIdAndRemove(req.params.id, (err, data)=>{ 
  res.redirect('/fruits');//redirect back to fruits index 
  }); 
 }); 

app.listen(3000, () => { 
   console.log("Server is listening on port 3000"); 
}); 