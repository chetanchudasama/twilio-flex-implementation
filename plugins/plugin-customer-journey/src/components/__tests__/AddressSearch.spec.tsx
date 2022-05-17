import React from "react";
import { mount } from "enzyme";
import { create } from "react-test-renderer";
import { Button } from "@material-ui/core";
import { Manager } from "@twilio/flex-ui";
import { StyledLinkButton } from "@common/components";
import {
  AddressSearch,
  AddressSearchProps,
} from "../AddressSearch/AddressSearch";
import { flexManagerMock } from "../__mocks__/MockData";

Manager.getInstance = flexManagerMock;

const mockUpdate = jest.fn();

const props: AddressSearchProps = {
  updateAddress: mockUpdate,
  address: {
    buildingName: "test-building-name",
    buildingNumber: "1",
    postcode: "POST CODE 1",
    streetName: "Side Street",
    subBuilding: "31A sub-building",
    town: "Fictional Town",
  },
};

describe("AddressSearch", () => {
  afterEach(() => {
    mockUpdate.mockClear();
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  it("renders correctly", async () => {
    expect(
      create(
        <AddressSearch
          updateAddress={props.updateAddress}
          address={props.address}
        />
      ).toJSON()
    ).toMatchSnapshot();
  });

  it("calls updateAddress, on value change in each input field", () => {
    const wrapper = mount(
      <AddressSearch updateAddress={props.updateAddress} />
    );

    wrapper.find(StyledLinkButton).at(0).simulate("click");
    wrapper.update();

    const subBuildingInput = wrapper.find("input").at(0);
    subBuildingInput.simulate("change", { target: { value: "subBuilding" } });

    const buildingNumber = wrapper.find("input").at(1);
    buildingNumber.simulate("change", { target: { value: "5" } });

    const buildingName = wrapper.find("input").at(2);
    buildingName.simulate("change", { target: { value: "buildingName" } });

    const streetName = wrapper.find("input").at(3);
    streetName.simulate("change", { target: { value: "streetName" } });

    const townName = wrapper.find("input").at(4);
    townName.simulate("change", { target: { value: "town" } });

    const postcode = wrapper.find("input").at(5);
    postcode.simulate("change", { target: { value: "9WZ" } });

    expect(mockUpdate).toBeCalledTimes(6);
  });

  it("is in readonly state when address props are passed in, then goes to edit mode when edit is clicked", async () => {
    const wrapper = mount(
      <AddressSearch
        updateAddress={props.updateAddress}
        address={props.address}
      />
    );

    wrapper.update();
    expect(
      wrapper.find({ id: "address-readonly-town-name" }).at(0).text()
    ).toBe(props.address?.town);
    expect(
      wrapper.find({ id: "address-readonly-street-name" }).at(0).text()
    ).toBe(props.address?.streetName);
    expect(
      wrapper.find(Button).find({ id: "address-readonly-edit" }).at(0).exists()
    ).toBeTruthy();
    wrapper
      .find(Button)
      .find({ id: "address-readonly-edit" })
      .at(0)
      .simulate("click");
    wrapper.update();
    expect(
      wrapper.find(Button).find({ id: "address-readonly-edit" }).at(0).exists()
    ).toBeFalsy();
  });
});
