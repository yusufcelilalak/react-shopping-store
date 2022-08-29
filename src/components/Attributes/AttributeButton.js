import { Component, Fragment } from "react";
import { connect } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import classes from "./AttributeButton.module.css";

class AttributeButton extends Component {
  // set selected item when attribute change
  attributeChangeHandler = (event) => {
    const attributeValue = event.target.id.replace(
      `-${this.props["attribute-name"]}-${this.props.id}`,
      ""
    );

    if (attributeValue !== "+" && attributeValue !== "-") {
      const attributeName = event.target.name;
      const product = { ...this.props.selectedItem };

      const attributeObject = { ...product.selectedAttributes };
      attributeObject[attributeName] = attributeValue;

      const updatedItem = { ...product, selectedAttributes: attributeObject };

      this.props.setSelectedItem(updatedItem);
    }
  };

  // if button is used to increase and decrease quantity, set item quantity
  attributeClickHandler = (event) => {
    const operation = event.target.id[0];
    const [productOrderNumber, operationName] = event.target.id
      .slice(2)
      .split("-");

    if (operation === "+" && operationName === "plus") {
      this.props.increaseProductQuantity(productOrderNumber);
    }

    if (operation === "-" && operationName === "minus") {
      this.props.removeProductFromCart(productOrderNumber);
    }
  };

  render() {
    // if the attribute is selected, make radio button checked
    const isSelected =
      this.props.selected !== false
        ? { defaultChecked: this.props.selected }
        : {};

    // if attribute button isn't in product page, don't allow changes by user. (can't change attributes in cart)
    const isProductPage =
      this.props.type === "product-page" ||
      this.props.attribute === "+" ||
      this.props.attribute === "-"
        ? {}
        : { disabled: 1 };

    // different class for increase button
    const increaseOperationButton =
      this.props.attribute === "+" ? "increase-button" : "";

    // different class for decrease button
    const decreaseOperationButton =
      this.props.attribute === "-" ? "decrease-button" : "";

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
        <label
          className={`${classes["attribute-label"]} ${
            classes[this.props.type]
          } ${this.props.selected === true && classes["checked-label"]} ${
            classes[increaseOperationButton]
          } ${classes[decreaseOperationButton]}`}
          htmlFor={`${this.props.attribute}-${this.props["attribute-name"]}-${this.props.id}`}
        >
          {this.props.attribute}
        </label>
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
