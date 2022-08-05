import { Component } from "react";
import { NavLink } from "react-router-dom";
import classes from "./Header.module.css";
import logoURL from "../../assets/a-logo.svg";
import downArrow from "../../assets/down-arrow.svg";
import emptyCart from "../../assets/empty-cart.svg";
import CartDropdown from "../Dropdown/CartDropdown";
import CurrencyDropdown from "../Dropdown/CurrencyDropdown";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartButtonClicked: null,
      currencyButtonClicked: null,
    };
  }

  mouseLeaveHandler = () => {
    this.setState({ cartButtonClicked: null, currencyButtonClicked: null });
  };

  render() {
    return (
      <header>
        <div onMouseLeave={this.mouseLeaveHandler} className={classes.navbar}>
          <nav className={classes["nav-links"]}>
            <ul>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                  to="/"
                >
                  WOMEN
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                  to="/product-page"
                >
                  MEN
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                  activeClassName={classes.active}
                  to="/cart-list"
                >
                  KIDS
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className={classes.logo}>
            <img src={logoURL} alt="brand-logo" />
          </div>
          <div className={classes.actions}>
            <div className={classes["currency-dropdown"]}>
              <button
                onClick={() =>
                  this.setState({
                    currencyButtonClicked: 1,
                    cartButtonClicked: null,
                  })
                }
                className={classes.currency}
              >
                <span>$</span>
                <img src={downArrow} alt="down-arrow" />
              </button>
              {this.state.currencyButtonClicked && <CurrencyDropdown />}
            </div>

            <div className={classes["cart-dropdown"]}>
              <button
                onClick={() =>
                  this.setState({
                    cartButtonClicked: 1,
                    currencyButtonClicked: null,
                  })
                }
                className={classes["cart-btn"]}
              >
                <img src={emptyCart} alt="empty-cart" />
                <div className={classes["cart-count"]}>3</div>
              </button>

              {this.state.cartButtonClicked && (
                <CartDropdown
                  onMouseLeave={this.mouseLeaveHandler}
                  className={classes["cart-dropdown-menu"]}
                />
              )}
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
