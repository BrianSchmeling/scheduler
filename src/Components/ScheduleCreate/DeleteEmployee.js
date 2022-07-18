import React, { Component } from "react";
import { DayPilot, DayPilotScheduler } from "daypilot-pro-react";
import axios from "axios";

class DeleteEmployee extends Component {
  constructor(props) {
    super(props);
  }

  deleteEmployee = () => {
    DayPilot.Modal.prompt("Delete Employee Name:", "Name").then((modal) => {
      if (!modal.result) {
        return;
      }
      console.log(modal.result);
      axios.delete(
        `https://scheduler-project-backend.herokuapp.com/employee/${modal.result}`,
        {
          name: modal.result,
        }
      );
    });
  };

  render() {
    return (
      <span>
        <button onClick={this.deleteEmployee}>Delete!</button>
      </span>
    );
  }
}

export default DeleteEmployee;
