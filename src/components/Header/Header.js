import { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div>
        <div>
          <Link to="/">Home </Link>
        </div>
        <div>
          <Link to="/product-page">Product </Link>
        </div>
        <div>
          <Link to="/cart-list">Cart </Link>
        </div>
      </div>
    );
  }
}

export default Header;
