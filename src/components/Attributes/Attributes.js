import { Component } from "react";
import AttributeButton from "./AttributeButton";
import ColorButton from "./ColorButton";
import classes from "./Attributes.module.css";

class Attributes extends Component {
  render() {
    return (
      <div>
        <div
          className={`${classes["attribute-name"]} ${classes[this.props.type]}`}
        >
          {this.props.type === "dropdown"
            ? this.props["attribute-name"].charAt(0).toUpperCase() +
              this.props["attribute-name"].slice(1).toLowerCase()
            : this.props["attribute-name"]}
          :
        </div>
        <div className={classes.attributes}>
          {this.props["attribute-name"] !== "COLOR"
            ? this.props.attributes.map((attribute) => {
                return (
                  <AttributeButton
                    id={this.props.id}
                    type={this.props.type}
                    attribute-name={this.props["attribute-name"]}
                    attribute={attribute}
                  >
                    {attribute}
                  </AttributeButton>
                );
              })
            : this.props.attributes.map((attribute) => {
                return (
                  <ColorButton
                    id={this.props.id}
                    type={this.props.type}
                    attribute-name={this.props["attribute-name"]}
                    color={attribute}
                  />
                );
              })}
        </div>
      </div>
    );
  }
}

export default Attributes;