import React, { Component } from "react";
import { DayPilot, DayPilotScheduler } from "daypilot-pro-react";

import axios from "axios";

class AddEmployee extends Component {
  constructor(props) {
    super(props);
  }

  addEmployee = () => {
    DayPilot.Modal.prompt("New Employee", "Resources").then((modal) => {
      if (!modal.result) {
        return;
      }
      axios.post(
        `https://scheduler-project-backend.herokuapp.com/employee/add`,
        {
          id: DayPilot.guid(),
          name: modal.result,
        }
      );
    });
  };

  render() {
    return (
      <span>
        <button onClick={this.addEmployee}>Press me!</button>
      </span>
    );
  }
}

export default AddEmployee;
