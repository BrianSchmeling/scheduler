import React, { Component } from "react";
import { useState, useEffect } from "react";
import Nav from "../NavBar/NavBar";
import { DayPilot } from "daypilot-pro-react";
import axios from "axios";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dateTime: new Date().toLocaleString(),
    };
  }

  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  tick() {
    this.setState({
      dateTime: new Date().toLocaleString(),
    });
  }

  clockOut = () => {
    DayPilot.Modal.prompt("Clock Out", "Name").then((modal) => {
      if (!modal.result) {
        return;
      }
      axios.post(
        `https://scheduler-project-backend.herokuapp.com/clockOut/add`,
        {
          name: modal.result,
          time: this.state.dateTime,
        }
      );
    });
  };

  clockIn = () => {
    DayPilot.Modal.prompt("Clock In", "Name").then((modal) => {
      if (!modal.result) {
        return;
      }
      axios.post(
        `https://scheduler-project-backend.herokuapp.com/clockIn/add`,
        {
          name: modal.result,
          time: this.state.dateTime,
        }
      );
    });
  };

  render() {
    return (
      <div>
        <Nav />
        <div className="my-8 countdown font-mono text-5xlgrid grid-flow-col gap-5 text-center auto-cols-max">
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content countdown font-mono text-5xl">
            {this.state.dateTime}
          </div>
        </div>
        <div className="flex items-center justify-center my-16">
          <button
            onClick={(args) => {
              this.clockIn(args);
            }}
            className="mx-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            Clock in
          </button>
          <button
            onClick={(args) => {
              this.clockOut(args);
            }}
            className="mx-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            Clock out
          </button>
        </div>
      </div>
    );
  }
}

export default Home;
