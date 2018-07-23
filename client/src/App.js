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
    endDate: undefined
  };

  dateChange = (date, event) => {
    (!event.nativeEvent.path[7][2].name)?
      this.setState({
        [event.nativeEvent.path[7][1].name]: date
      }):
      this.setState({
        [event.nativeEvent.path[7][2].name]: date
      });
  };

  maxStart = () => {
    if (this.state.endDate && this.state.endDate < moment()) {
      return this.state.endDate;
    } else {
      return moment();
    }
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  saveArticle = article => {
    console.log("save article");
    DB.saveArticle(article)
      .then(res => {
        console.log(`${res.data._id} article saved`);
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
        console.log(this.state.articles);
      })
      .catch(err => {
        console.log(err);
      })
  };

  deleteArticle = () => {
    console.log("delete article");
  };

  saveComment = () => {
    console.log("save comment");
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.startDate && this.state.endDate) {
      let start = moment(this.state.startDate).format("YYYYMMDD");
      let end = moment(this.state.endDate).format("YYYYMMDD");
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
            console.log(res.data.response.docs);
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
            console.log(news);
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

  getSaved = (event) => {
    event.preventDefault();
    console.log("get saved articles");
    DB.getSaves()
      .then(res => {
        console.log(res.data);
        let saves = res.data;
        saves.forEach((item, key) => {
          saves[key].delFunc = this.deleteArticle;
        });
        saves.saveComment = this.saveComment
        this.setState({
          articles: saves,
          topic: "",
          startDate: undefined,
          endDate: undefined
        });
        console.log(saves);
      })
      .catch(err => {
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
                  onClick={this.getSaved}
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