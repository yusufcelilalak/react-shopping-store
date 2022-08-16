import { Component } from "react";
import classes from "./ProductList.module.css";
//import exampleProduct from "../assets/example-product.png";
import ProductItem from "../components/ProductItem";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

class ProductList extends Component {
  render() {
    // the first category is in the given database
    const categoryListFirstItem =
      this.props.categories[0] !== undefined
        ? this.props.categories[0].name
        : "";

    // if the current link directory is empty, set category as first category, otherwise set category as link's directory
    const category =
      this.props.params.category === undefined
        ? categoryListFirstItem
        : this.props.params.category;

    // in the given database first category includes all items. do filter for other categories
    const filteredProducts =
      category === categoryListFirstItem
        ? this.props.products
        : this.props.products.filter((product) => {
            return product.category === category;
          });

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
        <footer></footer>
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
