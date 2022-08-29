import { Component } from "react";
import classes from "./ProductList.module.css";
//import exampleProduct from "../assets/example-product.png";
import ProductItem from "../components/ProductItem";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { GET_PRODUCTS_BY_CATEGORY } from "../graphql/Queries";
import { client } from "..";
import { productsActions } from "../store/products-slice";

class ProductList extends Component {
  // function to get products by category and store in redux
  queryProductList = () => {
    const category = this.props.params.category;

    client
      .query({
        query: GET_PRODUCTS_BY_CATEGORY,
        variables: {
          title: category,
        },
        fetchPolicy: "no-cache",
      })
      .then((response) => {
        this.props.fillProductList(response.data.category.products);
      });
  };

  componentDidMount() {
    this.queryProductList();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.params.category !== this.props.params.category) {
      this.queryProductList();
    }
  }

  render() {
    const category = this.props.params.category;
    const filteredProducts = this.props.products;

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

const mapDispatchToProps = (dispatch) => {
  return {
    fillProductList: (products) =>
      dispatch(productsActions.fillProductList(products)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductList)
);
