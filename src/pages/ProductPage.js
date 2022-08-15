import { Component } from "react";
import classes from "./ProductPage.module.css";
import Attributes from "../components/Attributes/Attributes";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import parse from "html-react-parser";
import { cartActions } from "../store/cart-slice";
import { productsActions } from "../store/products-slice";

class ProductPage extends Component {
  constructor() {
    super();
    this.state = {
      selectedImage: undefined,
      inputKeys: 0,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    this.props.setDefaultProduct(this.props.params.id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.defaultSelectedProduct !== this.props.defaultSelectedProduct
    ) {
      const product = this.props.defaultSelectedProduct;
      this.props.setSelectedItem(product);
    }
  }

  imageClickHandler = (event) => {
    console.log(event.target.src);
    this.setState({ selectedImage: event.target.src });
  };

  addToCartHandler = (product) => {
    this.props.addProductToCart();
    this.setState({ inputKeys: this.state.inputKeys + 1 });
    this.props.setDefaultProduct(this.props.params.id);
  };

  render() {
    const product = this.props.products.find(
      (product) => product.id === this.props.params.id
    );

    const price = product.prices.find(
      (price) => price.currency.symbol === this.props.currency[0]
    );

    /*console.log(product);
    console.log(product.attributes.map((attribute) => attribute.id));
    console.log(product.gallery[0]);
    console.log(product.description);
    */

    return (
      <div className={classes["product-page"]}>
        <div className={classes["product-photos"]}>
          {product.gallery.map((image) => {
            return (
              <img
                onClick={this.imageClickHandler}
                key={image}
                src={image}
                alt="clothes"
              />
            );
          })}
        </div>
        <div className={classes["main-product-photo"]}>
          {
            <img
              src={this.state.selectedImage || product.gallery[0]}
              alt="clothes"
            />
          }
        </div>
        <div className={classes["product-information"]}>
          <h1>{product.brand}</h1>
          <h2>{product.name}</h2>
          {product.attributes.map((attribute) => {
            return (
              <Attributes
                key={attribute.id + this.state.inputKeys}
                type="product-page"
                attribute-name={attribute.id}
                attributes={attribute.items}
              ></Attributes>
            );
          })}
          <div>
            <div className={classes["price-label"]}>PRICE:</div>
            <div className={classes.price}>
              {`${this.props.currency[0]}${
                price !== undefined ? price.amount : ""
              }`}
            </div>
          </div>
          <div>
            <button
              onClick={() => this.addToCartHandler(product)}
              className={classes["add-cart-btn"]}
            >
              ADD TO CART
            </button>
          </div>

          <div className={classes.description}>
            {parse(product.description)}
          </div>
        </div>
      </div>
    );
  }
}

const withRouter = (Component) => {
  return (props) => <Component {...props} params={useParams()} />;
};

const mapStateToProps = (state) => ({
  products: state.products.productList,
  currency: state.currency.choosenCurrency,
  selectedItem: state.cart.selectedItem,
  defaultSelectedProduct: state.products.defaultSelectedProduct,
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductPage)
);
