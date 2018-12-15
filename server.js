const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const logger = require("morgan");
const mongoose = require("mongoose");
const db = require("./models");

let PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.static("public"));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraper";
mongoose.connect("mongodb://localhost/scraper", {
    useNewUrlParser: true
});
///scrape site for data create db collection and doc if doesnt exist
app.get("/scrape", function (req, res) {
    axios.get("http://www.justarsenal.com/").then(function (response) {

        let $ = cheerio.load(response.data);

        $("article").each(function (i, element) {
            let result = {}

            result.title = $(this).children("header").children("h1").children("a").text()
            result.summary = $(this).children("div[class=entry-content]").children("p").text()
            result.url = $(this).children("header").children("h1").children("a").attr("href")

            db.Article.create(result).then(function (dbArt) {
                    console.log(dbArt)
                })
                // .catch(function (err) {
                //    throw res.json(err);
                // });
        })
        res.send("Scrape Complete")
    })
})

app.get("/articles", function(req, res) {
    db.Article.find({}).then(function(dbArt) {
       console.log(dbArt)
       res.json(dbArt);
      })
      .catch(function(err) {
       return res.json(err);
      });
})
app.get("/articles/:id", function(req, res) {
    db.Article.findOne({ _id: req.params.id })
      .populate("post")
      .then(function(dbArt) {
          console.log(dbArt)
        res.json(dbArt);
      })
      .catch(function(err) {
        
        res.json(err);
      });
  });
app.post("/articles/:id",function(req,res){
    db.Post.create(req.body).then(function(dbPost) {
        return db.Article.findOneAndUpdate({ _id: req.params.id }, { post: dbPost._id }, { new: true });
      })
      .then(function(dbArt) {
        res.json(dbArt);
      })
      .catch(function(err) {
        res.json(err);
      });
})
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});