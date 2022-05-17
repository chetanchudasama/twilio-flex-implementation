import { mount } from "enzyme";
import flushPromises from "flush-promises";
import React from "react";
import { create } from "react-test-renderer";

import {
  CustomInput,
  PreferredLenderModel,
  Shared,
  CustomSnackbar,
} from "@common/components";
import {
  createMuiTheme,
  ExpansionPanel,
  MuiThemeProvider,
} from "@material-ui/core";
import { Manager } from "@twilio/flex-ui";

import { calculateTotalAmountFromMonthly } from "../../helpers/utility";
import { QualifyDetailModel } from "../../models/QualifyDetailModel";
import { flexManagerMock } from "../__mocks__/MockData";
import QualifyingContent from "../Wizard/QualifyStep/QualifyingContent/QualifyingContent";
import { QualifyingContentProps } from "../Wizard/QualifyStep/QualifyingContent/QualifyingContent.Props";

const core: QualifyingContentProps = {
  qualifyingDetail: new QualifyDetailModel(),
  errors: {},
  updateQualifyingDetails: jest.fn(),
  reasonForPurchaseItems: [],
  timeForPurchaseItems: [],
  whereDidYouHearItems: [],
  setTerm: jest.fn(),
  term: null,
  amountToFinance: 0,
  monthlyBudget: 0,
  monthlyIncome: 0,
};

let props = { ...core };

jest.mock("../../services/application.service");

Manager.getInstance = flexManagerMock;

jest.mock("@common/components", () => {
  const components = jest.requireActual("@common/components");
  return {
    ...components,
    ThreeStateToggle: jest.fn(({ children }) => (
      <div className="Three-State-Toggle-Button">{children}</div>
    )),
  };
});

jest.mock("../../Notifications", () => {
  return {
    CustomNotificationType: { SuccessNotification: "successNotification" },
    showMessage: jest.fn(() => {}),
  };
});

jest.mock("@material-ui/core", () => {
  const materialUI = jest.requireActual("@material-ui/core");
  return {
    ...materialUI,
    FormControlLabel: jest.fn(() => (
      <div className="form-label">Form-Control-Label</div>
    )),
    FormHelperText: jest.fn(({ children }) => <div>{children}</div>),
    Grid: jest.fn(({ children }) => <div>{children}</div>),
    IconButton: jest.fn(({ children }) => <div>{children}</div>),
    InputAdornment: jest.fn(({ children }) => <div>{children}</div>),
    MenuItem: jest.fn(({ children }) => <div>{children}</div>),
    Switch: jest.fn(({ children }) => <div>{children}</div>),
  };
});

jest.mock("../../services/application.service");

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

Manager.getInstance = flexManagerMock;

describe("QualifyingContent", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); // Most important - it clears the cache
    process.env = { ...OLD_ENV }; // Make a copy
    props = { ...core };
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  it("renders correctly", () => {
    const wrapper = create(
      <MuiThemeProvider theme={theme}>
        <QualifyingContent {...props} />
      </MuiThemeProvider>
    ).toJSON();

    expect(wrapper).toMatchSnapshot();
  });

  it("should render three state switch components correctly in UI", () => {
    const wrapper = create(
      <MuiThemeProvider theme={theme}>
        <QualifyingContent {...props} />
      </MuiThemeProvider>
    ).root;
    const threeStateSwitches = wrapper.findAllByProps({
      className: "Three-State-Toggle-Button",
    });

    expect(threeStateSwitches).toHaveLength(5);
  });

  it("should render agent guide for license message, if drivingLicenseConfirmed property is false", async () => {
    props.qualifyingDetail.drivingLicenseConfirmed = false;
    process.env.REACT_APP_AGENT_GUIDE_FOR_LICENSE =
      "REACT_APP_AGENT_GUIDE_FOR_LICENSE message";
    const wrapper = mount(
      <MuiThemeProvider theme={theme}>
        <QualifyingContent {...props} />
      </MuiThemeProvider>
    );
    wrapper.update();
    await flushPromises();

    expect(wrapper.html()).toContain(
      "REACT_APP_AGENT_GUIDE_FOR_LICENSE message"
    );
  });

  it("should render agent guide for address message, if addressConfirmed property is false", async () => {
    props.qualifyingDetail.addressConfirmed = false;
    process.env.REACT_APP_AGENT_GUIDE_FOR_ADDRESS =
      "REACT_APP_AGENT_GUIDE_FOR_ADDRESS message";
    const wrapper = mount(
      <MuiThemeProvider theme={theme}>
        <QualifyingContent {...props} />
      </MuiThemeProvider>
    );
    wrapper.update();
    await flushPromises();

    expect(wrapper.html()).toContain(
      "REACT_APP_AGENT_GUIDE_FOR_ADDRESS message"
    );
  });

  it("should render agent guide for income message, if incomeConfirmed property is false", async () => {
    props.qualifyingDetail.incomeConfirmed = false;
    process.env.REACT_APP_AGENT_GUIDE_FOR_INCOME =
      "REACT_APP_AGENT_GUIDE_FOR_INCOME message";
    const wrapper = mount(
      <MuiThemeProvider theme={theme}>
        <QualifyingContent {...props} />
      </MuiThemeProvider>
    );
    wrapper.update();
    await flushPromises();

    expect(wrapper.html()).toContain(
      "REACT_APP_AGENT_GUIDE_FOR_INCOME message"
    );
  });

  it("should render agent guide for employment message, if placeOfWorkConfirmed property is false", async () => {
    props.qualifyingDetail.placeOfWorkConfirmed = false;
    process.env.REACT_APP_AGENT_GUIDE_FOR_EMPLOYMENT =
      "REACT_APP_AGENT_GUIDE_FOR_EMPLOYMENT message";
    const wrapper = mount(
      <MuiThemeProvider theme={theme}>
        <QualifyingContent {...props} />
      </MuiThemeProvider>
    );
    wrapper.update();
    await flushPromises();

    expect(wrapper.html()).toContain(
      "REACT_APP_AGENT_GUIDE_FOR_EMPLOYMENT message"
    );
  });

  it("should render customer's monthly income correctly in question text", async () => {
    props.monthlyIncome = 3000;
    const wrapper = mount(
      <MuiThemeProvider theme={theme}>
        <QualifyingContent {...props} />
      </MuiThemeProvider>
    );
    await flushPromises();

    expect(wrapper.find(".income-text").last().text()).toContain(
      `Is the customer's monthly net income ${Shared.getFormattedCurrencyValue(
        props.monthlyIncome
      )}?`
    );
  });

  it("should render error message, if calculated loan amount is greater than maxLendAmount", async () => {
    const preferredLender = new PreferredLenderModel();
    preferredLender.apr = 6;
    preferredLender.maxLendAmount = 500;
    props.preferredLender = preferredLender;
    props.term = 48;
    props.monthlyBudget = 150;

    const amountToChange = 200;

    const totalAmount = calculateTotalAmountFromMonthly(
      amountToChange,
      props.term,
      preferredLender.apr
    );

    const wrapper = mount(
      <MuiThemeProvider theme={theme}>
        <QualifyingContent {...props} />
      </MuiThemeProvider>
    );
    wrapper.update();
    await flushPromises();

    expect(wrapper.find(CustomInput).exists()).toBeTruthy();
    wrapper
      .find(".amount-grid")
      .last()
      .find(CustomInput)
      .first()
      .invoke<"onChange">("onChange")({
      target: {
        value: amountToChange.toString(),
      },
    } as React.ChangeEvent<HTMLInputElement>);
    wrapper.update();

    expect(wrapper.html()).toMatchSnapshot();

    const message = `This exceeds customer's maximum borrow amount by ${Shared.getFormattedCurrencyValue(
      totalAmount - preferredLender.maxLendAmount
    )}`;
    expect(wrapper.html()).toContain(message);

    const customSnackbar = wrapper
      .find(".custom-snackbar-container")
      .last()
      .find(CustomSnackbar)
      .last();
    expect(customSnackbar.exists()).toBeTruthy();
    expect(customSnackbar.props().type).toEqual("error");
    expect(customSnackbar.props().message).toEqual(message);
  });

  it("should not render error message, if calculated loan amount is less than maxLendAmount", async () => {
    const preferredLender = new PreferredLenderModel();
    preferredLender.apr = 6;
    preferredLender.maxLendAmount = 2300;
    props.preferredLender = preferredLender;
    props.term = 36;
    props.monthlyBudget = 150;

    const amountToChange = 50;

    const totalAmount = calculateTotalAmountFromMonthly(
      amountToChange,
      props.term,
      preferredLender.apr
    );

    const wrapper = mount(
      <MuiThemeProvider theme={theme}>
        <QualifyingContent {...props} />
      </MuiThemeProvider>
    );
    wrapper.update();
    await flushPromises();

    expect(wrapper.find(CustomInput).exists()).toBeTruthy();
    wrapper
      .find(".amount-grid")
      .last()
      .find(CustomInput)
      .first()
      .invoke<"onChange">("onChange")({
      target: {
        value: amountToChange.toString(),
      },
    } as React.ChangeEvent<HTMLInputElement>);
    wrapper.update();

    expect(wrapper.html()).toMatchSnapshot();

    const message = `This exceeds customer's maximum borrow amount by ${Shared.getFormattedCurrencyValue(
      totalAmount - preferredLender.maxLendAmount
    )}`;
    expect(wrapper.html()).not.toContain(message);

    const customSnackbar = wrapper
      .find(".custom-snackbar-container")
      .last()
      .find(CustomSnackbar)
      .last();
    expect(customSnackbar.exists()).toBeFalsy();
  });

  it("should render agent guide, if value of hasCustomerAlreadyFoundCar is true", async () => {
    props.qualifyingDetail.hasCustomerAlreadyFoundCar = true;
    process.env.REACT_APP_AGENT_GUIDE_FOR_ALREADY_FOUND_CAR =
      "Car already found";
    const wrapper = mount(
      <MuiThemeProvider theme={theme}>
        <QualifyingContent {...props} />
      </MuiThemeProvider>
    );
    wrapper.update();
    await flushPromises();

    expect(wrapper.text()).toContain("Car already found");
  });

  it("should render loan calculator expansion panel correctly", () => {
    const wrapper = mount(
      <MuiThemeProvider theme={theme}>
        <QualifyingContent {...props} />
      </MuiThemeProvider>
    );

    expect(wrapper.find(ExpansionPanel).exists()).toBeTruthy();
  });
});
