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
      //This state controls the delete function when right-clicking on a shift
      contextMenu: new DayPilot.Menu({
        items: [
          {
            text: "Delete",
            onClick: (args) => {
              //Gets the ID from the item that was clicked on
              let id = args.source.data._id;
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

      //Controls the layout of the DayPilot schedule element
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
    };
  }

  componentDidMount() {
    this.loadData();
  }

  //Load the Data from the API and posts it to the above state
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

    const shifts = [
      ...new Map(events.map((shift) => [shift.id, shift])).values(),
    ];
    this.state.events = shifts;
  }

  //Controls the buttons that move the schedule forwards or backwards in time
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
          <div className="flex items-center justify-center my-8">
            <button
              className="mx-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              onClick={(args) => {
                this.clickLastDay(args);
                // console.log(args);
              }}
            >
              Previous Day
            </button>
            <button
              className="mx-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              onClick={(args) => {
                this.clickNextDay(args);
              }}
            >
              Next Day
            </button>
          </div>
        </div>
      );
    }
  };

  //Uses the information from the Zoom.js file to adjust the view between day and week
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
            <Zoom onChange={(args) => this.zoomChange(args)}></Zoom>
          </div>
          <div className="flex items-center justify-center my-16">
            <DayPilotScheduler
              {...config}
              //Allows you to adjust a scheduled shift by clicking on either end and dragging it, to increase/decreasee shift duration
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
              //Allows you to grab a shift and drag it to another employee, or to a different date/time
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
              //Allows you to drag across a section on the schedule to assign a shift
              onTimeRangeSelected={(args) => {
                DayPilot.Modal.prompt("New event name", "Event").then(
                  (modal) => {
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
                        resource: args.resource,
                      }
                    );
                  }
                );
              }}
              ref={(component) => {
                this.scheduler = component && component.control;
              }}
            />
          </div>
        </div>
        <this.dayBtns />
        <div className="flex items-center justify-center my-8">
          <AddEmployee />
          <DeleteEmployee />
        </div>
      </div>
    );
  }
}

export default Scheduler;
