const mongoose = require('mongoose')
const FruitSechema = mongoose.Schema

const Fruits = new FruitSechema({

      name : {
        type : String,
        require : true
      },


            color : {
              type : String,
              require : true
            },

            readyToEat : Boolean

})
const Fruit = mongoose.model('Fruit' , Fruits);
module.exports = Fruit ;
