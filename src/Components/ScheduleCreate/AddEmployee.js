import React, { Component } from "react";
import { DayPilot, DayPilotScheduler } from "daypilot-pro-react";

import axios from "axios";

class AddEmployee extends Component {
  constructor(props) {
    super(props);
  }

  addEmployee = () => {
    DayPilot.Modal.prompt("New Employee", "Name").then((modal) => {
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
        <button
          className="mx-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          onClick={this.addEmployee}
        >
          Add Employee
        </button>
      </span>
    );
  }
}

export default AddEmployee;
