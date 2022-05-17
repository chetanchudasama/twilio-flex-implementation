/* eslint-disable react/jsx-props-no-spreading */
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";

import React from "react";
import { create } from "react-test-renderer";
import flushPromises from "flush-promises";
import { mount } from "enzyme";
import {
  WizardStepWrapper,
  WizardStepWrapperProps,
} from "../WizardStepWrapper/WizardStepWrapper";

const core: WizardStepWrapperProps = {
  onNext: jest.fn(),
  onPrevious: jest.fn(),
  nextStep: "Next Step",
  previousStep: "Previous Step",
};
let props: WizardStepWrapperProps = { ...core };

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

describe("WizardStepWrapper", () => {
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
        <WizardStepWrapper {...props} />
      </MuiThemeProvider>
    ).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it("when previous button is disabled, it should render correctly", () => {
    props.disablePrevious = true;
    const wrapper = create(
      <MuiThemeProvider theme={theme}>
        <WizardStepWrapper {...props} />
      </MuiThemeProvider>
    ).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it("when next button is disabled, it should render correctly", () => {
    props.disableNext = true;
    const wrapper = create(
      <MuiThemeProvider theme={theme}>
        <WizardStepWrapper {...props} />
      </MuiThemeProvider>
    ).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it("when action is set hidden, it should render correctly", () => {
    props.hideActions = true;
    const wrapper = create(
      <MuiThemeProvider theme={theme}>
        <WizardStepWrapper {...props} />
      </MuiThemeProvider>
    ).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it("when disable previous prop passed as true, previous button should be disabled", async () => {
    props.disablePrevious = true;
    const wrapper = mount(
      <MuiThemeProvider theme={theme}>
        <WizardStepWrapper
          {...props}
          classes={{ previousButton: "previous-btn" }}
        />
      </MuiThemeProvider>
    );
    await flushPromises();

    const previousButton = wrapper.find(".previous-btn");
    expect(previousButton.exists()).toBeTruthy();
    expect(previousButton.last().getElement().props.disabled).toBeTruthy();
  });

  it("when disable next props passed as true, next button should be disabled", async () => {
    props.disableNext = true;
    const wrapper = mount(
      <MuiThemeProvider theme={theme}>
        <WizardStepWrapper {...props} classes={{ nextButton: "next-btn" }} />
      </MuiThemeProvider>
    );
    await flushPromises();

    const nextButton = wrapper.find(".next-btn");
    expect(nextButton.exists()).toBeTruthy();
    expect(nextButton.last().getElement().props.disabled).toBeTruthy();
  });

  it("when component is an intermediate step, next and previous buttons should not be disabled", async () => {
    const wrapper = mount(
      <MuiThemeProvider theme={theme}>
        <WizardStepWrapper
          {...props}
          classes={{ nextButton: "next-btn", previousButton: "previous-btn" }}
        />
      </MuiThemeProvider>
    );
    await flushPromises();

    const nextButton = wrapper.find(".next-btn");
    const previousButton = wrapper.find(".previous-btn");

    expect(nextButton.exists()).toBeTruthy();
    expect(previousButton.exists()).toBeTruthy();
    expect(nextButton.last().getElement().props.disabled).toBeFalsy();
    expect(previousButton.last().getElement().props.disabled).toBeFalsy();
  });

  it("when action is set hidden, next and previous buttons should not be visible", async () => {
    props.hideActions = true;
    const wrapper = mount(
      <MuiThemeProvider theme={theme}>
        <WizardStepWrapper
          {...props}
          classes={{ nextButton: "next-btn", previousButton: "previous-btn" }}
        />
      </MuiThemeProvider>
    );
    await flushPromises();

    const nextButton = wrapper.find(".next-btn");
    const previousButton = wrapper.find(".previous-btn");

    expect(nextButton.exists()).toBeFalsy();
    expect(previousButton.exists()).toBeFalsy();
  });

  describe("Next button functionality test", () => {
    it("should call injected onNext event, if not disabled", async () => {
      const onNext = jest.fn();
      props.onNext = onNext;

      const wrapper = mount(
        <MuiThemeProvider theme={theme}>
          <WizardStepWrapper {...props} classes={{ nextButton: "next-btn" }} />
        </MuiThemeProvider>
      );
      await flushPromises();
      const button = wrapper.find(".next-btn").last();
      button.simulate("click");
      await flushPromises();

      expect(onNext).toHaveBeenCalled();
    });

    it("does not call injected onNext method, if disabled", async () => {
      const onNext = jest.fn();
      props.onNext = onNext;
      props.disableNext = true;

      const wrapper = mount(
        <MuiThemeProvider theme={theme}>
          <WizardStepWrapper {...props} classes={{ nextButton: "next-btn" }} />
        </MuiThemeProvider>
      );
      await flushPromises();
      const button = wrapper.find(".next-btn").last();
      button.simulate("click");
      await flushPromises();

      expect(onNext).toHaveBeenCalledTimes(0);
    });
  });

  describe("Previous button functionality test", () => {
    it("should call injected onPrevious event, if not disabled", async () => {
      const onPrevious = jest.fn();
      props.onPrevious = onPrevious;

      const wrapper = mount(
        <MuiThemeProvider theme={theme}>
          <WizardStepWrapper
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

    it("does not call injected onPrevious method, if disabled", async () => {
      const onPrevious = jest.fn();
      props.onPrevious = onPrevious;
      props.disablePrevious = true;

      const wrapper = mount(
        <MuiThemeProvider theme={theme}>
          <WizardStepWrapper
            {...props}
            classes={{ previousButton: "previous-btn" }}
          />
        </MuiThemeProvider>
      );
      await flushPromises();

      const button = wrapper.find(".previous-btn").last();
      button.simulate("click");
      await flushPromises();

      expect(onPrevious).toHaveBeenCalledTimes(0);
    });
  });
});
