const express = require('express');
const router  = express.Router();
const mongoose = require('mongoose');
const Fruits = require('../models/fruits');

router.get('/', (req, res) => {
	Fruits.find({}, (error, allFruits) => {
		res.render('index', {fruits: allFruits});
	})
});
router.get('/new', (req, res) =>{
	res.render('create');
});

router.get('/:id', (req, res) =>{
	Fruits.findById(req.params.id, (err, foundFruit) => {
		res.render('show', {fruit: foundFruit});
	});
});

router.post('/new', (req, res) => {
	if(req.body.readyToEat === 'on'){
		req.body.readyToEat = true;
	}else{
		req.body.readyToEat = false;
	}
	Fruits.create(req.body, (error, createdFruit) => {
		res.redirect('/fruits');
	});
});

router.delete('/:id', (req, res) => {
	Fruits.findByIdAndRemove(req.params.id, (err, deletedFruit) => {
		console.log("Item Deleted", deletedFruit);
		res.redirect('/fruits');
	});
});

router.get('/:id/edit', (req,res) => {
	Fruits.findById(req.params.id, (err, foundFruit) => {
		res.render('edit', {fruit: foundFruit});
	});
});
router.put('/:id', (req, res) => {
	req.body.readyToEat = req.body.readyToEat === 'on'? true : false;
	Fruits.findByIdAndUpdate(req.params.id, req.body, (err, updatedFruit) => {
		console.log("Item Updated",updatedFruit);
		res.redirect('/fruits');
	});
});

module.exports = router;