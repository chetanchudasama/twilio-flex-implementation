import React from "react";
import { shallow, mount } from "enzyme";
import { Checkbox } from "@material-ui/core";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import AddNote, { AddNoteProps } from "../HistoryPanel/AddNote/AddNote";

const props: AddNoteProps = {
  isNoteAdded: false,
  onSaveNoteDetail: jest.fn(() => {}),
};

describe("AddNote", () => {
  it("renders correctly on load", () => {
    const wrapper = shallow(<AddNote {...props} />);

    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find(".add-note-container").exists()).toBeTruthy();
  });

  it("when value of text content is changed, should UI change accordingly", () => {
    const wrapper = mount(<AddNote {...props} />);

    expect(wrapper.find(".disable-btn").exists()).toBeTruthy();
    const textField = wrapper.find(".add-note-text-field").find("textarea");
    textField.simulate("change", { target: { value: "test message" } });
    wrapper.update();

    expect(wrapper.find(".disable-btn").exists()).toBeFalsy();
  });

  it("when value of Important and Share With Broker checkbox is changed, should UI change accordingly", () => {
    const wrapper = mount(<AddNote {...props} />);

    const checkBox = wrapper.find(Checkbox).at(0).find("input");
    expect(wrapper.find(CheckBoxIcon).exists()).toBeFalsy();
    checkBox.simulate("change", { target: { checked: true } });
    wrapper.update();

    expect(wrapper.find(CheckBoxIcon).exists()).toBeTruthy();
  });

  it("when value of text content is empty, send button should be disabled", () => {
    const wrapper = mount(<AddNote {...props} />);

    const button = wrapper.find(".disable-btn").at(0);

    expect(button.exists()).toBeTruthy();
  });

  it("when send button is clicked, onSaveNoteDetail method should be called", () => {
    const wrapper = mount(<AddNote {...props} />);

    const textField = wrapper.find(".add-note-text-field").find("textarea");
    textField.simulate("change", { target: { value: "test message" } });
    const button = wrapper.find(".send-btn").at(0);
    button.simulate("click");
    wrapper.update();

    expect(props.onSaveNoteDetail).toHaveBeenCalled();
  });
});
