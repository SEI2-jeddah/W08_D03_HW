const express = require('express')
const mongoose = require('mongoose')
const ejs = require('ejs')
const app = express()
const methodOverride = require('method-override');


// Import models
const Fruits = require('./models/Fruits')


// middlewares
app.set("view engine","ejs");

app.use(express.urlencoded({extended : false}))
app.use(express.json())
app.use(methodOverride('_method'));




// Routes

app.get('/',(req , res) => {

res.send('nothing better than eating real sushi')
})

//Fruit Route

app.post('/fruits' , (req , res ) => {

        if (req.body.readyToEat == "on") {
            req.body.readyToEat = true
        }else{
          req.body.readyToEat = false
        }

        Fruits.create(req.body, (error, createdFruit)=>{
        res.redirect('/fruits');
    });

})


app.get('/fruits' , (req ,res ) => {

  Fruits.find({}, (error, allFruits)=>{
          res.render('index.ejs', {
              fruits: allFruits
          });
      });
})

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
    res.send(req.body);
});



app.put('/fruits/:id', (req, res)=>{
    if(req.body.readyToEat === 'on'){
        req.body.readyToEat = true;
    } else {
        req.body.readyToEat = false;
    }
    Fruit.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel)=>{
        res.send(updatedModel);
        res.redirect('/fruits');
    });
});


// Port Listening
let PORTNUMBER = 65123
app.listen(PORTNUMBER ,()=> {
  console.log('server is up , PORT ' + PORTNUMBER );
})



// Mongo connection
mongoose.connect('mongodb://localhost/', {useNewUrlParser : true , useUnifiedTopology: true } )
.then(()=> console.log('Mongo is connected'),(err)=> console.log(err) );
