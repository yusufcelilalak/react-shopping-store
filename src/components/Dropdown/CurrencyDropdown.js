import { Component } from "react";
import classes from "./CurrencyDropdown.module.css";
import { currencyActions } from "../../store/currency-slice";

import { connect } from "react-redux";

class CurrencyDropdown extends Component {
  currencyChangeHandler = (event) => {
    const currency = event.target.innerHTML.split(" ");
    this.props.changeCurrency(currency);
    this.props.onCloseDropdown();
  };

  render() {
    return (
      <div className={classes["currency-dropdown"]}>
        {this.props.currencies.map((currency) => {
          return (
            <button
              onClick={this.currencyChangeHandler}
              key={currency.symbol}
              className={classes["currency"]}
            >{`${currency.symbol} ${currency.label}`}</button>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.products.currencies,
});

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrency: (currency) =>
      dispatch(currencyActions.changeCurreny(currency)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyDropdown);
