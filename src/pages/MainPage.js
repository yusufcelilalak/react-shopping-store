import { Component } from "react";
import logoURL from "../assets/a-logo.svg";
import classes from "./MainPage.module.css";

class MainPage extends Component {
  render() {
    return (
      <div className={classes["introduction-field"]}>
        <div>
          <h2>Welcome to our online shopping store!</h2>
          <p>
            Here you can view all of our products and buy what you want. We hope
            you will enjoy shopping with us :-)
          </p>
        </div>
        <div>
          <img src={logoURL} alt="brand-logo" />
        </div>
      </div>
    );
  }
}

export default MainPage;
