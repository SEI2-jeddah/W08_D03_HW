const express = require('express')
const app=express()
const ejs= require('ejs')
const methodOverride = require('method-override');
const mongoose=require('mongoose')
//connect to mongoodedb
mongoose.connect('mongodb://localhost/', {useNewUrlParser : true , useUnifiedTopology: true } )
.then(()=> console.log('Mongodb is running'),(err)=> console.log(err) );
app.set('view engine','ejs')
// parsel
app.use(express.urlencoded({extended : false}))
app.use(express.json())
app.use(methodOverride('_method'));







app.use('/api/fruitss/',require('./routes/api/fruitss'))


   // listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
 });