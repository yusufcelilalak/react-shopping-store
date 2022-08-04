import { Component, Fragment } from "react";
import classes from "./AttributeButton.module.css";

class AttributeButton extends Component {
  render() {
    const style = {
      fontSize: "3rem",
      fontFamily: `'Raleway', sans-serif`,
      fontWeight: 100,
      width: "2.2rem",
      height: "2.2rem",
    };

    const inputLabel = (_style) => {
      return (
        <label
          style={_style}
          className={classes["attribute-label"]}
          htmlFor={this.props.attribute + this.props.id}
        >
          {this.props.attribute}
        </label>
      );
    };

    return (
      <Fragment>
        <input
          className={classes["attribute-button"]}
          type="radio"
          id={this.props.attribute + this.props.id}
          name={this.props["attribute-name"] + this.props.id}
        />
        {this.props.attribute === "+"
          ? inputLabel(style)
          : this.props.attribute === "-"
          ? inputLabel({ ...style, paddingBottom: "4px" })
          : inputLabel({})}
      </Fragment>
    );
  }
}

export default AttributeButton;
