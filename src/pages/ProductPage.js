import { Component } from "react";
import classes from "./ProductPage.module.css";
import clothesImage from "../assets/example-product.png";
import Attributes from "../components/Attributes/Attributes";

const EXAMPLE_PRODUCTS = [
  {
    id: 1,
    images: [clothesImage, clothesImage, clothesImage],
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
  },
];

class ProductPage extends Component {
  render() {
    return (
      <div className={classes["product-page"]}>
        <div className={classes["product-photos"]}>
          {EXAMPLE_PRODUCTS[0].images.map((image) => {
            return <img src={image} alt="clothes" />;
          })}
        </div>
        <div className={classes["main-product-photo"]}>
          {<img src={EXAMPLE_PRODUCTS[0].images[0]} alt="clothes" />}
        </div>
        <div className={classes["product-information"]}>
          <h1>{EXAMPLE_PRODUCTS[0].brand}</h1>
          <h2>{EXAMPLE_PRODUCTS[0].title}</h2>

          {Object.keys(EXAMPLE_PRODUCTS[0].attributes).map((key) => {
            return (
              <Attributes
                attribute-name={key}
                attributes={EXAMPLE_PRODUCTS[0].attributes[key]}
              ></Attributes>
            );
          })}

          <div>
            <div className={classes["price-label"]}>PRICE:</div>
            <div className={classes.price}>
              ${EXAMPLE_PRODUCTS[0].price.toFixed(2)}
            </div>
          </div>

          <div>
            <button className={classes["add-cart-btn"]}>ADD TO CART</button>
          </div>

          <div className={classes.description}>
            {EXAMPLE_PRODUCTS[0].description}
          </div>
        </div>
      </div>
    );
  }
}

export default ProductPage;
