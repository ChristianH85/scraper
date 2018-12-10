const express = require("express");
const exphbs = require("express-handlebars");
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
app.get("/comment/:id",function(req,res){
    db.Post.create(req.body).then(function(dbNote) {
        // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
        // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
        // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
        return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
      })
      .then(function(dbArt) {
        // If we were able to successfully update an Article, send it back to the client
        res.json(dbArt);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
})
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});