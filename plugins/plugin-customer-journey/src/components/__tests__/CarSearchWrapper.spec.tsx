import { mount } from "enzyme";
import flushPromises from "flush-promises";
import React from "react";
import { act } from "react-dom/test-utils";
import { create } from "react-test-renderer";

import { ItemModel } from "@common/components";
import { Manager } from "@twilio/flex-ui";

import { VehicleVRMSearchRequestModel } from "../../models/VehicleVRMSearchRequestModel";
import { QuoteDetailModel } from "../../models/QuoteDetailModel";
import { VehicleDetailModel } from "../../models/VehicleDetailModel";
import { VehicleSearchRequestModel } from "../../models/VehicleSearchRequestModel";
import { VehicleSummaryDetailModel } from "../../models/VehicleSummaryDetailModel";
import { flexManagerMock } from "../__mocks__/MockData";
import CarSearchWrapper, {
  ComponentProps,
} from "../Wizard/CarSearchStep/CarSearchWrapper/CarSearchWrapper";

jest.mock("../../services/static.service");
jest.mock("../../services/vehicle.service");
jest.mock("../../services/application.service");
jest.mock(
  "../Wizard/CarSearchStep/CarSearchCriteria/CarSearchCriteria.Container"
);
jest.mock("../Wizard/CarSearchStep/CarSearchResult/CarSearchResult.Container");
jest.mock("../Wizard/CarSearchStep/CarSearchResult/CarSearchResult");

const mockGetDropdownData = jest.fn();
const mockVehicleSearch = jest.fn();
const mockGetQuoteList = jest.fn();
const mockShowErrorMessage = jest.fn();
const mockGetSavedVehicles = jest.fn();
const mockUpdateSavedVehicles = jest.fn();
const mockVehicleSearchByVRM = jest.fn();

jest.mock("../../services/static.service", () => ({
  useStaticService: jest.fn(() => ({
    getVehicleSearchDropdownData: mockGetDropdownData,
  })),
}));

jest.mock("../../services/vehicle.service", () => ({
  useVehicleService: jest.fn(() => ({
    vehicleSearch: mockVehicleSearch,
    vehicleSearchByVRM: mockVehicleSearchByVRM,
  })),
}));

jest.mock("../../services/application.service", () => ({
  useApplicationService: jest.fn(() => ({
    getQuoteList: mockGetQuoteList,
    getSavedVehicles: mockGetSavedVehicles,
    updateSavedVehicles: mockUpdateSavedVehicles,
  })),
}));

jest.mock("../../Notifications", () => ({
  showErrorMessage: jest.fn(() => mockShowErrorMessage),
}));

jest.mock("@common/components", () => {
  const components = jest.requireActual("@common/components");
  return {
    ...components,
    WizardStepWrapper: jest.fn(({ children, onNext, onPrevious }) => {
      return (
        <div>
          <button type="button" className="onNext" onClick={onNext}>
            onNext
          </button>
          <button type="button" className="onPrevious" onClick={onPrevious}>
            onPrevious
          </button>
          {children}
        </div>
      );
    }),
  };
});

Manager.getInstance = flexManagerMock;

const defaultProps: ComponentProps = {
  postCode: "",
  applicationId: 1,
  filters: new VehicleSearchRequestModel(),
  isVehicleStaticDataFetched: true,
  hasSavedQuotes: false,
  savedVehicleCount: 0,
  setVehicleSearchDropdownData: jest.fn(() => {}),
  setVehicleStaticDataFetched: jest.fn(() => {}),
  setVehicles: jest.fn(() => {}),
  setSavedVehicles: jest.fn(() => {}),
  setSavedQuotes: jest.fn(() => {}),
  setTotalVehicles: jest.fn(() => {}),
  vrmFilters: new VehicleVRMSearchRequestModel(),
};

const items: ItemModel[] = [
  { id: 1, name: "test1" },
  { id: 2, name: "test2" },
  { id: 3, name: "test3" },
];

const dropdownData = {
  make: [
    {
      id: 1,
      name: "test1",
      models: [
        { id: 1, name: "test1", count: 1 },
        { id: 2, name: "test2", count: 2 },
      ],
    },
    {
      id: 2,
      name: "test2",
      models: [
        { id: 1, name: "test1", count: 1 },
        { id: 2, name: "test2", count: 2 },
      ],
    },
    {
      id: 3,
      name: "test3",
      models: [
        { id: 1, name: "test1", count: 1 },
        { id: 2, name: "test2", count: 2 },
      ],
    },
  ],
  bodyType: items,
  colour: items,
  fuelType: items,
  transmission: items,
  distance: [2, 5, 7],
};

const searchResultData = {
  page: 0,
  pageSize: 0,
  total: 0,
  vehicles: [new VehicleSummaryDetailModel()],
};

let props: ComponentProps = defaultProps;

Manager.getInstance = flexManagerMock;

describe("CarSearchWrapper", () => {
  beforeEach(() => {
    props = defaultProps;
    mockGetDropdownData.mockResolvedValueOnce(() =>
      Promise.resolve(dropdownData)
    );
    mockGetQuoteList.mockResolvedValueOnce(() =>
      Promise.resolve([new QuoteDetailModel()])
    );
    mockVehicleSearch.mockResolvedValueOnce(() =>
      Promise.resolve(searchResultData)
    );
    mockGetSavedVehicles.mockImplementation(() =>
      Promise.resolve([new VehicleDetailModel()])
    );
    mockVehicleSearchByVRM.mockResolvedValueOnce(() =>
      Promise.resolve(searchResultData)
    );
  });

  afterEach(() => {
    mockGetDropdownData.mockClear();
    mockGetQuoteList.mockClear();
    mockVehicleSearch.mockClear();
    mockGetSavedVehicles.mockClear();
    mockVehicleSearchByVRM.mockClear();

    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it("renders correctly, without any props", async () => {
    const wrapper = create(<CarSearchWrapper {...props} />).toJSON();
    await flushPromises();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders correctly, with props", async () => {
    props.moveForward = jest.fn();
    props.moveBackward = jest.fn();
    const wrapper = create(<CarSearchWrapper {...props} />).toJSON();
    await flushPromises();
    expect(wrapper).toMatchSnapshot();
  });

  it("when next button clicked and move forward event is provided, move forward event should be emitted", async () => {
    const moveForward = jest.fn();
    props.moveForward = moveForward;
    const wrapper = mount(<CarSearchWrapper {...props} />);
    await flushPromises();
    wrapper.find(".onNext").last().simulate("click");

    expect(moveForward).toHaveBeenCalledTimes(1);
  });

  it("when previous button clicked and move backward event is provided, move backward event should be emitted", async () => {
    const moveBackward = jest.fn();
    props.moveBackward = moveBackward;
    const wrapper = mount(<CarSearchWrapper {...props} />);
    await flushPromises();
    wrapper.find(".onPrevious").last().simulate("click");

    expect(moveBackward).toHaveBeenCalledTimes(1);
  });

  it("should fetch dropdownData if not fetched", async () => {
    const moveBackward = jest.fn();
    props.moveBackward = moveBackward;
    props.isVehicleStaticDataFetched = false;

    mockGetDropdownData.mockImplementationOnce(() =>
      Promise.resolve(dropdownData)
    );
    mockVehicleSearch.mockImplementationOnce(() =>
      Promise.resolve(searchResultData)
    );

    await act(async () => {
      const wrapper = mount(<CarSearchWrapper {...props} />);
      await flushPromises();
      wrapper.update();

      expect(mockGetDropdownData).toHaveBeenCalledTimes(1);
    });
  });

  it("should not fetch dropdownData if data already stored in store", async () => {
    const moveBackward = jest.fn();
    props.moveBackward = moveBackward;
    props.isVehicleStaticDataFetched = true;

    mockGetDropdownData.mockImplementationOnce(() =>
      Promise.resolve(dropdownData)
    );

    await act(async () => {
      const wrapper = mount(<CarSearchWrapper {...props} />);
      await flushPromises();
      wrapper.update();

      expect(mockGetDropdownData).not.toHaveBeenCalled();
    });
  });

  it("when search button is clicked, vehicleSearch API should be called", async () => {
    const moveBackward = jest.fn();
    props.moveBackward = moveBackward;
    props.postCode = "test";
    props.filters = Object.assign(new VehicleSearchRequestModel(), {
      distance: 3,
    });

    mockVehicleSearch.mockImplementationOnce(() =>
      Promise.resolve(searchResultData)
    );

    await act(async () => {
      const wrapper = mount(<CarSearchWrapper {...props} />);
      await flushPromises();
      wrapper.update();

      expect(mockVehicleSearch).toHaveBeenCalled();
    });
  });

  it("should fetch quote list when application id is present", async () => {
    props.applicationId = 1;

    mockGetQuoteList.mockImplementationOnce(() =>
      Promise.resolve(new QuoteDetailModel())
    );
    mockVehicleSearch.mockImplementationOnce(() =>
      Promise.resolve(searchResultData)
    );

    await act(async () => {
      const wrapper = mount(<CarSearchWrapper {...props} />);
      wrapper.update();
      await flushPromises();
      wrapper.update();
    });

    expect(mockGetQuoteList).toHaveBeenCalledTimes(1);
  });

  it("should not fetch quote list if application id is not present", async () => {
    props.applicationId = 0;

    mockGetQuoteList.mockImplementationOnce(() =>
      Promise.resolve([new QuoteDetailModel()])
    );

    await act(async () => {
      const wrapper = mount(<CarSearchWrapper {...props} />);
      wrapper.update();
      await flushPromises();
      wrapper.update();
    });

    expect(mockGetQuoteList).not.toHaveBeenCalled();
  });

  it("should fetch saved cars, when application id is present", async () => {
    props.applicationId = 1;

    mockVehicleSearch.mockImplementationOnce(() =>
      Promise.resolve(searchResultData)
    );

    await act(async () => {
      const wrapper = mount(<CarSearchWrapper {...props} />);
      wrapper.update();
      await flushPromises();
      wrapper.update();
    });

    expect(mockGetSavedVehicles).toHaveBeenCalledTimes(1);
  });

  it("when search by vrm button is clicked, vehicleSearchByVRM API should be called", async () => {
    const moveBackward = jest.fn();
    props.moveBackward = moveBackward;
    props.filters.distance = null;
    props.vrmFilters = Object.assign(new VehicleVRMSearchRequestModel(), {
      vrm: "test",
    });

    mockVehicleSearchByVRM.mockImplementationOnce(() =>
      Promise.resolve(searchResultData)
    );

    await act(async () => {
      const wrapper = mount(<CarSearchWrapper {...props} />);
      await flushPromises();
      wrapper.update();

      expect(mockVehicleSearchByVRM).toHaveBeenCalled();
    });
  });
});
