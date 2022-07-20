import React, { Component } from "react";
import { DayPilot, DayPilotScheduler } from "daypilot-pro-react";
import Nav from "../NavBar/NavBar";
import axios from "axios";

class Scheduler extends Component {
  constructor(props) {
    super(props);

    //Rules to determine the layout of the schedule
    this.state = {
      startDate: DayPilot.Date.today().firstDayOfWeek(),
      days: 1,
      scale: "Hour",
      timeHeaders: [
        { groupBy: "Day", format: "dddd M/d/yyyy" },
        { groupBy: "Hour" },
      ],
      rowHeaderColumns: [{ text: "Name", display: "name" }],
      rowHeaderColumnDefaultWidth: 250,
      width: "1210px",
      cellwidth: "50px",
      resources: [],
      events: [],
    };
  }

  componentDidMount() {
    this.loadData();
  }

  //Loads the schedule from the database, and posts the information to the classes state above.
  async loadData() {
    const promiseResources = await axios.get(
      "https://scheduler-project-backend.herokuapp.com/employee"
    );
    const promiseEvents = await axios.get(
      "https://scheduler-project-backend.herokuapp.com/schedule"
    );
    const [{ data: events }, { data: resources }] = await Promise.all([
      promiseEvents,
      promiseResources,
    ]);

    this.state.resources = resources;

    const shifts = [
      ...new Map(events.map((shift) => [shift.id, shift])).values(),
    ];
    this.state.events = shifts;
    console.log(this.state.events);
  }

  //Controls the buttons which change the day forwards and backwards when on the day view
  clickLastDay() {
    const next = this.state.startDate.addDays(-1);
    this.setState({
      startDate: next,
    });
  }

  clickNextDay() {
    const next = this.state.startDate.addDays(1);
    this.setState({
      startDate: next,
    });
  }

  render() {
    const { ...config } = this.state;
    return (
      <div>
        <Nav />
        <div className="flex items-center justify-center my-16">
          <DayPilotScheduler
            {...config}
            //Requirements for DayPilot
            ref={(component) => {
              this.scheduler = component && component.control;
            }}
          />
        </div>
        <div className="flex items-center justify-center my-16">
          <button
            className="mx-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            onClick={() => {
              this.clickLastDay();
            }}
          >
            Previous
          </button>
          <button
            className="mx-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            onClick={() => {
              this.clickNextDay();
            }}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default Scheduler;
