import { Component, Fragment } from "react";
import classes from "./ColorButton.module.css";

class ColorButton extends Component {
  render() {
    return (
      <Fragment>
        <input
          className={classes["color-button"]}
          type="radio"
          id={this.props.color}
          name={this.props["attribute-name"]}
        />
        <label
          style={{ backgroundColor: this.props.color }}
          className={classes["color-label"]}
          htmlFor={this.props.color}
        ></label>
      </Fragment>
    );
  }
}

export default ColorButton;
