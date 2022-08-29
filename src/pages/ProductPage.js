import { Component } from "react";
import classes from "./ProductPage.module.css";
import Attributes from "../components/Attributes/Attributes";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import parse from "html-react-parser";
import { cartActions } from "../store/cart-slice";
import { client } from "..";
import { GET_PRODUCT_BY_ID } from "../graphql/Queries";

class ProductPage extends Component {
  constructor() {
    super();
    this.state = {
      selectedImage: undefined, // for displaying selected image in gallery
      isAdded: 0,
      product: {},
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    // get product by param id
    client
      .query({
        query: GET_PRODUCT_BY_ID,
        variables: {
          id: this.props.params.id,
        },
        fetchPolicy: "no-cache",
      })
      .then((response) => {
        this.setState({ product: response.data.product });
        this.props.setSelectedItem(response.data.product);
      });
  }

  // set selected image as main image
  imageClickHandler = (event) => {
    console.log(event.target.src);
    this.setState({ selectedImage: event.target.src });
  };

  addToCartHandler = (product) => {
    const selectedAttributesNumber =
      this.props.selectedItem.selectedAttributes === undefined
        ? 0
        : Object.keys(this.props.selectedItem.selectedAttributes).length;

    //if user selected all attributes, allow adding product to cart
    if (product.attributes.length === selectedAttributesNumber) {
      this.props.addProductToCart();
      this.setState({ isAdded: 1 });
    }
  };

  render() {
    if (this.state.product === null || this.state.product.prices === undefined)
      return null;

    const product = this.state.product;

    const price = product.prices.find(
      (price) => price.currency.symbol === this.props.currency[0]
    );

    const notInStock = product.inStock === false ? "not-in-stock" : "";

    return (
      <div className={classes["product-page"]}>
        <div className={classes["product-photos"]}>
          {product.gallery.map((image) => {
            return (
              <img
                onClick={this.imageClickHandler}
                key={image}
                src={image}
                className={classes[notInStock]}
                alt="clothes"
              />
            );
          })}
        </div>
        <div className={classes["main-product-photo"]}>
          <img
            className={classes[notInStock]}
            src={this.state.selectedImage || product.gallery[0]}
            alt="clothes"
          />
          <div className={classes["not-in-stock-text"]} hidden={!notInStock}>
            OUT OF STOCK
          </div>
        </div>
        <div className={classes["product-information"]}>
          <h1>{product.brand}</h1>
          <h2>{product.name}</h2>
          {product.attributes.map((attribute) => {
            let selectedAttribute = "";
            if (this.state.isAdded === 1)
              selectedAttribute =
                this.props.selectedItem.selectedAttributes[attribute.id];
            return (
              <Attributes
                key={attribute.id}
                type="product-page"
                attribute-name={attribute.id}
                attributes={attribute.items}
                attribute-type={attribute.type}
                selected-attribute={selectedAttribute}
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
          <div className={classes["not-in-stock-info"]}>
            {product.inStock !== false ? (
              <button
                onClick={() => this.addToCartHandler(product)}
                className={classes["add-cart-btn"]}
              >
                ADD TO CART
              </button>
            ) : (
              "Product is not in stock at the moment, please view other products."
            )}
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
});

const mapDispatchToProps = (dispatch) => {
  return {
    addProductToCart: () => dispatch(cartActions.addProductToCart()),
    setSelectedItem: (product) =>
      dispatch(cartActions.setSelectedItem(product)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductPage)
);
