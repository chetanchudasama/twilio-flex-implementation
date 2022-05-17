import { mount, shallow } from "enzyme";
import React from "react";
import DPADialogContent, {
  DPADialogContentProps,
} from "../DPADialogContent/DPADialogContent";

const props: DPADialogContentProps = {
  pin: "1234",
  postCode: "2213",
  dateOfBirth: "27th January, 1971",
  onDPAFailed: jest.fn(() => {}),
  onDPAConfirm: jest.fn(() => {}),
  onSetNewPin: jest.fn(() => {}),
};

describe("DPADialogContent", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<DPADialogContent {...props} />);

    expect(wrapper.exists()).toBeTruthy();
  });

  it("when value of pin prop is set, should render confirm pin text box and action buttons in the UI", () => {
    const wrapper = mount(<DPADialogContent {...props} />);

    expect(wrapper.find(".confirm-pin-message").exists()).toBeTruthy();
    expect(wrapper.find(".input-box").exists()).toBeTruthy();
    expect(wrapper.find(".confirm-pin-input > input")).toHaveLength(4);
    expect(wrapper.find(".action-button-div").exists()).toBeTruthy();
  });

  it("when failed button is clicked, onDPAFailed method should be called", () => {
    const wrapper = mount(<DPADialogContent {...props} />);
    const failedButton = wrapper.find(".button-red").at(0);
    failedButton.simulate("click");
    wrapper.update();

    expect(props.onDPAFailed).toBeCalledTimes(1);
  });

  it("when confirm button is clicked, onDPAConfirm method should be called", () => {
    const wrapper = mount(<DPADialogContent {...props} />);
    const confirmButton = wrapper.find(".button-confirm").at(0);
    confirmButton.simulate("click");
    wrapper.update();

    expect(props.onDPAConfirm).toBeCalledTimes(1);
  });

  it("should render form control label with correct user detail", () => {
    const wrapper = shallow(<DPADialogContent {...props} />);

    expect(wrapper.find(".form-control-label")).toHaveLength(2);
    expect(wrapper.find(".form-control-label").at(0).props().label).toEqual(
      `Postcode (${props.postCode})`
    );
    expect(wrapper.find(".form-control-label").at(1).props().label).toEqual(
      `Date of Birth (${props.dateOfBirth})`
    );
  });
});
