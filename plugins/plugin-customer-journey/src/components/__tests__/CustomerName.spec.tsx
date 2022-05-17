import React from "react";
import { mount } from "enzyme";
import { create } from "react-test-renderer";

import { CustomerNameProps } from "../LeadGeneration/CustomerName/CustomerName.Props";
import { CustomerName } from "../LeadGeneration/CustomerName/CustomerName";

const props: CustomerNameProps = {
  updateCustomerPreferredName: jest.fn(),
  firstName: "john",
  fullName: "Mr John Fred Smith",
};

describe("CustomerName", () => {
  it("renders correctly on load", async () => {
    const wrapper = create(<CustomerName {...props} />).toJSON();

    expect(wrapper).toMatchSnapshot();
  });

  it("should call updateCustomerPreferredName method, when preferred name textbox blur event is called", () => {
    const wrapper = mount(<CustomerName {...props} />);

    wrapper.find(".btn-other").last().simulate("click");
    wrapper.update();

    const input = wrapper.find("input").last();
    input.simulate("blur");
    wrapper.update();

    expect(props.updateCustomerPreferredName).toHaveBeenCalled();
  });
});
