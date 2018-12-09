const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ArticleSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    summary:{
        type: String,
        required: true
    },
    url:{
        type: String,
        required: true
    },
    post:{
        type: Schema.Types.ObjectId,
        ref: "Post"
    }
})

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;