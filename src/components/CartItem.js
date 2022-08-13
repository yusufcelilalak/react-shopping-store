import { Component } from "react";
import { connect } from "react-redux";
import AttributeButton from "./Attributes/AttributeButton";
import Attributes from "./Attributes/Attributes";
import classes from "./CartItem.module.css";

class CartItem extends Component {
  render() {
    const product = this.props.product;
    const price = product.prices.find(
      (price) => price.currency.symbol === this.props.currency[0]
    );

    console.log(product);
    return (
      <div className={`${classes["cart-item"]} ${classes[this.props.type]}`}>
        <div className={classes["item-info"]}>
          <h2>{product.brand}</h2>
          <h3>{product.name}</h3>

          <div className={classes.price}>
            {`${this.props.currency[0]}${
              price !== undefined ? price.amount * product.quantity : ""
            }`}
          </div>

          {product.attributes.map((attribute) => {
            return (
              <Attributes
                key={attribute.id}
                id={product.orderNumber}
                type={this.props.type}
                attribute-name={attribute.id}
                attributes={attribute.items}
                selected-attribute={product.selectedAttributes[attribute.id]}
              ></Attributes>
            );
          })}
        </div>

        <div className={classes["adding-actions"]}>
          <AttributeButton
            type={this.props.type}
            attribute="+"
            attribute-name={product.orderNumber}
            id="plus"
          />

          <div className={classes.quantity}>{product.quantity}</div>

          <AttributeButton
            type={this.props.type}
            attribute="-"
            attribute-name={product.orderNumber}
            id="minus"
          />
        </div>

        <div className={classes["product-photo"]}>
          <img src={product.gallery[0]} alt="clothes" />
          <button className={classes["previous-photo-btn"]}>&lt;</button>
          <button className={classes["next-photo-btn"]}>&gt;</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.currency.choosenCurrency,
});

export default connect(mapStateToProps, null)(CartItem);
