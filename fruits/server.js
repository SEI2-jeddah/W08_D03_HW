const express = require("express");
const mongoose = require("mongoose");
const Fruit = require("./models/Fruits.js");
const methodOverride = require("method-override");

//connecting mongoDB
mongoose
  .connect("mongodb://localhost/", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("mongodb is running!"),
  err => console.log(err));

// create express app
const app = express();
app.set("view engine", "ejs");

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// parse requests of content-type - application/json
app.use(express.json());
app.use(methodOverride("_method"));

// define a simple route
app.get("/", (req, res) => {
  res.send("Hi Y'all! Welcome to the harvest of the year");
});

app.get("/fruits/new", (req, res) => {
  res.render("create");
});

app.get("/fruits", (req, res) => {
  Fruit.find({}, (err, frutty) => {
    res.render("index.ejs", {
      fruits: frutty
    });
  });
});


app.post("/fruits/", (req, res) => {
  if (req.body.readyToEat === "on") {
    //if checked, req.body.readyToEat is set to 'on'
    req.body.readyToEat = true;
  } else {
    //if not checked, req.body.readyToEat is undefined
    req.body.readyToEat = false;
  }
  Fruit.create(req.body, (err, fruitCreated) => {
    res.redirect("/fruits");
  });
});
app.get("/fruits/:id", (req, res) => {
  Fruit.findById(req.params.id, (err, fruitFound) => {
    res.render("show.ejs", {
      fruit: fruitFound
    });
  });
});

app.delete("/fruits/:id", (req, res) => {
  Fruit.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect("/fruits"); //redirect back to fruits index
  });
});

app.get("/fruits/:id/edit", (req, res) => {
  Fruit.findById(req.params.id, (err, fruitFound) => {
    //find the fruit
    res.render("edit.ejs", {
      fruit: fruitFound //pass in found fruit
    });
  });
});

app.put("/fruits/:id", (req, res) => {
  if (req.body.readyToEat === "on") {
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }
  Fruit.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedModel) => {
      res.redirect("/fruits");
    }
  );
});
// listen for requests
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});