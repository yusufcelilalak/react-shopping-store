import { Component } from "react";
import classes from "./ProductList.module.css";
import exampleProduct from "../assets/example-product.png";
import ProductItem from "../components/ProductItem";

const EXAMPLE_PRODUCTS = [
  { id: 1, image: exampleProduct, title: "Apollo Running Short", price: 50 },
  { id: 2, image: exampleProduct, title: "Apollo Running Short", price: 30 },
  { id: 3, image: exampleProduct, title: "Apollo Running Short", price: 20 },
  { id: 4, image: exampleProduct, title: "Apollo Running Short", price: 60 },
  { id: 5, image: exampleProduct, title: "Apollo Running Short", price: 23 },
  { id: 6, image: exampleProduct, title: "Apollo Running Short", price: 45 },
];

class ProductList extends Component {
  render() {
    return (
      <div className={classes["product-list"]}>
        <div className={classes["category-name"]}>
          <h1>Category Name</h1>
        </div>
        <div>
          <ul className={classes["product-items"]}>
            {EXAMPLE_PRODUCTS.map((product) => {
              return (
                <ProductItem
                  image={product.image}
                  title={product.title}
                  price={product.price}
                />
              );
            })}
          </ul>
        </div>
        <div className={classes["temp-footer"]}></div>
      </div>
    );
  }
}

export default ProductList;
