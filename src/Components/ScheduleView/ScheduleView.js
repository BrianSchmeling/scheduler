import React, { Component } from "react";
import { DayPilot, DayPilotScheduler } from "daypilot-pro-react";
import axios from "axios";

class Scheduler extends Component {
  constructor(props) {
    super(props);

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
      // eventDeleteHandling: "Update",
    };
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const start = this.scheduler.visibleStart();
    const end = this.scheduler.visibleEnd();
    const promiseResources = axios.get(
      "https://scheduler-project-backend.herokuapp.com/employee"
    );
    const promiseEvents = axios.get(
      "https://scheduler-project-backend.herokuapp.com/schedule"
    );
    const [{ data: events }, { data: resources }] = await Promise.all([
      promiseEvents,
      promiseResources,
    ]);

    this.state.resources = resources;
    console.log(this.state.resources);

    const shifts = [
      ...new Map(events.map((shift) => [shift.id, shift])).values(),
    ];
    this.state.events = shifts;
  }

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
        {/* <div>
          <DayChooser onChange={(args) => this.zoomChange(args)} />
        </div> */}
        <div>
          <DayPilotScheduler
            {...config}
            ref={(component) => {
              this.scheduler = component && component.control;
            }}
          />
        </div>
        <button
          onClick={() => {
            this.clickLastDay();
          }}
        >
          Previous
        </button>
        <button
          onClick={() => {
            this.clickNextDay();
          }}
        >
          Next
        </button>
      </div>
    );
  }
}

export default Scheduler;
