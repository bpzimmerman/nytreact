// dependency
const mongoose = require("mongoose");

// schema constructor
const Schema = mongoose.Schema;

// create new schema for the comments
const CommentSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  body: {
    type: String
  },
  article: {
    type: String
  }
});

// create a model from the schema
const Comment = mongoose.model("Comment", CommentSchema);

// Export the Comment model
module.exports = Comment;