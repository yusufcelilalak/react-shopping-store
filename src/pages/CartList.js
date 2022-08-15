import { Component } from "react";
import classes from "./CartList.module.css";
import CartItem from "../components/CartItem";
import { connect } from "react-redux";

/*
const EXAMPLE_PRODUCTS = [
  {
    id: 1,
    images: productImage,
    brand: "Apollo",
    title: "Running Short",
    price: 50.0,
    attributes: {
      SIZE: ["XS", "S", "M", "L"],
      COLOR: ["#D3D2D5", "#2B2B2B", "#0F6450"],
    },
    description: `Find stunning women's cocktail dresses and party dresses. Stand out
    in lace and metallic cocktail dresses and party dresses from all
    your favorite brands.`,
    quantity: 1,
  },
  {
    id: 2,
    images: productImage,
    brand: "Jupiter",
    title: "Wayferer",
    price: 75.0,
    attributes: {
      SIZE: ["S", "M"],
      COLOR: ["#1D1F22", "#15A4C3", "#EA8120"],
    },
    description: `Find stunning women's cocktail dresses and party dresses. Stand out
    in lace and metallic cocktail dresses and party dresses from all
    your favorite brands.`,
    quantity: 2,
  },
  {
    id: 3,
    images: productImage,
    brand: "Jupiter",
    title: "Wayferer",
    price: 75.0,
    attributes: {
      SIZE: ["S", "M"],
      COLOR: ["#1D1F22", "#15A4C3", "#EA8120"],
    },
    description: `Find stunning women's cocktail dresses and party dresses. Stand out
    in lace and metallic cocktail dresses and party dresses from all
    your favorite brands.`,
    quantity: 3,
  },
];*/

class CartList extends Component {
  render() {
    const cart = this.props.cart;
    const cartList = this.props.cart.productList;
    const totalPrice = cartList.reduce((prev, curr) => {
      const currPrice = curr.prices.find(
        (price) => price.currency.symbol === this.props.currency[0]
      );
      return prev + currPrice.amount * curr.quantity;
    }, 0);

    return (
      <div className={classes["cart-list"]}>
        <h1>CART</h1>
        {cartList.map((product) => {
          return (
            <CartItem key={product.orderNumber} type="cart" product={product} />
          );
        })}

        <div className={classes["payment-information"]}>
          <span>Tax 21%:</span>
          <span className={classes["bold-info"]}>{`${this.props.currency[0]}${
            totalPrice * 0.21
          }`}</span>

          <span>Quantity:</span>
          <span className={classes["bold-info"]}>{cart.totalQuantity}</span>

          <span>Total:</span>
          <span
            className={classes["bold-info"]}
          >{`${this.props.currency[0]}${totalPrice}`}</span>
        </div>

        <div>
          <button className={classes["order-btn"]}>ORDER</button>
        </div>

        <footer></footer>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
  currency: state.currency.choosenCurrency,
});

export default connect(mapStateToProps, null)(CartList);
