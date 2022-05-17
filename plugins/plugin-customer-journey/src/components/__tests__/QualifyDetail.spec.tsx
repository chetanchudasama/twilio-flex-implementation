import { mount } from "enzyme";
import flushPromises from "flush-promises";
import React from "react";
import { create } from "react-test-renderer";

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { Manager } from "@twilio/flex-ui";

import { Shared } from "@common/components";
import { QualifyDetailModel } from "../../models/QualifyDetailModel";
import { flexManagerMock } from "../__mocks__/MockData";
import { QualifyDetail } from "../LeadGeneration/QualifyDetail/QualifyDetail";
import { QualifyDetailProps } from "../LeadGeneration/QualifyDetail/QualifyDetail.Props";

const defaultProps: QualifyDetailProps = {
  monthlyIncome: 0,
  qualifyingDetail: new QualifyDetailModel(),
  updateQualifyingDetails: jest.fn(),
};

let props = { ...defaultProps };

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

jest.mock("../../services/application.service");

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

describe("QualifyDetail", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
    props = { ...defaultProps };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it("renders correctly", () => {
    const wrapper = create(
      <MuiThemeProvider theme={theme}>
        <QualifyDetail {...props} />
      </MuiThemeProvider>
    ).toJSON();

    expect(wrapper).toMatchSnapshot();
  });

  it("should render agent guide for license message, if drivingLicenseConfirmed property is false", async () => {
    props.qualifyingDetail.drivingLicenseConfirmed = false;
    process.env.REACT_APP_AGENT_GUIDE_FOR_LICENSE =
      "REACT_APP_AGENT_GUIDE_FOR_LICENSE message";
    const wrapper = mount(
      <MuiThemeProvider theme={theme}>
        <QualifyDetail {...props} />
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
        <QualifyDetail {...props} />
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
        <QualifyDetail {...props} />
      </MuiThemeProvider>
    );
    wrapper.update();
    await flushPromises();

    expect(wrapper.html()).toContain(
      "REACT_APP_AGENT_GUIDE_FOR_INCOME message"
    );
  });

  it("should render customer's monthly income correctly in question text", async () => {
    props.monthlyIncome = 3000;
    const wrapper = mount(
      <MuiThemeProvider theme={theme}>
        <QualifyDetail {...props} />
      </MuiThemeProvider>
    );

    expect(wrapper.find(".income-text").last().text()).toContain(
      `Is the customer's monthly net income ${Shared.getFormattedCurrencyValue(
        props.monthlyIncome
      )}?`
    );
  });
});
