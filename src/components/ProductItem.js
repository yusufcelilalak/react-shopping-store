import { Component } from "react";
import Card from "./Card";
import classes from "./ProductItem.module.css";
import addCart from "../assets/add-cart.svg";
import { Link } from "react-router-dom";

class ProductItem extends Component {
  constructor() {
    super();
    this.state = {
      isOver: false,
    };
  }

  productMouseOverHandler = () => {
    this.setState({ isOver: true });
  };

  productMouseOutHandler = () => {
    this.setState({ isOver: false });
  };

  render() {
    return (
      <li className={classes["list-item"]}>
        <Card
          onMouseOver={this.productMouseOverHandler}
          onMouseOut={this.productMouseOutHandler}
          className={classes["product-item"]}
        >
          <div className={classes["product-image-field"]}>
            <Link to={"/products/" + this.props.id}>
              <img
                className={classes["product-image"]}
                src={this.props.image}
                alt={this.props.title}
              />
            </Link>

            {this.state.isOver && (
              <button
                onClick={() => console.log("Add Cart Button Clicked!")}
                className={classes["add-cart-btn"]}
              >
                <img src={addCart} alt="empty-cart" />
              </button>
            )}
          </div>
          <h3>{this.props.title}</h3>
          <h4>{this.props.price}</h4>
        </Card>
      </li>
    );
  }
}

export default ProductItem;
