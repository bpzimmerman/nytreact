import axios from "axios";

export default {
  saveArticle: (queryData) => {
    return axios.post("/db/saves", queryData);
  }
};