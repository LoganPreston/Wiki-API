//required modules
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//express and ejs setup
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//mongoose / mongodb setup
mongoose.connect("mongodb://localhost:27017/wikiDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const wikiSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Article = mongoose.model("Article", wikiSchema);

//listen on to port 3000
app.listen(3000, function () {
    console.log("Server started on port 3000");
  });
