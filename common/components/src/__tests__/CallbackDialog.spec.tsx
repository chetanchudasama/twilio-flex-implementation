/* eslint-disable react/jsx-props-no-spreading */
import { create, act } from "react-test-renderer";
import React from "react";
import { shallow } from "enzyme";
import {
  CallbackDialog,
  CallbackDialogProps,
} from "../CallbackDialog/CallbackDialog";
import { ResponsiveDialog } from "../ResponsiveDialog";

const props: CallbackDialogProps = {
  open: true,
  setCallbackDetail: jest.fn(),
  handleCloseDialog: jest.fn(),
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

describe("CallbackDialog", () => {
  it("renders correctly", () => {
    const wrapper = create(<CallbackDialog {...props} />).toJSON();

    expect(wrapper).toMatchSnapshot();
  });

  it("should not render Reason text-files, when value of noteOptional prop is true", () => {
    props.noteOptional = true;
    const wrapper = shallow(<CallbackDialog {...props} />);

    expect(wrapper.find(".reason-field").exists()).toBeFalsy();
  });

  it("should call handleCloseDialog method, when cancel button is clicked from callback dialog", () => {
    props.noteOptional = false;
    const wrapper = shallow(<CallbackDialog {...props} />);

    act(() => {
      wrapper.find(ResponsiveDialog).last().props().onCancel();
    });

    expect(props.handleCloseDialog).toHaveBeenCalled();
  });

  it("when delete button is clicked, should open confirmation dialog", () => {
    const wrapper = shallow(<CallbackDialog {...props} />);

    expect(wrapper.find(ResponsiveDialog)).toHaveLength(1);

    act(() => {
      wrapper.children().last().props().onDelete();
    });
    wrapper.update();

    expect(wrapper.find(ResponsiveDialog)).toHaveLength(2);
    expect(wrapper.find(".confirmation-message").exists()).toBeTruthy();
  });

  it("should close confirmation dialog, when No button is clicked from confirmation dialog", () => {
    const wrapper = shallow(<CallbackDialog {...props} />);

    act(() => {
      wrapper.children().last().props().onDelete();
    });
    wrapper.update();

    expect(wrapper.find(".confirmation-message").exists()).toBeTruthy();

    act(() => {
      wrapper.find(ResponsiveDialog).last().props().onCancel();
    });

    expect(wrapper.find(".confirmation-message").exists()).toBeFalsy();
  });
});
