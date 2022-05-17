/* eslint-disable react/jsx-props-no-spreading */
import { act } from "react-test-renderer";
import { shallow } from "enzyme";
import React from "react";
import {
  VulnerableCustomerDialog,
  VulnerableCustomerDialogProps,
} from "../VulnerableCustomerDialog/VulnerableCustomerDialog";
import { VulnerableCustomerInformation } from "../models/VulnerableCustomerInformation";
import { ResponsiveDialog } from "../ResponsiveDialog";

jest.mock("../ResponsiveDialog/index", () => {
  return {
    ResponsiveDialog: jest.fn(({ children }) => children),
  };
});
jest.mock("../CustomSelect/CustomSelect", () => {
  return {
    CustomSelect: jest.fn(({ children }) => children),
  };
});

jest.mock("@material-ui/core", () => {
  const materialUI = jest.requireActual("@material-ui/core");
  return {
    ...materialUI,
    FormControlLabel: jest.fn(({ children }) => children),
    FormControl: jest.fn(({ children }) => children),
    InputLabel: jest.fn(({ children }) => children),
    MenuItem: jest.fn(({ children }) => children),
    Grid: jest.fn(({ children }) => children),
    TextField: jest.fn(({ children }) => children),
    RadioGroup: jest.fn(({ children }) => children),
    Radio: jest.fn(({ children }) => children),
    Checkbox: jest.fn(({ children }) => children),
    FormHelperText: jest.fn(({ children }) => children),
  };
});

const props: VulnerableCustomerDialogProps = {
  open: true,
  vulnerableCustomerInfo: new VulnerableCustomerInformation(),
  handleDialogClose: jest.fn(),
  handleReportVulnerability: jest.fn(),
  hasVulnerableCustomerReported: true,
};

describe("VulnerableCustomerDialog", () => {
  it("should call handleReportVulnerability method, when Report button is clicked", () => {
    props.vulnerableCustomerInfo = {
      reason: {
        id: 1,
        name: "Computer Literacy/Numeracy/Literacy",
      },
      vulnerabilityNote: "test",
      status: 1,
      permissionGranted: true,
    };
    const wrapper = shallow(<VulnerableCustomerDialog {...props} />);

    const spy = jest.spyOn(props, "handleReportVulnerability");

    act(() => {
      wrapper.children().props().onConfirm();
    });

    expect(spy).toHaveBeenCalled();
  });

  it("should call handleDialogClose method, when cancel button is clicked", () => {
    const wrapper = shallow(<VulnerableCustomerDialog {...props} />);

    const spy = jest.spyOn(props, "handleDialogClose");

    act(() => {
      wrapper.children().props().onCancel();
    });

    expect(spy).toHaveBeenCalled();
  });

  it("should render confirmation dialog, when delete button is clicked", () => {
    const wrapper = shallow(<VulnerableCustomerDialog {...props} />);

    expect(wrapper.find(ResponsiveDialog)).toHaveLength(1);
    act(() => {
      wrapper.children().props().onDelete();
    });

    expect(wrapper.find(ResponsiveDialog)).toHaveLength(2);
    expect(wrapper.find(".confirmation-message").exists()).toBeTruthy();
    expect(wrapper.find(".confirmation-message").text()).toContain(
      "Are you sure you want to clear the customer vulnerability details?"
    );
  });

  it("should close confirmation dialog, when No button is clicked from confirmation dialog", () => {
    const wrapper = shallow(<VulnerableCustomerDialog {...props} />);

    act(() => {
      wrapper.children().props().onDelete();
    });

    expect(wrapper.find(".confirmation-message").exists()).toBeTruthy();

    act(() => {
      wrapper.find(ResponsiveDialog).last().props().onCancel();
    });

    expect(wrapper.find(".confirmation-message").exists()).toBeFalsy();
  });

  it("should call handleSaveThirdPartyDetail method, when Yes button is clicked from confirmation dialog", () => {
    const wrapper = shallow(<VulnerableCustomerDialog {...props} />);

    const spy = jest.spyOn(props, "handleReportVulnerability");

    act(() => {
      wrapper.children().props().onDelete();
    });

    expect(wrapper.find(".confirmation-message").exists()).toBeTruthy();

    act(() => {
      wrapper.find(ResponsiveDialog).last().props().onConfirm();
    });

    expect(spy).toHaveBeenCalledWith(null);
  });
});
