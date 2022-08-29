import { Component, Fragment } from "react";
import { connect } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import classes from "./ColorButton.module.css";

// special component designed for the attributes which has type swatch
class ColorButton extends Component {
  // set selected item when attribute change
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

  render() {
    // if the attribute is selected, make radio button checked
    const isSelected =
      this.props.selected !== false
        ? { defaultChecked: this.props.selected }
        : {};

    // if attribute button isn't in product page, don't allow changes by user. (can't change attributes in cart)
    const isProductPage =
      this.props.type === "product-page" ? {} : { disabled: 1 };
    return (
      <Fragment>
        <input
          className={classes["color-button"]}
          type="radio"
          id={`${this.props.color}-${this.props["attribute-name"]}-${this.props.id}`}
          name={this.props["attribute-name"]}
          onChange={this.attributeChangeHandler}
          {...isSelected}
          {...isProductPage}
        />
        <label
          style={{ backgroundColor: this.props.color }}
          className={`${classes["color-label"]} ${classes[this.props.type]} ${
            this.props.selected === true && classes["checked-label"]
          }`}
          htmlFor={`${this.props.color}-${this.props["attribute-name"]}-${this.props.id}`}
        ></label>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ColorButton);
