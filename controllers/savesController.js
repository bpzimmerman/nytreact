const db = require("../models");

// Defining methods for the savesController (accessing the database)
module.exports = {
  saveArticle: (req, res) => {
    db.Article
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findAll: (req, res) => {
    db.Article
      .find(req.query)
      .sort({ pub_date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  deleteArticle: (req, res) => {
    db.Article
      .deleteOne({_id: req.query.articleId})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  saveComment: (req, res) => {
    db.Comment
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findComments: (req, res) => {
    db.Comment
      .find({article: req.query.articleId})
      .sort({ created: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  deleteComment: (req, res) => {
    db.Comment
      .deleteOne({_id: req.params.id})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  deleteAllComments: (req, res) => {
    db.Comment
      .deleteMany({article: req.query.articleId})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};