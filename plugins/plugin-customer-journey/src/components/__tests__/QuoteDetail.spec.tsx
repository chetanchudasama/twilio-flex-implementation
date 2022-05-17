import React from "react";
import { Actions } from "@twilio/flex-ui";
import { create } from "react-test-renderer";
import { mount } from "enzyme";
import { QuoteDetailModel } from "../../models/QuoteDetailModel";
import QuoteDetail, {
  QuoteDetailProp,
} from "../Wizard/QuotesStep/QuoteDetail/QuoteDetail";
import { VehicleImage } from "../VehicleImage/VehicleImage";
import CarDealerInformation from "../CarDealerInformation/CarDealerInformation.Container";

jest.mock("@twilio/flex-ui", () => {
  return {
    Actions: { invokeAction: jest.fn(() => {}) },
  };
});

jest.mock("../CarDetailViewDialog/CarDetailViewDialog.Container", () => {
  return {
    __esModule: true,
    default: () => {
      return <div className="car-detail-dialog">Car Detail View Dialog</div>;
    },
  };
});

jest.mock("../CarDealerInformation/CarDealerInformation.Container");
jest.mock("../CarDealerInformation/CarDealerInformation");

jest.mock("../Wizard/QuotesStep/QuoteDialog/QuoteDialog.Container", () => {
  return {
    __esModule: true,
    default: () => {
      return <div className="quote-dialog">Quote Dialog</div>;
    },
  };
});

const props: QuoteDetailProp = {
  quoteDetail: Object.assign(new QuoteDetailModel(), {
    amountToFinance: 10000,
    applicationId: 1,
    apr: 19,
    body: "Estote",
    colour: "Beige",
    created: new Date("2021-07-01 05:30"),
    createdByUserId: 18,
    deposit: 10000,
    distance: 55,
    doorsCount: 5,
    engine: 2,
    fuel: "Diesel Hybrid",
    hasImages: true,
    is247Cars: true,
    isAccepted: true,
    keywords: "mechanic",
    lenderId: 13,
    make: "Land Rover",
    mileage: 13050,
    model: "Discovery Sport",
    monthlyPayment: 4500,
    options: "Dealer-Installed Accessories",
    partExchangeMileage: 2300,
    partExchangeRegistration: "ERT0186980",
    partExchangeSettlement: 1600,
    partExchangeValue: 1600,
    price: 110000,
    priceMonthly: 900,
    quoteId: 5,
    reducedPrice: 90000,
    regNumber: "ST17XYZ",
    regYear: 2011,
    specs: null,
    term: 60,
    tierId: 18,
    totalAmountPayable: 75000,
    trans: "Manual",
    trim: "LX",
    vehicleExtras: {
      vehicleExtraOptionId: 1,
      vehicleExtraTypeId: 1,
      vehicleExtraTypeName: "leather",
      description: "leather",
      price: 100,
    },
    vehicleId: 991,
    year: 2017,
    images: ["Image"],
    dealer: {
      county: "Cheshire",
      dealerId: 16,
      dealerName: "Abby R Farrell",
      phone: "+448580870088",
      postcode: "CW9 4HB",
      rating: "4.5",
      streetName: "41 Lammas Street",
      town: "GREAT BUDWORTH",
      url: "https://namesbee.com/car-dealership-names/",
    },
  }),
};

describe("QuoteDetail", () => {
  it("renders correctly", async () => {
    const wrapper = create(<QuoteDetail {...props} />).toJSON();

    expect(wrapper).toMatchSnapshot();
  });

  it("should render VehicleImage component", async () => {
    const wrapper = mount(<QuoteDetail {...props} />);

    expect(wrapper.find(VehicleImage).exists()).toBeTruthy();
  });

  it("should render CarDealerInformation component", async () => {
    const wrapper = mount(<QuoteDetail {...props} />);

    expect(wrapper.find(CarDealerInformation).exists()).toBeTruthy();
  });

  it("when view more detail link is clicked, CarDetailViewDialog component should be rendered", async () => {
    const wrapper = mount(<QuoteDetail {...props} />);

    wrapper.find(".view-more-detail-link").at(1).simulate("click");

    expect(wrapper.find(".car-detail-dialog").exists()).toBeTruthy();
  });

  it("when value of isAccepted flag is true, proceed with quote button should be displayed", async () => {
    const wrapper = mount(<QuoteDetail {...props} />);

    expect(wrapper.find(".view-deal-sheet-btn").exists()).toBeTruthy();
  });

  it("when value of isAccepted flag is false, proceed with quote button should not be displayed", async () => {
    props.quoteDetail.isAccepted = false;
    const wrapper = mount(<QuoteDetail {...props} />);

    expect(wrapper.find(".view-deal-sheet-btn").exists()).toBeFalsy();
  });

  it("when proceed with quote button is called, MoveToDealSheetStep Action should be called", async () => {
    props.quoteDetail.isAccepted = true;
    const wrapper = mount(<QuoteDetail {...props} />);

    expect(wrapper.find(".view-deal-sheet-btn").exists()).toBeTruthy();

    const spy = jest.spyOn(Actions, "invokeAction");

    wrapper.find(".view-deal-sheet-btn").at(1).simulate("click");

    expect(spy).toHaveBeenCalledWith("MoveToDealSheetStep", {});
  });

  it("when value of isAccepted flag is true, UI should be displayed in purple color", async () => {
    const wrapper = mount(<QuoteDetail {...props} />);

    expect(wrapper.find(".secondary-background").exists()).toBeTruthy();
    expect(wrapper.find(".secondary-border").exists()).toBeTruthy();
    expect(wrapper.find(".check-icon").exists()).toBeTruthy();
  });

  it("when value of isAccepted flag is false, UI should be displayed in grey color", async () => {
    props.quoteDetail.isAccepted = false;
    const wrapper = mount(<QuoteDetail {...props} />);

    expect(wrapper.find(".grey-background").exists()).toBeTruthy();
    expect(wrapper.find(".grey-border").exists()).toBeTruthy();
    expect(wrapper.find(".check-icon").exists()).toBeFalsy();
  });

  it("when edit quote button is called, Quote Dialog should be displayed", async () => {
    props.quoteDetail.isAccepted = true;
    const wrapper = mount(<QuoteDetail {...props} />);

    expect(wrapper.find(".edit-quote-btn").exists()).toBeTruthy();

    wrapper.find(".edit-quote-btn").at(1).simulate("click");

    expect(wrapper.find(".quote-dialog").exists()).toBeTruthy();
  });

  it("when value of acceptedDateTime prop is not null, should render customer accepted date time in UI", async () => {
    props.quoteDetail.isAccepted = true;
    props.quoteDetail.acceptedDateTime = new Date("2021-07-09 05:30");
    const wrapper = mount(<QuoteDetail {...props} />);

    expect(wrapper.find(".customer-accepted-date").exists()).toBeTruthy();

    expect(wrapper.find(".customer-accepted-date").html()).toContain(
      "Accepted By Customer 09/07/2021 05:30"
    );
  });
});
