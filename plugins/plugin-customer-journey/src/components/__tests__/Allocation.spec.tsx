import React from "react";
import { mount } from "enzyme";
import { create } from "react-test-renderer";

import { Allocation } from "../LeadGeneration/Allocation/Allocation";
import { AllocationProps } from "../LeadGeneration/Allocation/Allocation.Props";

const props: AllocationProps = {
  getRankedAgents: jest.fn(),
};

describe("Allocation", () => {
  it("renders correctly on load", () => {
    const wrapper = create(<Allocation {...props} />).toJSON();

    expect(wrapper).toMatchSnapshot();
  });

  it("should render Find Agent button correctly", () => {
    const wrapper = mount(<Allocation {...props} />);

    const button = wrapper.find(".find-agent-btn").last();
    expect(button.exists()).toBeTruthy();
  });

  it("should emit getRankedAgents method, when find agent button is clicked", () => {
    const wrapper = mount(<Allocation {...props} />);

    const button = wrapper.find(".find-agent-btn").last();
    button.simulate("click");

    expect(props.getRankedAgents).toHaveBeenCalled();
  });
});
