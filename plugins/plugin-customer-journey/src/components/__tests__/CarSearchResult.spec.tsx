import React from "react";
import { create } from "react-test-renderer";
import flushPromises from "flush-promises";
import { Manager } from "@twilio/flex-ui";
import { mount } from "enzyme";
import { CarRegisteredSnackbar } from "../CarRegisteredSnackbar/CarRegisteredSnackbar";
import { DealerStateType } from "../../common/enum";
import { DealerStateSnackbar } from "../DealerStateSnackbar/DealerStateSnackbar";
import CarSearchResult, {
  ComponentProps,
} from "../Wizard/CarSearchStep/CarSearchResult/CarSearchResult";
import { VehicleSummaryDetailModel } from "../../models/VehicleSummaryDetailModel";
import { VehicleSearchRequestModel } from "../../models/VehicleSearchRequestModel";
import CarSearchResultDetailWrapperContainer from "../Wizard/CarSearchStep/CarSearchResultDetailWrapper/CarSearchResultDetailWrapper.Container";
import { flexManagerMock } from "../__mocks__/MockData";
import { VehicleVRMSearchRequestModel } from "../../models/VehicleVRMSearchRequestModel";

jest.mock(
  "../Wizard/CarSearchStep/CarSearchResultDetailWrapper/CarSearchResultDetailWrapper.Container"
);
jest.mock(
  "../Wizard/CarSearchStep/CarSearchResultDetailWrapper/CarSearchResultDetailWrapper"
);
jest.mock("../CarRegisteredSnackbar/CarRegisteredSnackbar");

jest.mock("@common/components", () => {
  const components = jest.requireActual("@common/components");
  return {
    ...components,
  };
});

Manager.getInstance = flexManagerMock;

const defaultProps: ComponentProps = {
  vehicles: [],
  filters: new VehicleSearchRequestModel(),
  totalVehicles: 0,
  setFilters: jest.fn(() => {}),
  vrmFilters: new VehicleVRMSearchRequestModel(),
};

let props: ComponentProps = defaultProps;

Manager.getInstance = flexManagerMock;

describe("CarSearchResult", () => {
  beforeEach(() => {
    props = { ...defaultProps };
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it("renders correctly, if no vehicle found", async () => {
    const wrapper = create(<CarSearchResult {...props} />).toJSON();
    await flushPromises();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders correctly, if vehicle found in search list", async () => {
    props.totalVehicles = 1;
    props.vehicles = [new VehicleSummaryDetailModel()];

    const wrapper = create(<CarSearchResult {...props} />).toJSON();
    await flushPromises();
    expect(wrapper).toMatchSnapshot();
  });

  it("should render vehicle details wrapper component if vehicles present", async () => {
    props.totalVehicles = 1;
    props.vehicles = [new VehicleSummaryDetailModel()];

    const wrapper = mount(<CarSearchResult {...props} />);
    await flushPromises();
    wrapper.update();

    expect(
      wrapper.find(CarSearchResultDetailWrapperContainer).exists()
    ).toBeTruthy();
  });

  it("should not render vehicle details wrapper component if vehicles are not present", async () => {
    props.totalVehicles = 0;
    props.vehicles = [];

    const wrapper = mount(<CarSearchResult {...props} />);
    await flushPromises();
    wrapper.update();

    expect(
      wrapper.find(CarSearchResultDetailWrapperContainer).exists()
    ).toBeFalsy();
  });

  it("should show no cars found message if no vehicles found", async () => {
    props.totalVehicles = 0;
    props.vehicles = [];

    const wrapper = mount(<CarSearchResult {...props} />);
    await flushPromises();
    wrapper.update();

    expect(wrapper.html()).toContain("No cars found.");
  });

  it("should show number of vehicles found in the search", async () => {
    props.totalVehicles = 1;
    props.vehicles = [new VehicleSummaryDetailModel()];

    const wrapper = mount(<CarSearchResult {...props} />);
    await flushPromises();
    wrapper.update();

    expect(wrapper.html()).toContain("1 result");
  });

  it("when value of distance is null in filters, should render CarRegisteredSnackbar in UI", async () => {
    props.filters.distance = null;
    props.totalVehicles = 1;
    props.vehicles = [new VehicleSummaryDetailModel()];
    const wrapper = mount(<CarSearchResult {...props} />);

    expect(wrapper.find(CarRegisteredSnackbar).exists()).toBeTruthy();
  });

  it("should not render DealerStateSnackbar component, if dealerId is null", async () => {
    props.totalVehicles = 1;
    props.vehicles = [new VehicleSummaryDetailModel()];

    const wrapper = mount(<CarSearchResult {...props} />);
    await flushPromises();
    wrapper.update();

    expect(wrapper.find(DealerStateSnackbar).exists()).toBeFalsy();
  });

  it("should not render DealerStateSnackbar component, if dealer state is approved", async () => {
    props.totalVehicles = 1;
    props.filters.dealerId = 2;
    props.vehicles = [new VehicleSummaryDetailModel()];
    props.vehicles[0].dealer.state = DealerStateType.Approved;

    const wrapper = mount(<CarSearchResult {...props} />);
    await flushPromises();
    wrapper.update();

    expect(wrapper.find(DealerStateSnackbar).exists()).toBeFalsy();
  });

  it("should render DealerStateSnackbar component, if dealerId is not null and dealer state is not approved", async () => {
    props.totalVehicles = 1;
    props.filters.dealerId = 2;
    props.vehicles = [new VehicleSummaryDetailModel()];
    props.vehicles[0].dealer.state = DealerStateType.Declined;

    const wrapper = mount(<CarSearchResult {...props} />);
    await flushPromises();
    wrapper.update();

    expect(wrapper.find(DealerStateSnackbar).exists()).toBeTruthy();
  });
});
