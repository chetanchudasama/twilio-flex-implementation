/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { MenuItem } from "@material-ui/core";
import {
  CustomerBannerMenu,
  CustomerBannerMenuProp,
} from "../CustomerBannerMenu/CustomerBannerMenu";
import { ThirdPartyAuthorizationDialog } from "../ThirdPartyAuthorizationDialog/ThirdPartyAuthorizationDialog";
import { VulnerableCustomerDialog } from "../VulnerableCustomerDialog/VulnerableCustomerDialog";

const props: CustomerBannerMenuProp = {
  hasThirdPartyAuthorization: false,
  thirdPartyAuthorization: null,
  saveThirdPartyDetailHandler: jest.fn(() => {}),
  handleReportVulnerability: jest.fn(() => {}),
  hasVulnerableCustomerReported: false,
  vulnerableCustomerInfo: null,
  updateCustomerDetail: jest.fn(() => {}),
  isFromLeadGenerationScreen: false,
};

describe("CustomerBannerMenu", () => {
  it("renders correctly", () => {
    const wrapper = mount(<CustomerBannerMenu {...props} />);

    expect(wrapper.exists()).toBeTruthy();
  });

  it("should renders Menu and MenuItem components, when icon button is clicked", () => {
    const wrapper = mount(<CustomerBannerMenu {...props} />);

    wrapper.find(".icon-btn").at(0).simulate("click");
    wrapper.update();

    expect(wrapper.find(".banner-menu").exists()).toBeTruthy();
    expect(wrapper.find(MenuItem).exists()).toBeTruthy();
  });

  it("should renders ThirdPartyAuthorizationDialog, when menu item with text Add Third-party Permission is clicked", () => {
    const wrapper = mount(<CustomerBannerMenu {...props} />);

    wrapper.find(".icon-btn").at(0).simulate("click");
    wrapper.update();

    wrapper.find(MenuItem).at(6).simulate("click");
    wrapper.update();

    expect(wrapper.find(ThirdPartyAuthorizationDialog).exists()).toBeTruthy();
  });

  it("when handleSaveThirdPartyDetail is called from ThirdPartyAuthorizationDialog, saveThirdPartyDetailHandler method should be emitted", () => {
    const wrapper = mount(<CustomerBannerMenu {...props} />);

    wrapper.find(".icon-btn").at(0).simulate("click");
    wrapper.update();

    wrapper.find(MenuItem).at(6).simulate("click");
    wrapper.update();

    expect(wrapper.find(ThirdPartyAuthorizationDialog).exists()).toBeTruthy();

    wrapper
      .find(ThirdPartyAuthorizationDialog)
      .props()
      .handleSaveThirdPartyDetail(null);

    expect(wrapper.props().saveThirdPartyDetailHandler).toHaveBeenCalledWith(
      null
    );
  });

  it("when handleDialogClose is called from ThirdPartyAuthorizationDialog, ThirdPartyAuthorizationDialog dialog should be closed", () => {
    const wrapper = mount(<CustomerBannerMenu {...props} />);

    wrapper.find(".icon-btn").at(0).simulate("click");
    wrapper.update();

    wrapper.find(MenuItem).at(6).simulate("click");
    wrapper.update();

    expect(wrapper.find(ThirdPartyAuthorizationDialog).exists()).toBeTruthy();

    act(() => {
      wrapper.find(ThirdPartyAuthorizationDialog).props().handleDialogClose();
    });
    wrapper.update();

    expect(wrapper.find(ThirdPartyAuthorizationDialog).exists()).toBeFalsy();
  });

  it("should renders VulnerableCustomerDialog, when menu item with text Report Vulnerability is clicked", () => {
    const wrapper = mount(<CustomerBannerMenu {...props} />);

    wrapper.find(".icon-btn").last().simulate("click");
    wrapper.update();

    wrapper.find(MenuItem).at(5).simulate("click");
    wrapper.update();

    expect(wrapper.find(VulnerableCustomerDialog).exists()).toBeTruthy();
  });

  it("when handleReportVulnerability is called from VulnerableCustomerDialog, handleReportVulnerability method should be emitted", () => {
    const wrapper = mount(<CustomerBannerMenu {...props} />);

    wrapper.find(".icon-btn").last().simulate("click");
    wrapper.update();

    wrapper.find(MenuItem).at(5).simulate("click");
    wrapper.update();

    expect(wrapper.find(VulnerableCustomerDialog).exists()).toBeTruthy();

    wrapper
      .find(VulnerableCustomerDialog)
      .props()
      .handleReportVulnerability(null);

    expect(wrapper.props().handleReportVulnerability).toHaveBeenCalledWith(
      null
    );
  });

  it("when handleDialogClose is called from VulnerableCustomerDialog, VulnerableCustomerDialog dialog should be closed", () => {
    const wrapper = mount(<CustomerBannerMenu {...props} />);

    wrapper.find(".icon-btn").last().simulate("click");
    wrapper.update();

    wrapper.find(MenuItem).at(5).simulate("click");
    wrapper.update();

    expect(wrapper.find(VulnerableCustomerDialog).exists()).toBeTruthy();

    act(() => {
      wrapper.find(VulnerableCustomerDialog).props().handleDialogClose();
    });
    wrapper.update();

    expect(wrapper.find(VulnerableCustomerDialog).exists()).toBeFalsy();
  });

  it("should render all options, when value of isFromLeadGenerationScreen prop is false", () => {
    const wrapper = mount(<CustomerBannerMenu {...props} />);

    wrapper.find(".icon-btn").last().simulate("click");
    wrapper.update();

    expect(wrapper.find(MenuItem).length).toBe(7);
  });

  it("should render only CustomerDetails,AddressDetails and BankDetails options, when value of isFromLeadGenerationScreen prop is true", () => {
    props.isFromLeadGenerationScreen = true;
    const wrapper = mount(<CustomerBannerMenu {...props} />);

    wrapper.find(".icon-btn").last().simulate("click");
    wrapper.update();

    expect(wrapper.find(MenuItem).length).toBe(3);
  });
});
