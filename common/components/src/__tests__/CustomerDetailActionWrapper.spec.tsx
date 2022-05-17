import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";

import React from "react";
import { create } from "react-test-renderer";
import flushPromises from "flush-promises";
import { mount } from "enzyme";
import {
  CustomerDetailActionWrapper,
  CustomerDetailActionWrapperProps,
} from "../CustomerDetailActionWrapper/CustomerDetailActionWrapper";

const core: CustomerDetailActionWrapperProps = {
  onPrevious: jest.fn(),
  activeStep: "",
};
let props: CustomerDetailActionWrapperProps = { ...core };

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

describe("CustomerDetailActionWrapper", () => {
  beforeEach(() => {
    props = { ...core };
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it("renders correctly", () => {
    const wrapper = create(
      <MuiThemeProvider theme={theme}>
        <CustomerDetailActionWrapper {...props} />
      </MuiThemeProvider>
    ).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  describe("Previous button functionality test", () => {
    it("should render activeStep prop value in button text", async () => {
      const onPrevious = jest.fn();
      props.onPrevious = onPrevious;
      props.activeStep = "Qualify";

      const wrapper = mount(
        <MuiThemeProvider theme={theme}>
          <CustomerDetailActionWrapper
            {...props}
            classes={{ previousButton: "previous-btn" }}
          />
        </MuiThemeProvider>
      );

      const button = wrapper.find(".previous-btn").last();
      expect(button.html()).toContain("Qualify");
    });

    it("should call injected onPrevious event", async () => {
      const onPrevious = jest.fn();
      props.onPrevious = onPrevious;

      const wrapper = mount(
        <MuiThemeProvider theme={theme}>
          <CustomerDetailActionWrapper
            {...props}
            classes={{ previousButton: "previous-btn" }}
          />
        </MuiThemeProvider>
      );
      await flushPromises();

      const button = wrapper.find(".previous-btn").last();
      button.simulate("click");
      await flushPromises();

      expect(onPrevious).toHaveBeenCalled();
    });
  });
});
