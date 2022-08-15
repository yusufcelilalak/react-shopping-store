import { Component } from "react";
import classes from "./ProductList.module.css";
//import exampleProduct from "../assets/example-product.png";
import ProductItem from "../components/ProductItem";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

class ProductList extends Component {
  render() {
    // the first item is "all" in the given database
    const categoryListFirstItem =
      this.props.categories[0] !== undefined
        ? this.props.categories[0].name
        : "";

    const category =
      this.props.params.category === undefined
        ? categoryListFirstItem
        : this.props.params.category;

    const filteredProducts =
      category === categoryListFirstItem
        ? this.props.products
        : this.props.products.filter((product) => {
            return product.category === category;
          });

    //console.log(this.props.currency);

    return (
      <div className={classes["product-list"]}>
        <div className={classes["category-name"]}>
          <h1>
            {category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
          </h1>
        </div>
        <div>
          <ul className={classes["product-items"]}>
            {filteredProducts.map((product) => {
              const price = product.prices.find(
                (price) => price.currency.symbol === this.props.currency[0]
              );

              //console.log(product);

              return (
                <ProductItem
                  key={product.id}
                  id={product.id}
                  image={product.gallery[0]}
                  title={product.brand + " " + product.name}
                  price={`${this.props.currency[0]}${
                    price !== undefined ? price.amount : ""
                  }`}
                  inStock={product.inStock}
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

const withRouter = (Component) => {
  return (props) => <Component {...props} params={useParams()} />;
};

const mapStateToProps = (state) => ({
  products: state.products.productList,
  categories: state.products.categories,
  currency: state.currency.choosenCurrency,
});

export default withRouter(connect(mapStateToProps, null)(ProductList));
