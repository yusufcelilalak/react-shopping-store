import { Component } from "react";
import { Routes, Route } from "react-router-dom";
import CartList from "./pages/CartList";
import ProductList from "./pages/ProductList";
import ProductPage from "./pages/ProductPage";
import Header from "./components/Layout/Header";

import { client } from "./index";
import {
  GET_CURRENCIES,
  LOAD_PRODUCTS,
  GET_CATEGORIES,
} from "./graphql/Queries";

import { connect } from "react-redux";
import { productsActions } from "./store/products-slice";
import { currencyActions } from "./store/currency-slice";

class App extends Component {
  componentDidMount() {
    client
      .query({
        query: LOAD_PRODUCTS,
      })
      .then((response) => {
        this.props.fillProductList(response.data.category.products);
      });

    client
      .query({
        query: GET_CATEGORIES,
      })
      .then((response) => {
        this.props.getCategories(response.data.categories);
      });

    client
      .query({
        query: GET_CURRENCIES,
      })
      .then((response) => {
        this.props.changeCurrency([
          response.data.currencies[0].symbol,
          response.data.currencies[0].label,
        ]);
        this.props.getCurrencies(response.data.currencies);
      });
  }

  render() {
    return (
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/:category" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartList />} />
        </Routes>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fillProductList: (products) =>
      dispatch(productsActions.fillProductList(products)),
    getCategories: (categories) =>
      dispatch(productsActions.getCategories(categories)),
    getCurrencies: (currencies) =>
      dispatch(productsActions.getCurrencies(currencies)),
    changeCurrency: (currency) =>
      dispatch(currencyActions.changeCurreny(currency)),
  };
};

export default connect(null, mapDispatchToProps)(App);
