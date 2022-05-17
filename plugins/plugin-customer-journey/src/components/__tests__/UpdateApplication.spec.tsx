import React from "react";
import { mount } from "enzyme";
import { create } from "react-test-renderer";

import { UpdateApplication } from "../LeadGeneration/UpdateApplication/UpdateApplication";
import { UpdateApplicationProps } from "../LeadGeneration/UpdateApplication/UpdateApplication.Props";

const props: UpdateApplicationProps = {
  updateApplication: jest.fn(),
};

describe("UpdateApplication", () => {
  it("renders correctly on load", () => {
    const wrapper = create(<UpdateApplication {...props} />).toJSON();

    expect(wrapper).toMatchSnapshot();
  });

  it("should call updateApplication method, when Update Application button is clicked", () => {
    const wrapper = mount(<UpdateApplication {...props} />);

    const updateApplicationButton = wrapper
      .find(".update-application-btn")
      .last();

    updateApplicationButton.simulate("click");

    expect(props.updateApplication).toHaveBeenCalled();
  });
});
