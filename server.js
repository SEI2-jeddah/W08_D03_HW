const express = require('express');
const app = express();
const mongoose = require('mongoose');
const fruitsRouter = require('./routes/fruits');
const methodOverride = require('method-override');
const dotenv = require('dotenv/config');

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use('/fruits', fruitsRouter);

app.get('/', (req, res) => {

});

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});

try{
	mongoose.connect(process.env.DEV_DB, {useNewUrlParser : true , useUnifiedTopology: true });
	console.log('Mongodb is running')
}catch(err){
	console.log(err);
}