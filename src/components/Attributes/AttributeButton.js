import { Component, Fragment } from "react";
import classes from "./AttributeButton.module.css";

class AttributeButton extends Component {
  render() {
    return (
      <Fragment>
        <input
          className={classes["attribute-button"]}
          type="radio"
          id={this.props.attribute}
          name={this.props["attribute-name"]}
        />
        <label
          className={classes["attribute-label"]}
          htmlFor={this.props.attribute}
        >
          {this.props.attribute}
        </label>
      </Fragment>
    );
  }
}

export default AttributeButton;
