import { Component, Fragment } from "react";
import CartItem from "../CartItem";
import classes from "./CartDropdown.module.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class CartDropdown extends Component {
  render() {
    //console.log("CartList: ", this.props.cart);
    const cart = this.props.cart;
    const cartList = this.props.cart.productList;

    console.log(this.props.cart.productList);

    return (
      <Fragment>
        <div
          onMouseEnter={this.props.onMouseLeave}
          className={classes.backdrop}
        ></div>

        <div
          onMouseLeave={this.props.onMouseLeave}
          className={`${this.props.className} ${classes["cart-summary"]}`}
        >
          <div className={classes["cart-summary-title"]}>
            My Bag, <span>{cart.totalQuantity} items</span>
          </div>
          {cartList.map((product) => {
            return <CartItem type="dropdown" product={product} />;
          })}

          <div className={classes["total-price"]}>
            <span>Total</span>
            <span>{`${this.props.currency[0]} ${cartList.reduce(
              (prev, curr) => {
                const currPrice = curr.prices.find(
                  (price) => price.currency.symbol === this.props.currency[0]
                );
                return prev + currPrice.amount * curr.quantity;
              },
              0
            )}`}</span>
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
            <button className={classes["check-out-btn"]}>CHECK OUT</button>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
  currency: state.currency.choosenCurrency,
});

export default connect(mapStateToProps, null)(CartDropdown);
