import React, { Component } from "react";
import { useState, useEffect } from "react";
import Nav from "../NavBar/NavBar";

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

  render() {
    return (
      <div>
        <Nav />
        <div>{this.state.dateTime}</div>
      </div>
    );
  }
}

export default Home;
