import React from "react";
import { mount } from "enzyme";
import { create } from "react-test-renderer";

import { LenderDetailProps } from "../LeadGeneration/LenderDetail/LenderDetail.Props";
import { LenderDetail } from "../LeadGeneration/LenderDetail/LenderDetail";

const props: LenderDetailProps = {
  lenderName: "123 Debt Solutions",
};

jest.mock("@common/components", () => {
  return {
    __esModule: true,
    PreferredLenderIcon: () => {
      return <div>Preferred Lender Icon</div>;
    },
  };
});

describe("LenderDetail", () => {
  it("renders correctly on load", async () => {
    const wrapper = create(<LenderDetail {...props} />).toJSON();

    expect(wrapper).toMatchSnapshot();
  });

  it("should render lender name correctly", () => {
    const wrapper = mount(<LenderDetail {...props} />);

    expect(wrapper.find(".preferred-lender-name").last().html()).toContain(
      props.lenderName
    );
  });
});
