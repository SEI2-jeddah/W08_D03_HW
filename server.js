const express = require("express");
const mongoose = require("mongoose");
const Fruit = require("./models/Fruits.js");
const methodOverride = require("method-override");

mongoose.connect("mongodb://localhost/", {
    useNewUrlParser: true,
    useUnifiedTopology: true})
  .then(() => console.log("Mongodb is running"),
    err => console.log(err));

const app = express();
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.send("welcome visitors");});
app.get("/fruits/new", (req, res) => {
  res.render("create");});

app.get("/fruits", (req, res) => {
  Fruit.find({}, (error, allFruits) => {
    res.render("index.ejs", {
      fruits: allFruits
    });
  });
});

app.post("/fruits/", (req, res) => {
  if (req.body.readyToEat === "on") {
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }
  Fruit.create(req.body, (error, createdFruit) => {
    res.redirect("/fruits");
  });
});
app.get("/fruits/:id", (req, res) => {
  Fruit.findById(req.params.id, (err, foundFruit) => {
    res.render("show.ejs", {
      fruit: foundFruit
    });
  });
});

app.delete("/fruits/:id", (req, res) => {
  Fruit.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect("/fruits");
  });
});

app.get("/fruits/:id/edit", (req, res) => {
  Fruit.findById(req.params.id, (err, foundFruit) => {
    res.render("edit.ejs", {
      fruit: foundFruit
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

app.listen(3000, () => {
  console.log("Server is listening on port 6666");
});
