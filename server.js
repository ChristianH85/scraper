const express = require("express");
const exphbs = require("express-handlebars");
const axios = require("axios");
const cheerio = require("cheerio");
const logger = require("morgan");

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

app.get("/scrape", function (req, res) {
    axios.get("http://www.justarsenal.com/").then(function (response) {

        let $ = cheerio.load(response.data);

        $(".entry-header").each(function (i, element) {
            let result = {}

            result.title = $(this).children("a").text()
            result.summary = $(this).children("p").text()
            result.url = $(this).children("a").attr("href")

            db.Article.create(result).then(function (dbArt) {
                    console.log(dbArt)
                })
                .catch(function (err) {
                    return res.json(err);
                });
        })
        res.send("Scrape Complete")
    })
})
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});