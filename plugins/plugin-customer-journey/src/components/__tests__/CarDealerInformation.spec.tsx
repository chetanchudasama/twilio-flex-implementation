import React from "react";
import { create } from "react-test-renderer";
import CarDealerInformation, {
  Props,
} from "../CarDealerInformation/CarDealerInformation";
import { DealerResponseModel } from "../../models/DealerResponseModel";

jest.mock("@twilio/flex-ui", () => {
  return {
    IconButton: jest.fn(({ children }) => <div>{children}</div>),
  };
});

const dealer: DealerResponseModel = Object.assign(new DealerResponseModel(), {
  dealerId: 1,
  dealerName: "MR john",
  county: "UK",
  building: "13",
  streetName: "46 Grenoble Road",
  town: "BREADSTONE",
  rating: 4,
  phone: "+447700870088",
  url: "https://namesbee.com/car-dealership-names/",
  postcode: "GL13 1XD",
});

const props: Props = {
  dealerInfo: dealer,
  distance: undefined,
  canMakeCall: false,
};

describe("CarDealerInformation", () => {
  it("renders correctly on load", () => {
    const wrapper = create(<CarDealerInformation {...props} />).toJSON();

    expect(wrapper).toMatchSnapshot();
  });

  it("should render props value correctly in UI", () => {
    const wrapper = create(<CarDealerInformation {...props} />).root;

    expect(
      wrapper.findByProps({
        className: "dealer-name",
      }).props.children
    ).toContain(props.dealerInfo.dealerName);

    expect(
      wrapper.findByProps({
        className: "dealer-info dealer-address",
      }).props.children
    ).toContain(props.dealerInfo.town);

    expect(
      wrapper.findByProps({
        className: "dealer-info dealer-phone",
      }).props.children
    ).toContain(props.dealerInfo.phone);

    expect(
      wrapper.findByProps({
        className: "dealer-info dealer-rating",
      }).props.children
    ).toEqual(props.dealerInfo.rating);

    expect(wrapper.findByType("a").props.href).toContain(props.dealerInfo.url);
  });

  it("when value of distance prop is null, should render only town name", () => {
    const wrapper = create(<CarDealerInformation {...props} />).root;

    expect(
      wrapper.findByProps({
        className: "dealer-info dealer-address",
      }).props.children
    ).toContain(props.dealerInfo.town);
  });

  it("when value of distance prop is not null, should render town name with distance", () => {
    props.distance = 2.6;
    const wrapper = create(<CarDealerInformation {...props} />).root;

    expect(
      wrapper.findByProps({
        className: "dealer-info dealer-address",
      }).props.children
    ).toContain(`${props.dealerInfo.town} (${props.distance} miles)`);
  });
});
