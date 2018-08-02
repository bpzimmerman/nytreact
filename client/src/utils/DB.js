import axios from "axios";

export default {
  // save an article to the database
  saveArticle: (queryData) => {
    return axios.post("/db/saves", queryData);
  },
  // retrieve all the saved articles
  getSaves: () => {
    return axios.get("/db/saves");
  },
  // delete a saved article
  deleteArticle: (queryData) => {
    return axios.delete("/db/saves", {
      params: queryData
    });
  },
  // save a comment to an article
  saveComment: (queryData) => {
    return axios.post("/db/comments", queryData);
  },
  // retrieve all the comments associated with an article
  getComments: (queryData) => {
    return axios.get("/db/comments", {
      params: queryData
    });
  },
  // delete a comment
  deleteComment: (id) => {
    return axios.delete(`/db/comments/${id}`);
  },
  // delete all comments associated with an article (used when deleting and article)
  deleteAllComments: (queryData) => {
    return axios.delete("/db/comments", {
      params: queryData
    });
  }
};