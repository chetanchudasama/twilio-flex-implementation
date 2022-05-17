import React from "react";
import { create } from "react-test-renderer";
import { mount } from "enzyme";
import { Shared } from "@common/components";
import {
  AddressDetail,
  AddressItemProps,
} from "../CustomerDetailAction/AddressHistory/AddressDetail/AddressDetail";

const props: AddressItemProps = {
  addressItem: {
    postcode: "NN6 2XS",
    buildingName: "Grange",
    subBuilding: "Grange-1",
    buildingNumber: "110",
    streetName: "43 Buckingham Rd",
    town: "THORNBY",
    addressStatus: {
      addressStatusId: 1,
      addressStatusName: "Home Owner",
      yearsAtAddress: 1,
      monthsAtAddress: 12,
    },
    isPrimaryAddress: true,
  },
  onEdit: jest.fn(() => {}),
};

describe("AddressDetail", () => {
  it("renders correctly", () => {
    const wrapper = create(<AddressDetail {...props} />).toJSON();

    expect(wrapper).toMatchSnapshot();
  });

  it("should render address value correctly in UI", () => {
    const wrapper = create(<AddressDetail {...props} />).root;

    expect(
      wrapper.findByProps({
        className: "address-content address-line1",
      }).props.children
    ).toContain(
      `${props.addressItem.buildingNumber}, ${props.addressItem.buildingName}, ${props.addressItem.subBuilding}, ${props.addressItem.streetName}`
    );
    expect(
      wrapper.findByProps({
        className: "address-content address-line2",
      }).props.children
    ).toContain(`${props.addressItem.town}, ${props.addressItem.postcode}`);
  });

  it("when edit button is clicked, onEdit method should be emitted", () => {
    const wrapper = mount(<AddressDetail {...props} />);

    const button = wrapper.find(".edit-address-btn").first();
    button.simulate("click");
    wrapper.update();

    expect(props.onEdit).toHaveBeenCalledTimes(1);
  });
});
