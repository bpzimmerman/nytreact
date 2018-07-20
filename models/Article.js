// dependency
const mongoose = require("mongoose");

// schema constructor
const Schema = mongoose.Schema;

// create new schema for articles
const ArticleSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  headline: {
    type: String,
    required: true
  },
  web_url: {
    type: String,
    required: true
  },
  snippet: {
    type: String,
    required: true
  },
  pub_date: {
    type: Date,
    required: true
  },
  image: {
    type: String
  },
  news_desk: {
    type: String,
    required: true
  }
});

// create a model from the schema
const Article = mongoose.model("Article", ArticleSchema);

// export the Article model
module.exports = Article;