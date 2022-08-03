import { Component } from "react";
import AttributeButton from "./AttributeButton";
import ColorButton from "./ColorButton";
import classes from "./Attributes.module.css";

class Attributes extends Component {
  render() {
    return (
      <div>
        <div className={classes["attribute-name"]}>
          {this.props["attribute-name"]}:
        </div>
        <div className={classes.attributes}>
          {this.props["attribute-name"] !== "COLOR"
            ? this.props.attributes.map((attribute) => {
                return (
                  <AttributeButton
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
