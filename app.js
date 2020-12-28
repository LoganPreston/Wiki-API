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

const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Article = mongoose.model("Article", articleSchema);

//refactored to use route chaining instead of discrete routes
app.route("/articles"

    .get(function (req, res) {
      Article.find({}, function (err, results) {
        if (err) {
          res.send(err);
        } else {
          res.send(results);
        }
      });
    })

    .post(function (req, res) {
      const newArticle = new Article({
        title: req.body.title,
        content: req.body.content,
      });
      newArticle.save(function (err) {
        if (err) {
          res.send(err);
        } else {
          res.send("Success");
        }
      });
    })

    .delete(function (req, res) {
      Article.deleteMany({}, function (err, results) {
        if (err) {
          res.send(err);
        } else {
          res.send("Successfully deleted all articles");
        }
      });
    })

);

//listen on to port 3000
app.listen(3000, function () {
  console.log("Server started on port 3000");
});
