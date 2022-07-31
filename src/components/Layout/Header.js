import { Component } from "react";
import { NavLink } from "react-router-dom";
import classes from "./Header.module.css";
import logoURL from "../../assets/a-logo.svg";
import downArrow from "../../assets/down-arrow.svg";
import emptyCart from "../../assets/empty-cart.svg";

class Header extends Component {
  render() {
    return (
      <header className={classes.navbar}>
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
          <button className={classes.cart}>
            <img src={emptyCart} alt="empty-cart" />
            <div className={classes["cart-count"]}>3</div>
          </button>
        </div>
      </header>
    );
  }
}

export default Header;
