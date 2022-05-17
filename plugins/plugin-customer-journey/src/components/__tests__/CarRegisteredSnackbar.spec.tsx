import React from "react";
import { create } from "react-test-renderer";
import { mount } from "enzyme";
import { CarRegisteredSnackbar } from "../CarRegisteredSnackbar/CarRegisteredSnackbar";
import { CarRegisteredSnackbarProps } from "../CarRegisteredSnackbar/CarRegisteredSnackbar.Props";

const props: CarRegisteredSnackbarProps = {
  is247Cars: true,
};

describe("CarRegisteredSnackbar", () => {
  it("renders correctly on load", () => {
    const wrapper = create(<CarRegisteredSnackbar {...props} />).toJSON();

    expect(wrapper).toMatchSnapshot();
  });

  it("when value of is247Cars prop is true, should render warning message accordingly", () => {
    const wrapper = mount(<CarRegisteredSnackbar {...props} />);

    expect(wrapper.html()).toContain(
      "Great news! This car is on our car search with one of our approved dealers!"
    );
  });

  it("when value of is247Cars prop is false, should render warning message accordingly", () => {
    props.is247Cars = false;
    const wrapper = mount(<CarRegisteredSnackbar {...props} />);

    expect(wrapper.html()).toContain("This car isn't in our car search.");
  });
});
