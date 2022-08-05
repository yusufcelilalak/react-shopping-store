import { Component } from "react";
import classes from "./CurrencyDropdown.module.css";

const CURRENCIES = ["$ USD", "€ EUR", "¥ JPY"];

class CurrencyDropdown extends Component {
  render() {
    return (
      <div className={classes["currency-dropdown"]}>
        {CURRENCIES.map((currency) => {
          return <button className={classes["currency"]}>{currency}</button>;
        })}
      </div>
    );
  }
}

export default CurrencyDropdown;
