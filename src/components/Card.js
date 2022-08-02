import { Component } from "react";
import classes from "./Card.module.css";

class Card extends Component {
  render() {
    return (
      <div
        onMouseOver={this.props.onMouseOver}
        onMouseOut={this.props.onMouseOut}
        className={`${classes.card} ${this.props.className}`}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Card;
