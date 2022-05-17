import React from "react";
import { create } from "react-test-renderer";
import flushPromises from "flush-promises";
import { Manager } from "@twilio/flex-ui";
import { mount } from "enzyme";
import { VehicleSortingOptions } from "../../common/enum";
import { VehicleSummaryDetailModel } from "../../models/VehicleSummaryDetailModel";
import CarSearchResultDetailWrapperContainer from "../Wizard/CarSearchStep/CarSearchResultDetailWrapper/CarSearchResultDetailWrapper.Container";
import SavedCarsList, {
  ComponentProps,
} from "../Wizard/CarSearchStep/SavedCarsList/SavedCarsList";
import { flexManagerMock } from "../__mocks__/MockData";

jest.mock(
  "../Wizard/CarSearchStep/CarSearchResultDetailWrapper/CarSearchResultDetailWrapper.Container"
);
jest.mock(
  "../Wizard/CarSearchStep/CarSearchResultDetailWrapper/CarSearchResultDetailWrapper"
);

jest.mock("@common/components", () => {
  const components = jest.requireActual("@common/components");
  return {
    ...components,
  };
});

Manager.getInstance = flexManagerMock;

const defaultProps: ComponentProps = {
  savedVehicles: [],
  totalSavedVehicles: 0,
  sort: VehicleSortingOptions.PriceDescending,
  setSort: jest.fn(),
};

let props: ComponentProps = defaultProps;

Manager.getInstance = flexManagerMock;

describe("SavedCarsList", () => {
  beforeEach(() => {
    props = { ...defaultProps };
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it("renders correctly, if no vehicle found", async () => {
    const wrapper = create(<SavedCarsList {...props} />).toJSON();
    await flushPromises();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders correctly, if vehicle found in search list", async () => {
    props.totalSavedVehicles = 1;
    props.savedVehicles = [new VehicleSummaryDetailModel()];

    const wrapper = create(<SavedCarsList {...props} />).toJSON();
    await flushPromises();
    expect(wrapper).toMatchSnapshot();
  });

  it("should render vehicle details wrapper component if vehicles present", async () => {
    props.totalSavedVehicles = 1;
    props.savedVehicles = [new VehicleSummaryDetailModel()];

    const wrapper = mount(<SavedCarsList {...props} />);
    await flushPromises();
    wrapper.update();

    expect(
      wrapper.find(CarSearchResultDetailWrapperContainer).exists()
    ).toBeTruthy();
  });

  it("should not render vehicle details wrapper component if vehicles are not present", async () => {
    props.totalSavedVehicles = 0;
    props.savedVehicles = [];

    const wrapper = mount(<SavedCarsList {...props} />);
    await flushPromises();
    wrapper.update();

    expect(
      wrapper.find(CarSearchResultDetailWrapperContainer).exists()
    ).toBeFalsy();
  });

  it("should show no cars found message if no vehicles found", async () => {
    props.totalSavedVehicles = 0;
    props.savedVehicles = [];

    const wrapper = mount(<SavedCarsList {...props} />);
    await flushPromises();
    wrapper.update();

    expect(wrapper.html()).toContain("No cars saved.");
  });

  it("should show number of vehicles found in the search", async () => {
    props.totalSavedVehicles = 1;
    props.savedVehicles = [new VehicleSummaryDetailModel()];

    const wrapper = mount(<SavedCarsList {...props} />);
    await flushPromises();
    wrapper.update();

    expect(wrapper.html()).toContain("1 result");
  });
});
