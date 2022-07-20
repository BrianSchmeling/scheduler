import React, { Component } from "react";
import { DayPilot, DayPilotScheduler } from "daypilot-pro-react";
import axios from "axios";

class DeleteEmployee extends Component {
  constructor(props) {
    super(props);
  }

  //This function allows you to delete an employee by clicking the 'Delete Employee' button
  deleteEmployee = () => {
    DayPilot.Modal.prompt("Delete Employee Name:", "Name").then((modal) => {
      if (!modal.result) {
        return;
      }
      console.log(modal.result);
      let thisName = modal.result;
      axios.delete(
        `https://scheduler-project-backend.herokuapp.com/employee/${thisName}`
      );
    });
  };

  render() {
    return (
      <span>
        <button
          className="mx-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          onClick={this.deleteEmployee}
        >
          Delete Employee
        </button>
      </span>
    );
  }
}

export default DeleteEmployee;
