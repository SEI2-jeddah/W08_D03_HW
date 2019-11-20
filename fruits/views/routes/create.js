Fruit.create(req.body, (error, createdFruit)=>{
    res.redirect('/fruits');
});