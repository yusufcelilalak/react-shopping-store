import { Component } from "react";
import classes from "./ProductItem.module.css";

class ProductItem extends Component {
  render() {
    return (
      <li className={classes["product-item"]}>
        <img src={this.props.image} alt={this.props.title} />
        <h3>{this.props.title}</h3>
        <h4>${this.props.price}</h4>
      </li>
    );
  }
}

export default ProductItem;
