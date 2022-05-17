import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import React from "react";
import { create } from "react-test-renderer";
import {
  CustomerBanner,
  CustomerBannerProps,
} from "../CustomerBanner/CustomerBanner";
import { ThirdPartyAuthorizationDetail } from "../models/ThirdPartyAuthorizationDetailModel";
import { VulnerableCustomerInformation } from "../models/VulnerableCustomerInformation";
import { VulnerableCustomerStatus } from "../shared/enum";

const props: CustomerBannerProps = {
  name: "Thomas Snow",
  dob: "21/05/2021",
  address: "Address",
  mobileNumber: "+1 609-984-1675",
  emailAddress: "thomas.snow@gmail.com",
  hasThirdPartyAuthorization: false,
  thirdPartyAuthorization: null,
  applicationStatusName: "Proceeding",
  saveThirdPartyDetailHandler: jest.fn(),
  hasVulnerableCustomerReported: false,
  vulnerableCustomerInformation: null,
  saveVulnerableCustomerInformation: jest.fn(),
  setCallbackDetail: jest.fn(),
  canMakeCall: false,
  makeCall: jest.fn(),
  lenderName: "Auto loan",
  apr: 19.8,
  tierName: "Tier 1",
  updateCustomerDetail: jest.fn(),
};

jest.mock("./../Icons/Icons", () => {
  return {
    __esModule: true,
    MoneyIcon: () => {
      return <div>Money Icon</div>;
    },
    ApplicationDateIcon: () => {
      return <div>Application Date Icon</div>;
    },
    PreferredLenderIcon: () => {
      return <div>Preferred Lender Icon</div>;
    },
  };
});

jest.mock("../CustomerBannerMenu/CustomerBannerMenu", () => {
  return {
    __esModule: true,
    CustomerBannerMenu: () => {
      return <div className="customer-banner-menu">Customer Banner Menu</div>;
    },
  };
});

jest.mock("@material-ui/core", () => {
  const materialUI = jest.requireActual("@material-ui/core");
  return {
    ...materialUI,
    Tooltip: jest.fn(({ children }) => children),
  };
});

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

describe("CustomerBanner", () => {
  it("renders correctly", () => {
    const wrapper = create(
      <MuiThemeProvider theme={theme}>
        <CustomerBanner {...props} />
      </MuiThemeProvider>
    ).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it("should render CustomerBannerMenu component", () => {
    const wrapper = create(
      <MuiThemeProvider theme={theme}>
        <CustomerBanner {...props} />
      </MuiThemeProvider>
    ).root;

    expect(
      wrapper.findAllByProps({ className: "customer-banner-menu" })
    ).toHaveLength(1);
  });

  it("should render custom snackbar message, when third party authorization detail is not null", () => {
    props.hasThirdPartyAuthorization = true;
    props.thirdPartyAuthorization = new ThirdPartyAuthorizationDetail();
    props.thirdPartyAuthorization.thirdPartyName = "Mr John";
    props.thirdPartyAuthorization.thirdPartyExpiryDate = new Date(
      "06-30-2021 00:00"
    );
    const wrapper = create(
      <MuiThemeProvider theme={theme}>
        <CustomerBanner {...props} />
      </MuiThemeProvider>
    ).toJSON();

    expect(wrapper).toMatchSnapshot();
  });

  it("should render custom snackbar message, when customer is marked as vulnerable", () => {
    props.hasVulnerableCustomerReported = true;
    props.vulnerableCustomerInformation = new VulnerableCustomerInformation();
    props.vulnerableCustomerInformation.status =
      VulnerableCustomerStatus.confirmed;

    const wrapper = create(
      <MuiThemeProvider theme={theme}>
        <CustomerBanner {...props} />
      </MuiThemeProvider>
    ).toJSON();

    expect(wrapper).toMatchSnapshot();
  });

  it("should render set callback button, when value of callbackBooked prop is null", () => {
    const wrapper = create(
      <MuiThemeProvider theme={theme}>
        <CustomerBanner {...props} />
      </MuiThemeProvider>
    ).root;

    expect(wrapper.findByProps({ className: "callback-btn" })).toBeTruthy();
  });

  it("when value of callbackBooked prop is not null, UI should render accordingly", () => {
    props.callbackBooked = new Date();
    const wrapper = create(
      <MuiThemeProvider theme={theme}>
        <CustomerBanner {...props} />
      </MuiThemeProvider>
    ).root;

    expect(wrapper.findByProps({ className: "callback-booked" })).toBeTruthy();
  });

  it("should render preferred lender detail correctly in UI", () => {
    const wrapper = create(
      <MuiThemeProvider theme={theme}>
        <CustomerBanner {...props} />
      </MuiThemeProvider>
    ).root;

    expect(wrapper.findByProps({ className: "preferred-lender" })).toBeTruthy();
    expect(wrapper.findByProps({ className: "apr" })).toBeTruthy();
    expect(wrapper.findByProps({ className: "tier" })).toBeTruthy();
  });

  it("when value of address prop is empty, UI should be rendered accordingly", () => {
    props.address = "";
    const wrapper = create(
      <MuiThemeProvider theme={theme}>
        <CustomerBanner {...props} />
      </MuiThemeProvider>
    ).root;

    expect(
      wrapper.findByProps({ className: "address" }).props.children
    ).toContain("-");
  });
});
