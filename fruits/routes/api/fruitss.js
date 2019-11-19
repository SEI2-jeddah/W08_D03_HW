const express= require('express')
const router= express.Router()
const mongoose=require('mongoose')
const Fruits = require('../../models/Fruits.js').Fruits



router.get('/new',(req,res)=>{
    res.render('new')
})
//post new fruit
router.post('/', (req, res)=>{
   
    if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true;
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false;
    }
    Fruits.create(req.body, (error, createdFruit)=>{
        res.redirect("/api/fruitss")
        
    });
});


router.get('/', (req, res)=>{
    Fruits.find({}, (error, allFruits)=>{
        res.render('index', {
            fruits: allFruits

        }
        );
        
    });
});


router.get('/:id',(req,res)=>{
    Fruits.findById(req.params.id)
    .then(data=>{
        res.render('show',{fruits:data})
    }).catch(erro=>console.log(erro)
    )

})
//delet
router.delete('/:id', (req, res)=>{
    Fruits.findByIdAndRemove(req.params.id, (err, data)=>{
        res.redirect("/api/fruitss");//redirect back to fruits index
    });
});

//edit
router.get('/edit/:id',(req,res)=>{
    Fruits.findById(req.params.id)
    .then(data=>{
        res.render('edit',{fruits:data})
    }).catch(erro=>res.send("error"))
   
})



router.put('/edit/:id',(req,res)=>{
   
  Fruits.findByIdAndUpdate(req.params.id,req.body)
    .then(()=>{
        res.redirect('/api/fruitss')
    }).catch(err=>res.send(err))
 })
module.exports=router