/* eslint-disable react/jsx-props-no-spreading */
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { mount } from "enzyme";
import flushPromise from "flush-promises";
import React from "react";
import { create } from "react-test-renderer";
import {
  ThreeStateToggle,
  ThreeStateToggleProps,
} from "../ThreeStateToggle/ThreeStateToggle";

const core: ThreeStateToggleProps = {
  checked: null,
  onChange: () => jest.fn(),
};
let props: ThreeStateToggleProps = { ...core };

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

describe("ThreeStateToggle", () => {
  beforeEach(() => {
    props = { ...core };
  });
  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it("when toggle is initialized with checked state, renders correctly", () => {
    props.checked = true;
    const wrapper = create(
      <MuiThemeProvider theme={theme}>
        <ThreeStateToggle {...props} />
      </MuiThemeProvider>
    ).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it("when toggle is initialized with unchecked state, renders correctly", () => {
    props.checked = false;
    const wrapper = create(
      <MuiThemeProvider theme={theme}>
        <ThreeStateToggle {...props} />
      </MuiThemeProvider>
    ).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
  it("when toggle is initialized with intermediate state, renders correctly", () => {
    props.checked = null;
    const wrapper = create(
      <MuiThemeProvider theme={theme}>
        <ThreeStateToggle {...props} />
      </MuiThemeProvider>
    ).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it("when clicked on left button, change event should be triggered with false flag", async () => {
    const onChange = jest.fn();
    props.onChange = onChange;
    props.checked = null;

    const wrapper = mount(
      <MuiThemeProvider theme={theme}>
        <ThreeStateToggle {...props} />
      </MuiThemeProvider>
    );
    await flushPromise();

    wrapper.find(".btn-no").last().simulate("click");
    await flushPromise();

    expect(onChange).toHaveBeenCalledWith(false);
  });

  it("when clicked on right button, change event should be triggered with true flag", async () => {
    const onChange = jest.fn();
    props.onChange = onChange;
    props.checked = null;

    const wrapper = mount(
      <MuiThemeProvider theme={theme}>
        <ThreeStateToggle {...props} />
      </MuiThemeProvider>
    );
    await flushPromise();

    wrapper.find(".btn-yes").last().simulate("click");
    await flushPromise();

    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("when clicked on default button, change event should be triggered with null flag", async () => {
    const onChange = jest.fn();
    props.onChange = onChange;
    props.checked = true;

    const wrapper = mount(
      <MuiThemeProvider theme={theme}>
        <ThreeStateToggle {...props} />
      </MuiThemeProvider>
    );
    await flushPromise();

    wrapper.find(".btn-intermediate").last().simulate("click");
    await flushPromise();

    expect(onChange).toHaveBeenCalledWith(null);
  });
});
