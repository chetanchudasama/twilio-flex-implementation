import { Button } from "@material-ui/core";
import { Manager } from "@twilio/flex-ui";
import { shallow, mount } from "enzyme";
import flushPromises from "flush-promises";
import React from "react";
import { act } from "react-dom/test-utils";
import { create } from "react-test-renderer";
import {
  OwnProps,
  PartExchangeConcertina,
} from "../PartExchangeConcertina/PartExchangeConcertina";
import { flexManagerMock } from "../__mocks__/MockData";

const props: OwnProps = {
  partExchangeRegistration: "REG1 234",
};

const mockGetPXResponse = jest.fn(() =>
  Promise.resolve({
    tradeValue: 1,
    retailTransacted: 2,
    retailValue: 3,
  })
);

Manager.getInstance = flexManagerMock;

jest.mock("../../services/application.service", () => ({
  useApplicationService: jest.fn(() => ({
    getPartExchangeValuation: mockGetPXResponse,
  })),
}));

describe("PartExchangeConcertina", () => {
  it("renders correctly", async () => {
    expect(
      create(<PartExchangeConcertina {...props} />).toJSON()
    ).toMatchSnapshot();
  });

  it("should have -- before button is clicked / api is called", () => {
    const wrapper = shallow(<PartExchangeConcertina {...props} />);
    const transacted = wrapper.find({ id: "px-retail-transacted" }).text();
    const glassTrade = wrapper.find({ id: "px-glass-trade" }).text();
    const askingValue = wrapper.find({ id: "px-retail-asking" }).text();

    expect(
      [transacted, glassTrade, askingValue].every((e) => e === "--")
    ).toBeTruthy();
  });

  it("should call api when the Value PX button is clicked", async () => {
    const wrapper = mount(<PartExchangeConcertina {...props} />);

    const input = wrapper.find(".mileage-container").find("input");
    input.simulate("change", { target: { value: "100" } });
    wrapper.update();

    await act(async () => {
      wrapper.find(Button).at(0).simulate("click");
      wrapper.update();
      await flushPromises();
    });
    expect(mockGetPXResponse).toHaveBeenCalledTimes(1);
  });

  it("should display information when api is called", async () => {
    const wrapper = mount(<PartExchangeConcertina {...props} />);

    const input = wrapper.find(".mileage-container").find("input");
    input.simulate("change", { target: { value: "100" } });
    wrapper.update();

    await act(async () => {
      wrapper.find(Button).at(0).simulate("click");
      await flushPromises();
      expect(mockGetPXResponse).toHaveBeenCalled();
    });
    wrapper.update();

    const glassTrade = wrapper.find({ id: "px-glass-trade" });
    expect(glassTrade.exists()).toBeTruthy();
    expect(glassTrade.text()).toEqual("£1");

    const transacted = wrapper.find({ id: "px-retail-transacted" });
    expect(transacted.exists()).toBeTruthy();
    expect(transacted.text()).toEqual("£2");

    const askingValue = wrapper.find({ id: "px-retail-asking" });
    expect(askingValue.exists()).toBeTruthy();
    expect(askingValue.text()).toEqual("£3");
  });
});
