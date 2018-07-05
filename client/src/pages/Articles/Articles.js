import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Articles.css";
import moment from "moment";
import Sidebar from "../../components/Sidebar";
import { Input, FormBtn } from "../../components/Form";

class Articles extends Component {
  state = {
    topic: "",
    startDate: undefined,
    endDate: undefined
  };

  fromDateChange = date => {
    this.setState({
      startDate: date
    });
  };

  toDateChange = date => {
    this.setState({
      endDate: date
    });
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
      console.log("submitted!");
      console.log(this.state.startDate);
      console.log(this.state.endDate);
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
              maxDate={moment()}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              disabledKeyboardNavigation
              selected={this.state.startDate}
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              onChange={this.fromDateChange}
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
              onChange={this.toDateChange}
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