// dependency
const mongoose = require("mongoose");

// schema constructor
const Schema = mongoose.Schema;

// create new schema for articles
const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  picture: {
    type: String
  }
});

// create a model from the schema
const Article = mongoose.model("Article", ArticleSchema);

// export the Article model
module.exports = Article;