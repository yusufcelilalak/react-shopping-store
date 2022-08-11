import { Component } from "react";
import classes from "./ProductPage.module.css";
import Attributes from "../components/Attributes/Attributes";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import parse from "html-react-parser";

/*const EXAMPLE_PRODUCTS = [
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
];*/

class ProductPage extends Component {
  constructor() {
    super();
    this.state = {
      selectedImage: undefined,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  imageClickHandler = (event) => {
    console.log(event.target.src);
    this.setState({ selectedImage: event.target.src });
  };

  render() {
    const product = this.props.products.find(
      (product) => product.id === this.props.params.id
    );

    const price = product.prices.find(
      (price) => price.currency.symbol === this.props.currency[0]
    );

    console.log(product);
    console.log(product.attributes.map((attribute) => attribute.id));
    console.log(product.gallery[0]);
    console.log(product.description);

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
                key={attribute.id}
                type="product-page"
                attribute-name={attribute.id}
                attributes={attribute.items}
              ></Attributes>
            );
          })}
          <div>
            <div className={classes["price-label"]}>PRICE:</div>
            <div className={classes.price}>
              {`${this.props.currency[0]} ${
                price !== undefined ? price.amount : ""
              }`}
            </div>
          </div>
          <div>
            <button className={classes["add-cart-btn"]}>ADD TO CART</button>
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
});

export default withRouter(connect(mapStateToProps, null)(ProductPage));
