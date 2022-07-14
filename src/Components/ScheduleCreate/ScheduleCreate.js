import React, { Component } from "react";
import { DayPilot, DayPilotScheduler } from "daypilot-pro-react";
import Zoom from "./Zoom";
import axios from "axios";

class Scheduler extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: "2018-05-01",
      days: 31,
      scale: "Day",
      // ...
      startDate: DayPilot.Date.today().firstDayOfWeek(),
      days: 7,
      scale: "Hour",
      timeHeaders: [
        { groupBy: "Day", format: "dddd M/d/yyyy" },
        { groupBy: "Hour" },
      ],
      cellWidthSpec: "auto",
      resources: [
        { name: "Brian", id: "1" },
        { name: "Emma", id: "2" },
        { name: "Quoc", id: "3" },
        { name: "Jillian", id: "4" },
        { name: "Kevin", id: "5" },
      ],
      events: [],
    };
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const start = this.scheduler.visibleStart();
    const end = this.scheduler.visibleEnd();
    // const promiseResources = axios.get("http:localhost:8080/schedule");
    const promiseEvents = axios.get("http://localhost:8080/schedule");
    const [{ data: events }] = await Promise.all([
      // promiseResources,
      promiseEvents,
    ]);

    const shifts = [
      ...new Map(events.map((shift) => [shift.id, shift])).values(),
    ];
    this.state.events = shifts;
  }

  zoomChange(args) {
    switch (args.level) {
      case "week":
        this.setState({
          startDate: DayPilot.Date.today().firstDayOfWeek(),
          days: 7,
          scale: "Hour",
        });
        break;
      case "day":
        this.setState({
          startDate: DayPilot.Date.today(),
          days: 1,
          scale: "Hour",
        });
        break;
      default:
        throw new Error("Invalid zoom level");
    }
  }

  render() {
    const { ...config } = this.state;
    return (
      <div>
        <div>
          <Zoom onChange={(args) => this.zoomChange(args)} />
        </div>
        <DayPilotScheduler
          {...config}
          onEventResized={(args) => {
            console.log(
              "Event resized: ",
              args.e.data.id,
              args.newStart,
              args.newEnd
            );
            console.log("Event resized: " + args.e.data.text);
          }}
          onEventMoved={(args) => {
            console.log(
              "Event moved: ",
              args.e.data.id,
              args.newStart,
              args.newEnd,
              args.newResource
            );
          }}
          onTimeRangeSelected={(args) => {
            DayPilot.Modal.prompt("New event name", "Event").then((modal) => {
              // this.scheduler.clearSelection();
              if (!modal.result) {
                return;
              }
              axios.post(`http://localhost:8080/schedule/add`, {
                id: DayPilot.guid(),
                text: modal.result,
                start: args.start.value,
                end: args.end.value,
                resource: parseInt(args.resource),
              });
              console.log({
                id: DayPilot.guid(),
                text: modal.result,
                start: args.start.value,
                end: args.end.value,
                resource: args.resource,
              });
            });
          }}
          ref={(component) => {
            this.scheduler = component && component.control;
          }}
        />
      </div>
    );
  }
}

export default Scheduler;