import React, { Component } from "react";
import { DayPilot, DayPilotScheduler } from "daypilot-pro-react";
import Zoom from "./Zoom";
import AddEmployee from "./AddEmployee";
import DeleteEmployee from "./DeleteEmployee";
import Nav from "../NavBar/NavBar";
import axios from "axios";

class Scheduler extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contextMenu: new DayPilot.Menu({
        items: [
          {
            text: "Delete",
            onClick: (args) => {
              let id = args.source.data._id;
              // console.log(id);
              const promiseEvents = axios.delete(
                `https://scheduler-project-backend.herokuapp.com/schedule/${id}`
                // {
                //   id: args.e.data.id,
                // }
              );
            },
          },
        ],
      }),

      startDate: DayPilot.Date.today().firstDayOfWeek(),
      days: 7,
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
    // console.log(this.state.resources);

    const shifts = [
      ...new Map(events.map((shift) => [shift.id, shift])).values(),
    ];
    this.state.events = shifts;
  }

  clickLastDay(args) {
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

  dayBtns = () => {
    if (this.state.days === 1) {
      return (
        <div>
          <button
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            onClick={(args) => {
              this.clickLastDay(args);
              // console.log(args);
            }}
          >
            Previous
          </button>
          <button
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            onClick={(args) => {
              this.clickNextDay(args);
            }}
          >
            Next
          </button>
        </div>
      );
    }
  };

  zoomChange(args) {
    // console.log(args);
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
          startDate: DayPilot.Date.today().firstDayOfWeek(),
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
        <Nav />
        <div>
          <div>
            <Zoom onChange={(args) => this.zoomChange(args)}>
              {/* <button
                onClick={(args) => {
                  this.clickLastDay(args);
                  console.log(args);
                }}
              >
                Previous
              </button>
              <button
                onClick={(args) => {
                  this.clickNextDay(args);
                }}
              >
                Next
              </button> */}
            </Zoom>
          </div>
          <this.dayBtns />
          <DayPilotScheduler
            {...config}
            onEventResized={(args) => {
              let id = args.e.data._id;
              const promiseEvents = axios.put(
                `https://scheduler-project-backend.herokuapp.com/schedule/${id}`,
                {
                  start: args.newStart,
                  end: args.newEnd,
                }
              );
            }}
            onEventMoved={(args) => {
              let id = args.e.data._id;
              const promiseEvents = axios.put(
                `https://scheduler-project-backend.herokuapp.com/schedule/${id}`,
                {
                  id: args.e.data.id,
                  start: args.newStart,
                  end: args.newEnd,
                  resource: args.newResource,
                }
              );
            }}
            onTimeRangeSelected={(args) => {
              DayPilot.Modal.prompt("New event name", "Event").then((modal) => {
                // this.scheduler.clearSelection();
                if (!modal.result) {
                  return;
                }
                axios.post(
                  `https://scheduler-project-backend.herokuapp.com/schedule/add`,
                  {
                    id: DayPilot.guid(),
                    text: modal.result,
                    start: args.start.value,
                    end: args.end.value,
                    resource: parseInt(args.resource),
                  }
                );
              });
            }}
            ref={(component) => {
              this.scheduler = component && component.control;
            }}
          />
        </div>
        <AddEmployee />
        <DeleteEmployee />
      </div>
    );
  }
}

export default Scheduler;
