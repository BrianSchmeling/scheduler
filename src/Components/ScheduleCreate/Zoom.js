import React, { Component } from "react";

//This class controls the radoi buttons on the Create Schedule page, which changes the view from Week to Day

class Zoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: "week",
    };
  }

  change(ev) {
    const newLevel = ev.target.value;

    this.setState({
      level: newLevel,
    });

    if (this.props.onChange) {
      this.props.onChange({ level: newLevel });
    }
  }

  render() {
    return (
      <span className="toolbar-item">
        Scale:
        <label>
          <input
            type="radio"
            name="zoom"
            value="week"
            onChange={(ev) => this.change(ev)}
            checked={this.state.level === "week"}
          />{" "}
          Week
        </label>
        <label>
          <input
            type="radio"
            name="zoom"
            value="day"
            onChange={(ev) => this.change(ev)}
            checked={this.state.level === "day"}
          />{" "}
          Day
        </label>
      </span>
    );
  }
}

export default Zoom;
