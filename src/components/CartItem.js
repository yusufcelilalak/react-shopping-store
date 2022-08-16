import { Component } from "react";
import { connect } from "react-redux";
import AttributeButton from "./Attributes/AttributeButton";
import Attributes from "./Attributes/Attributes";
import classes from "./CartItem.module.css";

class CartItem extends Component {
  constructor() {
    super();
    this.state = {
      imageIndex: 0, // index used for displaying images when buttons clicked
    };
  }

  showPreviousPhoto = () => {
    if (this.state.imageIndex <= 0)
      this.setState({ imageIndex: this.props.product.gallery.length - 1 });
    else this.setState({ imageIndex: this.state.imageIndex - 1 });
  };

  showNextPhoto = () => {
    if (this.state.imageIndex >= this.props.product.gallery.length - 1)
      this.setState({ imageIndex: 0 });
    else this.setState({ imageIndex: this.state.imageIndex + 1 });
  };

  render() {
    const product = this.props.product;
    const price = product.prices.find(
      (price) => price.currency.symbol === this.props.currency[0]
    );

    return (
      <div className={`${classes["cart-item"]} ${classes[this.props.type]}`}>
        <div className={classes["item-info"]}>
          <h2>{product.brand}</h2>
          <h3>{product.name}</h3>

          <div className={classes.price}>
            {`${this.props.currency[0]}${
              price !== undefined
                ? (price.amount * product.quantity).toFixed(2)
                : ""
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
                attribute-type={attribute.type}
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
            attribute-type="text"
          />

          <div className={classes.quantity}>{product.quantity}</div>

          <AttributeButton
            type={this.props.type}
            attribute="-"
            attribute-name={product.orderNumber}
            id="minus"
            attribute-type="text"
          />
        </div>

        <div className={classes["product-photo"]}>
          <img src={product.gallery[this.state.imageIndex]} alt="product" />
          <button
            onClick={this.showPreviousPhoto}
            className={classes["previous-photo-btn"]}
          >
            &lt;
          </button>
          <button
            onClick={this.showNextPhoto}
            className={classes["next-photo-btn"]}
          >
            &gt;
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.currency.choosenCurrency,
});

export default connect(mapStateToProps, null)(CartItem);
