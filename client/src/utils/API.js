import axios from "axios";

export default {
  // retrieve articles from the NY Times API
  getArticles: (queryData) => {
    return axios.get("/api/articles", {
      params: queryData
    });
  }
};