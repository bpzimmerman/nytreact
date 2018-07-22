import axios from "axios";

export default {
  saveArticle: (queryData) => {
    return axios.post("/db/saves", queryData);
  },
  getSaves: () => {
    return axios.get("/db/saves");
  }
};