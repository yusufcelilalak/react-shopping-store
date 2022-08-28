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
      selectedImage: undefined, // for displaying selected image in gallery
      isAdded: 0,
      defaultProduct: {},
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    //this.props.setDefaultProduct(this.props.params.id);
    const product = this.props.products.find(
      (product) => product.id === this.props.params.id
    );

    this.props.setSelectedItem(product);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      JSON.stringify(prevProps.defaultSelectedProduct) !==
      JSON.stringify(this.props.defaultSelectedProduct)
    ) {
      const product = this.props.defaultSelectedProduct;
      this.props.setSelectedItem(product);
      this.setState({ defaultProduct: product });
    }

    if (prevProps.isDataLoaded !== this.props.isDataLoaded) {
      this.props.setDefaultProduct(this.props.params.id);
      //const product = this.props.defaultSelectedProduct;
      //console.log(product);
      //this.props.setSelectedItem(product);
    }
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
    console.log(selectedAttributesNumber);
    if (product.attributes.length === selectedAttributesNumber) {
      this.props.addProductToCart();
      this.setState({ isAdded: 1 });
    }
    //this.props.setSelectedItem(this.state.defaultProduct);
  };

  render() {
    // wait displaying page until data is loaded
    if (this.props.isDataLoaded === false) return null;

    const product = this.props.products.find(
      (product) => product.id === this.props.params.id
    );

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
            //console.log(this.props.selectedItem);
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
  defaultSelectedProduct: state.products.defaultSelectedProduct,
  isDataLoaded: state.products.isDataLoaded,
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
