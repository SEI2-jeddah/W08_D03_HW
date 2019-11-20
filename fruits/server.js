const express = require('express')
const mongoose = require('mongoose')
const ejs = require('ejs')
const app = express()

// Import models
const Fruits = require('./models/Fruits')


// middlewares
app.set("view engine","ejs");

app.use(express.urlencoded({extended : false}))
app.use(express.json())





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









// Port Listening
let PORTNUMBER = 65123
app.listen(PORTNUMBER ,()=> {
  console.log('server is up , PORT ' + PORTNUMBER );
})



// Mongo connection
mongoose.connect('mongodb://localhost/', {useNewUrlParser : true , useUnifiedTopology: true } )
.then(()=> console.log('Mongo is connected'),(err)=> console.log(err) );
