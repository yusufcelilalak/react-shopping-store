import { Component } from "react";
import AttributeButton from "./Attributes/AttributeButton";
import Attributes from "./Attributes/Attributes";
import classes from "./CartItem.module.css";

class CartItem extends Component {
  render() {
    return (
      <div className={`${classes["cart-item"]} ${classes[this.props.type]}`}>
        <div className={classes["item-info"]}>
          <h2>{this.props.product.brand}</h2>
          <h3>{this.props.product.title}</h3>

          <div className={classes.price}>
            ${this.props.product.price.toFixed(2)}
          </div>

          {Object.keys(this.props.product.attributes).map((key) => {
            return (
              <Attributes
                id={this.props.product.id}
                type={this.props.type}
                attribute-name={key}
                attributes={this.props.product.attributes[key]}
              ></Attributes>
            );
          })}
        </div>

        <div className={classes["adding-actions"]}>
          <AttributeButton
            id={this.props.product.id}
            type={this.props.type}
            attribute="+"
            attribute-name="adding-action"
          />

          <div className={classes.quantity}>{this.props.product.quantity}</div>

          <AttributeButton
            id={this.props.product.id}
            type={this.props.type}
            attribute="-"
            attribute-name="adding-action"
          />
        </div>

        <div className={classes["product-photo"]}>
          {<img src={this.props.product.images} alt="clothes" />}
        </div>
      </div>
    );
  }
}

export default CartItem;
