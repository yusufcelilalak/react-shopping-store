import { Component } from "react";
import { Routes, Route } from "react-router-dom";
import CartList from "./pages/CartList/CartList";
import ProductList from "./pages/ProductList/ProductList";
import ProductPage from "./pages/ProductPage/ProductPage";
import Header from "./components/Header/Header";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product-page" element={<ProductPage />} />
          <Route path="/cart-list" element={<CartList />} />
        </Routes>
      </div>
    );
  }
}

export default App;
