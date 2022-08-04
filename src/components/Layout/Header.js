import { Component } from "react";
import { NavLink } from "react-router-dom";
import classes from "./Header.module.css";
import logoURL from "../../assets/a-logo.svg";
import downArrow from "../../assets/down-arrow.svg";
import emptyCart from "../../assets/empty-cart.svg";
import CartDropdown from "../Dropdown/CartDropdown";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartButtonClicked: null,
    };
  }

  mouseLeaveHandler = () => {
    this.setState({ cartButtonClicked: null });
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
            <button className={classes.currency}>
              <span>$</span>
              <img src={downArrow} alt="down-arrow" />
            </button>
            <div className={classes["cart-dropdown"]}>
              <button
                onClick={() => this.setState({ cartButtonClicked: 1 })}
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
