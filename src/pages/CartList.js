import { Component } from "react";

import classes from "./CartList.module.css";
import productImage from "../assets/example-product.png";
import CartItem from "../components/CartItem";

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
];

class CartList extends Component {
  render() {
    const totalPrice = EXAMPLE_PRODUCTS.reduce((prev, curr) => {
      return (prev.price * prev.quantity + curr.price * curr.quantity).toFixed(
        2
      );
    });

    const totalQuantity = EXAMPLE_PRODUCTS.reduce((prev, curr) => {
      return prev.quantity + curr.quantity;
    });

    return (
      <div className={classes["cart-list"]}>
        <h1>CART</h1>
        {EXAMPLE_PRODUCTS.map((product) => {
          return <CartItem product={product} />;
        })}

        <div className={classes["payment-information"]}>
          <span>Tax 21%:</span>
          <span className={classes["bold-info"]}>{200 * 0.21}</span>

          <span>Quantity:</span>
          <span className={classes["bold-info"]}>{totalQuantity}</span>

          <span>Total:</span>
          <span className={classes["bold-info"]}>{totalPrice}</span>
        </div>

        <div>
          <button className={classes["order-btn"]}>ORDER</button>
        </div>

        <footer></footer>
      </div>
    );
  }
}

export default CartList;
