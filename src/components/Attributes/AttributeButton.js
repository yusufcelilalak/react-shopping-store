import { Component, Fragment } from "react";
import { connect } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import classes from "./AttributeButton.module.css";

class AttributeButton extends Component {
  attributeChangeHandler = (event) => {
    const product = { ...this.props.selectedItem };
    const attributeName = event.target.name;
    const attributeValue = event.target.id.replace(
      `-${this.props["attribute-name"]}-${this.props.id}`,
      ""
    );

    const attributeObject = { ...product.selectedAttributes };
    attributeObject[attributeName] = attributeValue;

    const updatedItem = { ...product, selectedAttributes: attributeObject };

    this.props.setSelectedItem(updatedItem);
  };

  attributeClickHandler = (event) => {
    const operation = event.target.id[0];
    const [productOrderNumber, operationName] = event.target.id
      .slice(2)
      .split("-");

    console.log(operation, productOrderNumber, operationName);

    if (operation === "+" && operationName === "plus") {
      this.props.increaseProductQuantity(productOrderNumber);
    }

    if (operation === "-" && operationName === "minus") {
      this.props.removeProductFromCart(productOrderNumber);
    }
  };

  render() {
    const style = {
      fontFamily: `'Raleway', sans-serif`,
      fontWeight: 100,
      width: "2.4rem",
      height: "2.2rem",
      fontSize: "2rem",
    };

    const isSelected =
      this.props.selected !== false
        ? { defaultChecked: this.props.selected }
        : {};

    const isProductPage =
      this.props.type === "product-page" ||
      this.props.attribute === "+" ||
      this.props.attribute === "-"
        ? {}
        : { disabled: 1 };

    console.log(
      this.props.selected,
      this.props.id,
      this.props["attribute-name"]
    );

    const inputLabel = (_style) => {
      return (
        <label
          style={_style}
          className={`${classes["attribute-label"]} ${
            classes[this.props.type]
          } ${this.props.selected === true && classes["checked-label"]}`}
          htmlFor={`${this.props.attribute}-${this.props["attribute-name"]}-${this.props.id}`}
        >
          {this.props.attribute}
        </label>
      );
    };

    return (
      <Fragment>
        <input
          className={classes["attribute-button"]}
          type="radio"
          id={`${this.props.attribute}-${this.props["attribute-name"]}-${this.props.id}`}
          name={this.props["attribute-name"]}
          onChange={this.attributeChangeHandler}
          onClick={this.attributeClickHandler}
          {...isSelected}
          {...isProductPage}
        />
        {this.props.attribute === "+"
          ? inputLabel(style)
          : this.props.attribute === "-"
          ? inputLabel({ ...style, paddingBottom: "4px" })
          : inputLabel({})}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedItem: state.cart.selectedItem,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedItem: (product) => {
      dispatch(cartActions.setSelectedItem(product));
    },
    increaseProductQuantity: (orderNumber) => {
      dispatch(cartActions.increaseProductQuantity(orderNumber));
    },
    removeProductFromCart: (orderNumber) => {
      dispatch(cartActions.removeProductFromCart(orderNumber));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AttributeButton);
