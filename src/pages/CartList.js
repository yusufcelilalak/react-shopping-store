import { Component } from "react";
import classes from "./CartList.module.css";
import CartItem from "../components/CartItem";
import { connect } from "react-redux";
import { cartActions } from "../store/cart-slice";

class CartList extends Component {
  constructor() {
    super();
    this.state = {
      isOrdered: false,
    };
  }

  // order handler to order products and display thanks message on page
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

    // check if user already ordered products or not and return content
    return this.state.isOrdered === false ? (
      <div className={classes["cart-list"]}>
        <h1>CART</h1>

        {cartList.map((product) => {
          return (
            <CartItem key={product.orderNumber} type="cart" product={product} />
          );
        })}

        <div className={classes["payment-information"]}>
          <span>Tax 21%:</span>
          <span className={classes["bold-info"]}>{`${this.props.currency[0]}${(
            totalPrice * 0.21
          ).toFixed(2)}`}</span>

          <span>Quantity:</span>
          <span className={classes["bold-info"]}>{cart.totalQuantity}</span>

          <span>Total:</span>
          <span className={classes["bold-info"]}>{`${
            this.props.currency[0]
          }${totalPrice.toFixed(2)}`}</span>
        </div>

        <div>
          <button
            onClick={this.orderProductsHandler}
            className={classes["order-btn"]}
          >
            ORDER
          </button>
        </div>

        <footer></footer>
      </div>
    ) : (
      <div className={classes["order-successful"]}>
        Thank you for your order!
        <br />
        <br /> We hope you enjoy your new products. Have a great day :-)
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CartList);
