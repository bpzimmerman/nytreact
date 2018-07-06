require("dotenv").config();
const axios = require("axios");
const keys = require("../keys.js");

// activate api key
const nytKey = keys.nyt.id;

// Defining methods for the articlesController
module.exports = {
  findNew: (req, res) => {
    let topic = req.query.topic;
    let startDate = req.query.startDate;
    let endDate = req.query.endDate;

    let nytURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    let params = {
      "api-key": nytKey,
      "begin_date": startDate,
      "end_date": endDate
    };
    if (topic) {
      params["q"] = topic;
    };

    axios.get(nytURL, {
      qs: params
    }).then((response) => {
      console.log(response);
      res.json(response);
    }).catch((error) => {
      console.log(error);
      res.json(error);
    })
  }
};