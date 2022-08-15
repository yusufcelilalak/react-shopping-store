import { Component } from "react";
import Card from "./Card";
import classes from "./ProductItem.module.css";
import addCart from "../assets/add-cart.svg";
import { Link } from "react-router-dom";
import { productsActions } from "../store/products-slice";
import { connect } from "react-redux";
import { cartActions } from "../store/cart-slice";

class ProductItem extends Component {
  constructor() {
    super();
    this.state = {
      isOver: false,
      defaultProduct: {},
    };
  }

  productMouseOverHandler = () => {
    this.setState({ isOver: true });
  };

  productMouseOutHandler = () => {
    this.setState({ isOver: false });
  };

  componentDidMount() {
    const product = this.props.products.find(
      (product) => product.id === this.props.id
    );

    const attributes = {};

    product.attributes.forEach((attribute) => {
      attributes[`${attribute.id}`] = attribute.items[0].value;
    });

    this.setState({
      defaultProduct: { ...product, selectedAttributes: attributes },
    });
  }

  addtoCartHandler = (event) => {
    //this.props.setDefaultProduct(event.currentTarget.id);
    //const product = this.props.defaultSelectedProduct;

    this.props.setSelectedItem(this.state.defaultProduct);

    this.props.addProductToCart();
  };

  render() {
    const notInStock = this.props.inStock === false ? "not-in-stock" : "";

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
                className={`${classes["product-image"]} ${classes[notInStock]}`}
                src={this.props.image}
                alt={this.props.title}
              />
              <div
                className={classes["not-in-stock-text"]}
                hidden={!notInStock}
              >
                OUT OF STOCK
              </div>
            </Link>

            {this.state.isOver && (
              <button
                id={this.props.id}
                onClick={this.addtoCartHandler}
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

const mapStateToProps = (state) => ({
  products: state.products.productList,
  selectedItem: state.cart.selectedItem,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addProductToCart: () => dispatch(cartActions.addProductToCart()),
    setSelectedItem: (product) =>
      dispatch(cartActions.setSelectedItem(product)),
    setDefaultProduct: (productId) =>
      dispatch(productsActions.setDefaultProduct(productId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);
