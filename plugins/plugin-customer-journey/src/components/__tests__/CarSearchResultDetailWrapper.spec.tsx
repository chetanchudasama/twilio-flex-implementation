import { Manager } from "@twilio/flex-ui";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import flushPromises from "flush-promises";
import React from "react";
import { create } from "react-test-renderer";
import { SnackbarMessage } from "@common/components";
import { SendCarRequestModel } from "../../models/SendCarRequestModel";
import CarSearchResultDetailWrapper, {
  CarSearchResultDetailWrapperProp,
} from "../Wizard/CarSearchStep/CarSearchResultDetailWrapper/CarSearchResultDetailWrapper";
import {
  DispatchToProps,
  StateToProps,
} from "../Wizard/CarSearchStep/CarSearchResultDetailWrapper/CarSearchResultDetailWrapper.Props";
import { VehicleSummaryDetailModel } from "../../models/VehicleSummaryDetailModel";
import CarSearchResultDetail from "../Wizard/CarSearchStep/CarSearchResultDetail/CarSearchResultDetail";
import { showErrorMessage } from "../../Notifications";
import { ChannelType } from "../../common/enum";
import { flexManagerMock } from "../__mocks__/MockData";
import { VehicleDetailModel } from "../../models/VehicleDetailModel";

const vehicleDetail = new VehicleSummaryDetailModel();
vehicleDetail.vehicleId = 1;

const savedCar = new VehicleDetailModel();
savedCar.vehicleId = 1;

const sendCarRequestModel = new SendCarRequestModel();
sendCarRequestModel.applicationId = 1;
sendCarRequestModel.smsTypeId = 1;

const core: StateToProps & DispatchToProps & CarSearchResultDetailWrapperProp =
  {
    vehicleDetail,
    applicationId: 1,
    savedVehicles: [],
    mobileNumber: "",
    postCode: "",
    setSavedVehicles: jest.fn(),
  };
let props: StateToProps & DispatchToProps & CarSearchResultDetailWrapperProp = {
  ...core,
};

jest.mock("../../Notifications", () => {
  return {
    showErrorMessage: jest.fn(() => {}),
  };
});

jest.mock("../../services/application.service");
jest.mock("../../services/vehicle.service");

const mockSendCarDetail = jest.fn();
const mockDeleteSavedCar = jest.fn();
const mockGetVehicleDetail = jest.fn();
const mockUpdateSavedVehicles = jest.fn();

jest.mock("../../services/application.service", () => ({
  useApplicationService: jest.fn(() => ({
    sendCarDetail: mockSendCarDetail,
    deleteSavedCar: mockDeleteSavedCar,
    updateSavedVehicles: mockUpdateSavedVehicles,
  })),
}));
jest.mock("../../services/vehicle.service", () => ({
  useVehicleService: jest.fn(() => ({
    getVehicleDetail: mockGetVehicleDetail,
  })),
}));

jest.mock(
  "../Wizard/CarSearchStep/CarSearchResultDetail/CarSearchResultDetail"
);

Manager.getInstance = flexManagerMock;

describe("CarSearchResultDetailWrapper", () => {
  beforeEach(() => {
    props = { ...core };
  });
  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it("renders correctly", () => {
    const wrapper = create(
      <CarSearchResultDetailWrapper {...props} />
    ).toJSON();

    expect(wrapper).toMatchSnapshot();
  });

  it("when saveCarDetail is called from CarSearchResultDetail component, vehicleDetail should be fetched for vehicle", async () => {
    mockGetVehicleDetail.mockImplementationOnce(() =>
      Promise.resolve(savedCar)
    );
    mockUpdateSavedVehicles.mockImplementationOnce(() => Promise.resolve());

    const wrapper = mount(<CarSearchResultDetailWrapper {...props} />);

    expect(wrapper.find(CarSearchResultDetail).exists()).toBeTruthy();

    await act(async () => {
      wrapper
        .find(CarSearchResultDetail)
        .invoke<"saveCarDetail">("saveCarDetail")();
      wrapper.update();
      await flushPromises();
      wrapper.update();

      expect(mockGetVehicleDetail).toHaveBeenCalled();
    });
  });

  it("should show error message and should not update savedVehicles list, if api for fetching vehicle gives error", async () => {
    mockGetVehicleDetail.mockImplementationOnce(() =>
      Promise.reject({ statusCode: 500 })
    );

    const wrapper = mount(<CarSearchResultDetailWrapper {...props} />);

    expect(wrapper.find(CarSearchResultDetail).exists()).toBeTruthy();

    await act(async () => {
      wrapper
        .find(CarSearchResultDetail)
        .invoke<"saveCarDetail">("saveCarDetail")();
      wrapper.update();
      await flushPromises();
      wrapper.update();
    });

    expect(showErrorMessage).toHaveBeenCalledWith(
      "Something went wrong, please try again!",
      "",
      true
    );
    expect(mockUpdateSavedVehicles).not.toHaveBeenCalled();
  });

  it("when saveCarDetail is called from CarSearchResultDetail component, saved vehicleList should be updated", async () => {
    mockGetVehicleDetail.mockImplementationOnce(() =>
      Promise.resolve(savedCar)
    );
    mockUpdateSavedVehicles.mockImplementationOnce(() =>
      Promise.resolve(undefined)
    );

    const wrapper = mount(<CarSearchResultDetailWrapper {...props} />);

    expect(wrapper.find(CarSearchResultDetail).exists()).toBeTruthy();

    await act(async () => {
      wrapper
        .find(CarSearchResultDetail)
        .invoke<"saveCarDetail">("saveCarDetail")();
      wrapper.update();
      await flushPromises();
      wrapper.update();

      expect(mockUpdateSavedVehicles).toHaveBeenCalledWith(
        props.applicationId,
        [savedCar]
      );
      expect(props.setSavedVehicles).toHaveBeenCalledWith([savedCar]);
    });
  });

  it("show error message and should not update stored list of saved vehicles, if api for updating saved vehicleList returns error", async () => {
    mockGetVehicleDetail.mockImplementationOnce(() =>
      Promise.resolve(savedCar)
    );
    mockUpdateSavedVehicles.mockImplementationOnce(() =>
      Promise.reject({ statusCode: 500 })
    );

    const wrapper = mount(<CarSearchResultDetailWrapper {...props} />);

    expect(wrapper.find(CarSearchResultDetail).exists()).toBeTruthy();

    await act(async () => {
      wrapper
        .find(CarSearchResultDetail)
        .invoke<"saveCarDetail">("saveCarDetail")();
      wrapper.update();
      await flushPromises();
      wrapper.update();

      expect(SnackbarMessage).toBeTruthy();
      expect(showErrorMessage).toHaveBeenCalledWith(
        "Something went wrong, please try again!",
        "",
        true
      );
      expect(props.setSavedVehicles).not.toHaveBeenCalled();
    });
  });

  it("when sendCarDetail is called from CarSearchResultDetail component, sendCarDetail API should be called", async () => {
    mockSendCarDetail.mockImplementationOnce(() => Promise.resolve(undefined));

    const wrapper = mount(<CarSearchResultDetailWrapper {...props} />);

    expect(wrapper.find(CarSearchResultDetail).exists()).toBeTruthy();

    await act(async () => {
      wrapper
        .find(CarSearchResultDetail)
        .invoke<"sendCarDetail">("sendCarDetail")(ChannelType.SMS);
      await flushPromises();

      expect(mockSendCarDetail).toHaveBeenCalledWith(sendCarRequestModel);
      expect(SnackbarMessage).toBeTruthy();
    });
  });

  it("when sendCarDetail API returns an error, error message should be displayed", async () => {
    mockSendCarDetail.mockImplementationOnce(() =>
      Promise.reject({ statusCode: 500 })
    );

    const wrapper = mount(<CarSearchResultDetailWrapper {...props} />);

    expect(wrapper.find(CarSearchResultDetail).exists()).toBeTruthy();

    await act(async () => {
      wrapper
        .find(CarSearchResultDetail)
        .invoke<"sendCarDetail">("sendCarDetail")(ChannelType.SMS);
      await flushPromises();

      expect(mockSendCarDetail).toHaveBeenCalledWith(sendCarRequestModel);
      expect(showErrorMessage).toHaveBeenCalledWith(
        "Something went wrong, please try again!",
        "",
        true
      );
    });
  });
});
