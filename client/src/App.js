import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import Sidebar from "./components/Sidebar";
import { Input, FormBtn } from "./components/Form";
import Articles from "./pages/Articles"
import Nav from "./components/Nav";
import './App.css';
import API from "./utils/API";
import DB from "./utils/DB";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends Component {
  state = {
    articles: [],
    topic: "",
    startDate: undefined,
    endDate: undefined,
    comments: []
  };

  // set state for the start and end date when the date selectors are used
  dateChange = (date, event) => {
    (!event.nativeEvent.path[7][2].name)?
      this.setState({
        [event.nativeEvent.path[7][1].name]: date
      }):
      this.setState({
        [event.nativeEvent.path[7][2].name]: date
      });
  };

  // defines the maximum start date if an end date is selected first (prevents the start date from being later than the end date)
  maxStart = () => {
    if (this.state.endDate && this.state.endDate < moment()) {
      return this.state.endDate;
    } else {
      return moment();
    }
  };

  // sets the state for the "topic" input box
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // saves an article to the database
  saveArticle = article => {
    DB.saveArticle(
      article
    ).then(res => {
      let allArticles = this.state.articles;
      allArticles.forEach((item, key) => {
        if(item._id === res.data._id) {
          allArticles[key].saved = true;
        };
      });
      this.setState({
        articles: allArticles,
        topic: "",
        startDate: undefined,
        endDate: undefined
      });
    }).catch(err => {
      console.log(err);
    })
  };

  // deletes a previously saved article
  deleteArticle = (article) => {
    DB.deleteAllComments({
      articleId: article
    }).then(res => {
      DB.deleteArticle({
        articleId: article
      }).then(res => {
        this.getSavedArticles();
      }).catch(err => {
        console.log(err);
      })
    }).catch(err => {
      console.log(err);
    })
  };

  // saves a comment on an article to the database
  saveComment = event => {
    event.preventDefault();
    let articleID = document.getElementById("comment-title").getAttribute("data-article");
    let comment = document.getElementById("comment").value.trim();
    if(comment) {
      DB.saveComment({
        body: comment,
        article: articleID
      }).then(res => {
        document.getElementById("comment").value = "";
      }).catch(err => {
        console.log(err);
      })
    };
  };

  // deletes a previously saved comment
  deleteComment = (comment) => {
    DB.deleteComment(
      comment
    ).then(res => {
      let articleID = document.getElementById("comment-title").getAttribute("data-article");
      this.getSavedComments(articleID);
    }).catch(err => {
      console.log(err);
    })
  };

  // retrieves articles from the NY Times API based on the form inputs (topic, start date, end date)
  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.startDate && this.state.endDate) {
      let start = moment(this.state.startDate).format("YYYYMMDD");
      let end = moment(this.state.endDate).format("YYYYMMDD");
      if (end === start) {
        end = moment(this.state.endDate).add(1, "days").format("YYYYMMDD")
      };
      DB.getSaves()
        .then(res => {
          let savedArticles = [];
          res.data.forEach(item => {
            savedArticles.push(item._id);
          });
          API.getArticles({
            topic: this.state.topic,
            startDate: start,
            endDate: end
          }).then(res => {
            let news = [];
            res.data.response.docs.forEach(item => {
              let img = "";
              (item.multimedia[0])?
                img=`https://static01.nyt.com/${item.multimedia[0].url}`:img="";
              let status = false;
              (savedArticles.indexOf(item._id) === -1)?(status = false):(status = true);
              news.push({
                _id: item._id,
                headline: item.headline.main,
                web_url: item.web_url,
                snippet: item.snippet,
                pub_date: item.pub_date,
                image: img,
                news_desk: item.news_desk,
                saved: status,
                saveFunc: this.saveArticle
              });
            });
            this.setState({
              articles: news,
              topic: "",
              startDate: undefined,
              endDate: undefined
            });
          }).catch(err => {
            console.log(err);
          });
        })
        .catch(err => {
          console.log(err);
        });
    };
  };

  // gets all the saved articles
  getSavedArticles = event => {
    if (event) {
      event.preventDefault();
    };
    DB.getSaves()
      .then(res => {
        let saves = res.data;
        saves.forEach((item, key) => {
          saves[key].delFunc = this.deleteArticle;
          saves[key].getComments = this.getSavedComments;
        });
        saves.saveComment = this.saveComment
        this.setState({
          articles: saves,
          topic: "",
          startDate: undefined,
          endDate: undefined
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  // gets the saved comments for a specified article
  getSavedComments = (articleID) => {
    let title = document.getElementById("comment-title");
    title.setAttribute("data-article", articleID);
    title.innerHTML = `Article Comments: ${articleID}`;
    DB.getComments({
      articleId: articleID
    }).then(res => {
      res.data.forEach(item => {
        let date = moment(item.created).format("DD-MMM-YYYY");
        item.created = date;
        item.delCommentFunc = this.deleteComment;
      })
      this.setState({
        comments: res.data
      });
    }).catch(err => {
      console.log(err);
    });
  };

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <div className="wrapper">
            <Sidebar>
              <div className="sidebar-header">
                <h3>New Articles</h3>
              </div>
              <form>
                <Input
                  type="text"
                  placeholder="Article Topic"
                  value={this.state.topic}
                  onChange={this.handleInputChange}
                  name="topic"
                />
                <DatePicker
                  className="form-group datePicker"
                  name="startDate"
                  placeholderText="Start Date (required)"
                  minDate={moment("1851-09-18")}
                  maxDate={this.maxStart()}
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  disabledKeyboardNavigation
                  selected={this.state.startDate}
                  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                  onChange={this.dateChange}
                />
                <DatePicker
                  className="form-group datePicker"
                  name="endDate"
                  placeholderText="End Date (required)"
                  minDate={this.state.startDate}
                  maxDate={moment()}
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  disabledKeyboardNavigation
                  selected={this.state.endDate}
                  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                  onChange={this.dateChange}
                />
                <FormBtn
                  disabled={!(this.state.startDate && this.state.endDate)}
                  onClick={this.handleFormSubmit}
                >
                  Get New Articles
                </FormBtn>
              </form>
              <div className="sidebar-header">
                <h3>Saved Articles</h3>
              </div>
              <form>
                <FormBtn
                  onClick={this.getSavedArticles}
                >
                  Get Saved Articles
                </FormBtn>
              </form>
            </Sidebar>
            <Switch>
              <Route
                exact path="/"
              >
                <Articles
                  articles={this.state.articles}
                  comments={this.state.comments}
                />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }

};

export default App;