import React from "react";
import { mount } from "enzyme";
import { create } from "react-test-renderer";

import { DPAFCAProps } from "../LeadGeneration/DPAFCA/DPAFCA.Props";
import { DPAFCA } from "../LeadGeneration/DPAFCA/DPAFCA";

const props: DPAFCAProps = {
  address: "114, Parsley, Parsley-9, 48 Bullwood Rd, ST ARVANS, NP6 8RF",
  dateOfBirth: "16/05/1975",
};

describe("DPAFCA", () => {
  it("renders correctly on load", () => {
    const wrapper = create(<DPAFCA {...props} />).toJSON();

    expect(wrapper).toMatchSnapshot();
  });

  it("should render address correctly", () => {
    const wrapper = mount(<DPAFCA {...props} />);

    expect(wrapper.find(".address").last().html()).toContain(props.address);
  });

  it("should render date of birth correctly", () => {
    const wrapper = mount(<DPAFCA {...props} />);

    expect(wrapper.find(".date-of-birth").last().html()).toContain(
      props.dateOfBirth
    );
  });
});
