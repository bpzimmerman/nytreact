import axios from "axios";

export default {
  saveArticle: (queryData) => {
    return axios.post("/db/saves", queryData);
  },
  getSaves: () => {
    return axios.get("/db/saves");
  },
  saveComment: (queryData) => {
    return axios.post("/db/comments", queryData);
  },
  getComments: (queryData) => {
    return axios.get("/db/comments", {
      params: queryData
    });
  },
  deleteComment: (queryData) => {
    return axios.delete("/db/comments", {
      params: queryData
    });
  }
};