import { Component } from "react";
import { Routes, Route } from "react-router-dom";
import CartList from "./pages/CartList";
import ProductList from "./pages/ProductList";
import ProductPage from "./pages/ProductPage";
import Header from "./components/Layout/Header";

import {} from "./graphql/Queries";

import MainPage from "./pages/MainPage";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/:category" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartList />} />
        </Routes>
      </div>
    );
  }
}

export default App;
