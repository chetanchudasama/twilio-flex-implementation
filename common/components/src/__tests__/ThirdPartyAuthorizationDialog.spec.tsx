/* eslint-disable react/jsx-props-no-spreading */
import { create, act } from "react-test-renderer";
import { shallow } from "enzyme";
import React from "react";
import {
  ThirdPartyAuthorizationDialog,
  ThirdPartyAuthorizationDialogProps,
} from "../ThirdPartyAuthorizationDialog/ThirdPartyAuthorizationDialog";
import { ThirdPartyAuthorizationDetail } from "../models/ThirdPartyAuthorizationDetailModel";
import { ResponsiveDialog } from "../ResponsiveDialog";

const props: ThirdPartyAuthorizationDialogProps = {
  open: true,
  thirdPartyAuthorizationInformation: new ThirdPartyAuthorizationDetail(),
  handleDialogClose: jest.fn(() => {}),
  handleSaveThirdPartyDetail: jest.fn(() => {}),
};

jest.mock("../ResponsiveDialog/index", () => {
  return {
    ResponsiveDialog: jest.fn(({ children }) => children),
  };
});

jest.mock("../MuiDatePicker/MuiDatePicker", () => {
  return {
    MuiDatePicker: () => {
      return <div>Date Picker</div>;
    },
  };
});

jest.mock("@material-ui/core", () => {
  const materialUI = jest.requireActual("@material-ui/core");
  return {
    ...materialUI,
    FormControlLabel: () => {
      return <div>Form Control</div>;
    },
  };
});

describe("ThirdPartyAuthorizationDialog", () => {
  it("renders correctly", () => {
    const wrapper = create(
      <ThirdPartyAuthorizationDialog {...props} />
    ).toJSON();

    expect(wrapper).toMatchSnapshot();
  });

  it("should call handleSaveThirdPartyDetail method, when Save button is clicked", () => {
    props.thirdPartyAuthorizationInformation = {
      thirdPartyName: "Name",
      thirdPartyDateOfBirth: new Date(),
      thirdPartyAddress: "Test",
      thirdPartyPostcode: "Test",
      thirdPartyExpiryDate: new Date(),
      thirdPartyDoNotDiscuss: "Test",
      thirdPartyRemovalAuthor: "",
      thirdPartyRemovalNotes: "Test",
    };
    const wrapper = shallow(<ThirdPartyAuthorizationDialog {...props} />);

    const spy = jest.spyOn(props, "handleSaveThirdPartyDetail");

    act(() => {
      wrapper.children().props().onConfirm();
    });

    expect(spy).toHaveBeenCalled();
  });

  it("should call handleDialogClose method, when cancel button is clicked", () => {
    const wrapper = shallow(<ThirdPartyAuthorizationDialog {...props} />);

    const spy = jest.spyOn(props, "handleDialogClose");

    act(() => {
      wrapper.children().props().onCancel();
    });

    expect(spy).toHaveBeenCalled();
  });

  it("should render fields as disabled, when third party detail is saved", () => {
    props.thirdPartyAuthorizationInformation = {
      thirdPartyName: "Name",
      thirdPartyDateOfBirth: new Date(),
      thirdPartyAddress: "Test",
      thirdPartyPostcode: "Test",
      thirdPartyExpiryDate: new Date(),
      thirdPartyDoNotDiscuss: "Test",
      thirdPartyRemovalAuthor: "",
      thirdPartyRemovalNotes: "Test",
    };
    const wrapper = create(<ThirdPartyAuthorizationDialog {...props} />).root;

    expect(
      wrapper.findByProps({
        className: "name",
      }).props.disabled
    ).toEqual(true);
    expect(
      wrapper.findByProps({
        className: "address",
      }).props.disabled
    ).toEqual(true);
    expect(
      wrapper.findByProps({
        className: "postcode",
      }).props.disabled
    ).toEqual(true);
    expect(
      wrapper.findByProps({
        className: "do-not-discuss",
      }).props.disabled
    ).toEqual(true);
  });

  it("should render confirmation dialog, when delete button is clicked", () => {
    const wrapper = shallow(<ThirdPartyAuthorizationDialog {...props} />);

    expect(wrapper.find(ResponsiveDialog)).toHaveLength(1);
    act(() => {
      wrapper.children().props().onDelete();
    });

    expect(wrapper.find(ResponsiveDialog)).toHaveLength(2);
    expect(wrapper.find(".confirmation-message").exists()).toBeTruthy();
    expect(wrapper.find(".confirmation-message").text()).toContain(
      "Are you sure you want to clear the third party authorization details?"
    );
  });

  it("should close confirmation dialog, when No button is clicked from confirmation dialog", () => {
    const wrapper = shallow(<ThirdPartyAuthorizationDialog {...props} />);

    act(() => {
      wrapper.children().props().onDelete();
    });

    expect(wrapper.find(".confirmation-message").exists()).toBeTruthy();

    act(() => {
      wrapper.find(ResponsiveDialog).at(1).props().onCancel();
    });

    expect(wrapper.find(".confirmation-message").exists()).toBeFalsy();
  });

  it("should call handleSaveThirdPartyDetail method, when Yes button is clicked from confirmation dialog", () => {
    const wrapper = shallow(<ThirdPartyAuthorizationDialog {...props} />);

    const spy = jest.spyOn(props, "handleSaveThirdPartyDetail");

    act(() => {
      wrapper.children().props().onDelete();
    });

    expect(wrapper.find(".confirmation-message").exists()).toBeTruthy();

    act(() => {
      wrapper.find(ResponsiveDialog).at(1).props().onConfirm();
    });

    expect(spy).toHaveBeenCalledWith(null);
  });
});
