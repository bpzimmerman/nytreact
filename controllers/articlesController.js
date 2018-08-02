require("dotenv").config();
const axios = require("axios");
const keys = require("../keys.js");

// activate api key
const nytKey = keys.nyt.id;

// Defining methods for the articlesController (getting new articles from the NY Times API)
module.exports = {
  findNew: (req, res) => {
    let topic = req.query.topic;
    let startDate = req.query.startDate;
    let endDate = req.query.endDate;

    let nytURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    let search = {
      "api-key": nytKey,
      "begin_date": startDate,
      "end_date": endDate
    };
    if (topic) {
      search["q"] = topic;
    };

    axios.get(nytURL, {
      params: search
    }).then((response) => {
      res.json(response.data);
    }).catch((error) => {
      res.json(error);
    });

  }
};