import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Articles.css";
import moment from "moment";
import Sidebar from "../../components/Sidebar";
import { Input, FormBtn } from "../../components/Form";
import API from "../../utils/API";

class Articles extends Component {
  state = {
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
    console.log(event.nativeEvent.path[7][1].name);
    console.log(event.nativeEvent.path[7][2].name);
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

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.startDate && this.state.endDate) {
      let start = moment(this.state.startDate).format("YYYYMMDD");
      let end = moment(this.state.endDate).format("YYYYMMDD");
      console.log(`start: ${start}`);
      console.log(`end: ${end}`);
      API.getArticles({
        topic: this.state.topic,
        startDate: start,
        endDate: end
      }).then(res => {
        console.log(res.data.response.docs);
      }).catch(err => {
        console.log(err);
      });
    };
  };

  render() {
    return (
      <div className="wrapper">
        <Sidebar>
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
              Get Articles
            </FormBtn>
          </form>
        </Sidebar>
        <div id="content">
          <h2>Data goes here.</h2>
        </div>
      </div>
    );
  };
};

export default Articles;