import { Component, Fragment } from "react";
import CartItem from "../CartItem";
import classes from "./CartDropdown.module.css";
import productImage from "../../assets/example-product.png";

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
    quantity: 2,
  },
];

class CartDropdown extends Component {
  render() {
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
            My Bag,{" "}
            <span>
              {EXAMPLE_PRODUCTS.map((product) => product.quantity).reduce(
                (a, b) => a + b
              )}{" "}
              items
            </span>
          </div>
          {EXAMPLE_PRODUCTS.map((product) => {
            return <CartItem type="dropdown" product={product} />;
          })}

          <div className={classes["total-price"]}>
            <span>Total</span>
            <span>
              $
              {EXAMPLE_PRODUCTS.map(
                (product) => product.price * product.quantity
              )
                .reduce((a, b) => a + b)
                .toFixed(2)}
            </span>
          </div>

          <div className={classes["control-buttons"]}>
            <button className={classes["view-bag-btn"]}>VIEW BAG</button>
            <button className={classes["check-out-btn"]}>CHECK OUT</button>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default CartDropdown;
