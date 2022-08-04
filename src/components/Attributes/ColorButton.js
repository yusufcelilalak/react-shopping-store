import { Component, Fragment } from "react";
import classes from "./ColorButton.module.css";

class ColorButton extends Component {
  render() {
    return (
      <Fragment>
        <input
          className={classes["color-button"]}
          type="radio"
          id={this.props.color + this.props.id}
          name={this.props["attribute-name"] + this.props.id}
        />
        <label
          style={{ backgroundColor: this.props.color }}
          className={`${classes["color-label"]} ${classes[this.props.type]}`}
          htmlFor={this.props.color + this.props.id}
        ></label>
      </Fragment>
    );
  }
}

export default ColorButton;
