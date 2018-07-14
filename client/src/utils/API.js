import axios from "axios";

export default {
  getArticles: (queryData) => {
    return axios.get("/api/articles", {
      params: queryData
    });
  }
};