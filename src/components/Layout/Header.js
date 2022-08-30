import { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import classes from "./Header.module.css";
import logoURL from "../../assets/a-logo.svg";
import downArrow from "../../assets/down-arrow.svg";
import emptyCart from "../../assets/empty-cart.svg";
import CartDropdown from "../Dropdown/CartDropdown";
import CurrencyDropdown from "../Dropdown/CurrencyDropdown";
import { connect } from "react-redux";
import OutsideAlerter from "../OutsideAlerter";
import { client } from "../..";
import { GET_CATEGORIES, GET_CURRENCIES } from "../../graphql/Queries";
import { productsActions } from "../../store/products-slice";
import { currencyActions } from "../../store/currency-slice";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartButtonClicked: null,
      currencyButtonClicked: null,
    };
  }

  componentDidMount() {
    // get categories from graphql endpoint and store them in redux
    client
      .query({
        query: GET_CATEGORIES,
      })
      .then((response) => {
        this.props.getCategories(response.data.categories);
      });

    //  get currencies from graphql endpoint and store them in redux
    client
      .query({
        query: GET_CURRENCIES,
      })
      .then((response) => {
        // check if there is currency data in redux store which comes from local storage
        if (this.props.currency.length === 0) {
          this.props.changeCurrency([
            response.data.currencies[0].symbol,
            response.data.currencies[0].label,
          ]);
        }

        this.props.getCurrencies(response.data.currencies);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    // prevent scrolling if cart dropdown is open
    if (prevState.cartButtonClicked !== this.state.cartButtonClicked) {
      if (this.state.cartButtonClicked === 1) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }
    }
  }

  closeDropdownHandler = () => {
    this.setState({ cartButtonClicked: null, currencyButtonClicked: null });
  };

  render() {
    return (
      <header>
        <div className={classes.navbar}>
          <nav className={classes["nav-links"]}>
            <ul>
              {this.props.categories.map((category) => {
                return (
                  <li key={category.name}>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? classes.active : undefined
                      }
                      to={`/${category.name}`}
                    >
                      {category.name.toUpperCase()}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className={classes.logo}>
            <Link to="/">
              <img src={logoURL} alt="brand-logo" />
            </Link>
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
                <span>{this.props.currency[0]}</span>
                <img src={downArrow} alt="down-arrow" />
              </button>
              {this.state.currencyButtonClicked && (
                <OutsideAlerter onOutsideClick={this.closeDropdownHandler}>
                  <CurrencyDropdown
                    onCloseDropdown={this.closeDropdownHandler}
                  />
                </OutsideAlerter>
              )}
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

                {+this.props.cart.totalQuantity !== 0 && (
                  <div className={classes["cart-count"]}>
                    {this.props.cart.totalQuantity}
                  </div>
                )}
              </button>

              {this.state.cartButtonClicked && (
                <OutsideAlerter onOutsideClick={this.closeDropdownHandler}>
                  <CartDropdown
                    onCloseDropdown={this.closeDropdownHandler}
                    className={classes["cart-dropdown-menu"]}
                  />
                </OutsideAlerter>
              )}
            </div>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.products.categories,
  currency: state.currency.choosenCurrency,
  cart: state.cart,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getCategories: (categories) =>
      dispatch(productsActions.getCategories(categories)),
    getCurrencies: (currencies) =>
      dispatch(productsActions.getCurrencies(currencies)),
    changeCurrency: (currency) =>
      dispatch(currencyActions.changeCurreny(currency)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
