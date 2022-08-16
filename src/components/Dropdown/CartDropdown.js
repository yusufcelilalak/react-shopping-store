import { Component, Fragment } from "react";
import CartItem from "../CartItem";
import classes from "./CartDropdown.module.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { cartActions } from "../../store/cart-slice";

class CartDropdown extends Component {
  constructor() {
    super();
    this.state = {
      isOrdered: false,
    };
  }

  // order handler to order products and display thanks message on cart dropdown
  orderProductsHandler = () => {
    if (this.props.cart.productList.length > 0) {
      this.props.orderProducts();
      this.setState({ isOrdered: true });
    }
  };

  render() {
    const cart = this.props.cart;
    const cartList = this.props.cart.productList;
    const totalPrice = cartList.reduce((prev, curr) => {
      const currPrice = curr.prices.find(
        (price) => price.currency.symbol === this.props.currency[0]
      );
      return prev + currPrice.amount * curr.quantity;
    }, 0);

    return this.state.isOrdered === false ? (
      <Fragment>
        <div
          onMouseEnter={this.props.onMouseLeave}
          className={classes.backdrop}
        ></div>

        <div
          onMouseLeave={this.props.onMouseLeave}
          className={`${this.props.className}`}
        >
          <div className={classes["cart-summary-title"]}>
            My Bag, <span>{cart.totalQuantity} items</span>
          </div>
          {cartList.map((product) => {
            return (
              <CartItem
                key={product.orderNumber}
                type="dropdown"
                product={product}
              />
            );
          })}

          <div className={classes["total-price"]}>
            <span>Total</span>
            <span>{`${this.props.currency[0]}${totalPrice.toFixed(2)}`}</span>
          </div>

          <div className={classes["control-buttons"]}>
            <Link to="/cart">
              <button
                onClick={this.props.onMouseLeave}
                className={classes["view-bag-btn"]}
              >
                VIEW BAG
              </button>
            </Link>
            <button
              onClick={this.orderProductsHandler}
              className={classes["check-out-btn"]}
            >
              CHECK OUT
            </button>
          </div>
        </div>
      </Fragment>
    ) : (
      <Fragment>
        <div
          onMouseLeave={this.props.onMouseLeave}
          className={`${this.props.className} ${classes["order-successful"]} `}
        >
          <p>
            Thank you for your order!
            <br />
            <br /> We hope you enjoy your new products. Have a great day :-)
          </p>
        </div>
        <div
          onMouseEnter={this.props.onMouseLeave}
          className={classes.backdrop}
        ></div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
  currency: state.currency.choosenCurrency,
});

const mapDispatchToProps = (dispatch) => {
  return { orderProducts: () => dispatch(cartActions.orderProducts()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartDropdown);
