/* eslint-disable react/jsx-props-no-spreading */
import { create, act } from "react-test-renderer";
import React from "react";
import { mount, shallow } from "enzyme";
import {
  CallbackDetail,
  CallbackDetailProps,
} from "../CallbackDetail/CallbackDetail";
import { CallbackDialog } from "../CallbackDialog/CallbackDialog";

const props: CallbackDetailProps = {
  setCallbackDetail: jest.fn(() => {}),
};

describe("CallbackDetail", () => {
  it("renders correctly", () => {
    const wrapper = create(<CallbackDetail {...props} />).toJSON();

    expect(wrapper).toMatchSnapshot();
  });

  it("when set callback button is clicked, should open callback detail dialog", () => {
    const wrapper = mount(<CallbackDetail {...props} />);

    expect(wrapper.find(CallbackDialog)).toHaveLength(0);

    const btn = wrapper.find(".callback-btn").at(0);
    btn.simulate("click");
    wrapper.update();

    expect(wrapper.find(CallbackDialog)).toHaveLength(1);
  });

  it("when handleCloseDialog method is called from CallbackDialog, should close callback detail dialog", () => {
    const wrapper = shallow(<CallbackDetail {...props} />);

    expect(wrapper.find(CallbackDialog)).toHaveLength(0);

    const btn = wrapper.find(".callback-btn").at(0);
    btn.simulate("click");
    wrapper.update();

    act(() => {
      wrapper.find(CallbackDialog).props().handleCloseDialog();
    });
    wrapper.update();

    expect(wrapper.find(CallbackDialog)).toHaveLength(0);
  });

  it("when update button is clicked from CallbackDialog, should emit setCallbackDetail method", () => {
    const wrapper = shallow(<CallbackDetail {...props} />);

    expect(wrapper.find(CallbackDialog)).toHaveLength(0);

    const btn = wrapper.find(".callback-btn").at(0);
    btn.simulate("click");
    wrapper.update();

    act(() => {
      wrapper.find(CallbackDialog).props().setCallbackDetail(new Date(), "");
    });
    wrapper.update();

    expect(props.setCallbackDetail).toHaveBeenCalled();
  });

  it("when value of callbackBooked prop is null, should render set callback button in UI", () => {
    const wrapper = create(<CallbackDetail {...props} />).root;

    expect(wrapper.findByProps({ className: "callback-btn" })).toBeTruthy();
  });

  it("when value of callbackBooked prop is not null, UI changed accordingly", () => {
    props.callbackBooked = new Date();
    const wrapper = create(<CallbackDetail {...props} />).root;

    expect(wrapper.findByProps({ className: "callback-booked" })).toBeTruthy();
  });
});
