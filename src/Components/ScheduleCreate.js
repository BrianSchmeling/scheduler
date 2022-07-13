import React, { Component } from "react";
import { DayPilot, DayPilotScheduler } from "daypilot-pro-react";
import Zoom from "./Zoom";

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
      events: [
        {
          id: 1,
          text: "Event 1",
          start: "2022-07-11T00:00:00",
          end: "2022-07-12T00:00:00",
          resource: "1",
        },
        {
          id: 2,
          text: "Event 2",
          start: "2022-07-11T04:00:00",
          end: "2022-07-11T08:00:00",
          resource: "2",
          barColor: "#38761d",
          barBackColor: "#93c47d",
        },
        {
          id: 3,
          text: "Event 3",
          start: "2022-07-11T00:00:00",
          end: "2022-07-11T09:00:00",
          resource: "4",
          barColor: "#f1c232",
          barBackColor: "#f1c232",
        },
        {
          id: 4,
          text: "Event 3",
          start: "2022-07-11T00:00:00",
          end: "2022-07-11T14:00:00",
          resource: "5",
          barColor: "#cc0000",
          barBackColor: "#ea9999",
        },
      ],
    };
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
        <DayPilotScheduler {...config} />;
      </div>
    );
  }
}

export default Scheduler;
