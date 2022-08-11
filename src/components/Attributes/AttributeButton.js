import { Component, Fragment } from "react";
import classes from "./AttributeButton.module.css";

class AttributeButton extends Component {
  render() {
    const style = {
      fontFamily: `'Raleway', sans-serif`,
      fontWeight: 100,
      width: "2.4rem",
      height: "2.2rem",
      fontSize: "2rem",
    };

    const inputLabel = (_style) => {
      return (
        <label
          style={_style}
          className={`${classes["attribute-label"]} ${
            classes[this.props.type]
          }`}
          htmlFor={this.props.attribute + this.props["attribute-name"]}
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
          id={this.props.attribute + this.props["attribute-name"]}
          name={this.props["attribute-name"]}
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
