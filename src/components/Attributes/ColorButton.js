import { Component, Fragment } from "react";
import { connect } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import classes from "./ColorButton.module.css";

class ColorButton extends Component {
  attributeChangeHandler = (event) => {
    const product = { ...this.props.selectedItem };
    const attributeName = event.target.name;
    const attributeValue = event.target.id.replace(
      `-${this.props["attribute-name"]}-${this.props.id}`,
      ""
    );

    console.log(attributeValue);

    const attributeObject = { ...product.selectedAttributes };
    attributeObject[attributeName] = attributeValue;

    const updatedItem = { ...product, selectedAttributes: attributeObject };

    console.log(updatedItem);

    this.props.setSelectedItem(updatedItem);
  };

  render() {
    const isSelected =
      this.props.selected !== false
        ? { defaultChecked: this.props.selected }
        : {};

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
