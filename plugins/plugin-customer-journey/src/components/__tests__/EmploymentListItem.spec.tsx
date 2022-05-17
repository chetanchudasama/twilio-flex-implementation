import React from "react";
import { create } from "react-test-renderer";
import { mount } from "enzyme";
import { EmploymentListItem } from "../CustomerDetailAction/EmploymentHistory/EmploymentListItem/EmploymentListItem";
import { EmploymentListItemProps } from "../CustomerDetailAction/EmploymentHistory/EmploymentListItem/EmploymentListItem.Props";

const props: EmploymentListItemProps = {
  employment: {
    occupationStatus: {
      id: 1,
      name: "Full-time",
    },
    yearsAtEmployment: 2,
    monthsAtEmployment: 25,
    occupation: "Car rental agent",
    employerName: "Zara R Woods",
    employerPhoneNumber: "+446349900077",
    employerAddress: {
      postcode: "IP6 3YZ",
      buildingName: "Granary",
      subBuilding: "Granary-23",
      buildingNumber: "3",
      streetName: "75 Golf Road",
      town: "SWILLAND",
    },
    isCurrentEmployment: true,
  },
  setActiveEmployment: jest.fn(),
};

describe("EmploymentListItem", () => {
  it("renders correctly", () => {
    const wrapper = create(<EmploymentListItem {...props} />).toJSON();

    expect(wrapper).toMatchSnapshot();
  });

  it("should render employment detail correctly in UI", () => {
    const wrapper = create(<EmploymentListItem {...props} />).root;

    expect(
      wrapper.findByProps({
        className: "title title-line-1",
      }).props.children
    ).toContain(
      [
        props.employment.occupation,
        `(${props.employment.occupationStatus.name})`,
      ].join(" ")
    );
    expect(
      wrapper.findByProps({
        className: "title title-line-2",
      }).props.children
    ).toContain(props.employment.employerName);
  });

  it("when edit button is clicked, setActiveEmployment method should be emitted", () => {
    const wrapper = mount(<EmploymentListItem {...props} />);

    const button = wrapper.find(".action-btn").first();
    button.simulate("click");
    wrapper.update();

    expect(props.setActiveEmployment).toHaveBeenCalledTimes(1);
  });
});
