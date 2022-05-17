import React from "react";
import { mount } from "enzyme";
import { create, act, ReactTestRenderer } from "react-test-renderer";
import { act as Act } from "react-dom/test-utils";
import { Manager } from "@twilio/flex-ui";
import { flexManagerMock } from "../__mocks__/MockData";
import CarDetailViewDialog, {
  CarDetailViewDialogProps,
} from "../CarDetailViewDialog/CarDetailViewDialog";
import {
  StateToProps,
  DispatchToProps,
} from "../CarDetailViewDialog/CarDetailViewDialog.Props";
import { VehicleDetailModel } from "../../models/VehicleDetailModel";
import { showErrorMessage } from "../../Notifications";
import CarDealerInformation from "../CarDealerInformation/CarDealerInformation.Container";
import { DealerResponseModel } from "../../models/DealerResponseModel";

type Props = StateToProps & DispatchToProps & CarDetailViewDialogProps;

const props: Props = {
  open: true,
  handleCloseDialog: jest.fn(() => {}),
  vehicleId: 901,
  postCode: "Postcode",
};

Manager.getInstance = flexManagerMock;

jest.mock("../../Notifications", () => {
  return {
    showErrorMessage: jest.fn(() => {}),
  };
});

jest.mock("../../services/vehicle.service");

const mockGetVehicleDetail = jest.fn();

jest.mock("../../services/vehicle.service", () => ({
  useVehicleService: jest.fn(() => ({
    getVehicleDetail: mockGetVehicleDetail,
  })),
}));

jest.mock("@common/components", () => {
  const components = jest.requireActual("@common/components");
  return {
    ...components,
    ResponsiveDialog: jest.fn(({ children }) => children),
    Shared: {
      getFormattedCurrencyValue: jest.fn((value) => {
        return value;
      }),
      getFormattedText: jest.fn((value) => {
        return value.join("| ");
      }),
    },
  };
});

jest.mock("../CarDealerInformation/CarDealerInformation.Container");
jest.mock("../CarDealerInformation/CarDealerInformation");

const vehicleDetail = Object.assign(new VehicleDetailModel(), {
  vehicleId: "901",
  dealerAdminFee: 200,
  image: "ImageUrl",
  images: ["ImageUrl"],
  make: "Bentley Motors",
  model: "Bentley Continental GT",
  price: 500000,
  mileage: 13,
  regNumber: "BM12853",
  regYear: 2016,
  year: 2016,
  trans: "Automatic",
  fuel: "Petrol",
  body: "Convertible",
  colour: "white",
  dealer: Object.assign(new DealerResponseModel(), {
    dealerName: "MR john",
    county: "UK",
    building: null,
    streetName: "46 Grenoble Road",
    town: "BREADSTONE",
    rating: 4.5,
    phone: "+447700870088",
    url: "https://namesbee.com/car-dealership-names/",
    postcode: "GL13 1XD",
  }),
  specs: [
    {
      name: "BI-OCULAR-NC3000",
      desc: "Night Vision Single Tube Bi-ocular",
    },
  ],
});

const GetVehicleDetail = () => {
  mockGetVehicleDetail.mockImplementationOnce(() =>
    Promise.resolve(vehicleDetail)
  );
};

jest.mock("../VehicleImage/VehicleImage", () => {
  return {
    __esModule: true,
    VehicleImage: () => {
      return <div className="vehicleImage">Vehicle Image</div>;
    },
  };
});

describe("CarDetailViewDialog", () => {
  it("renders correctly on load", async () => {
    GetVehicleDetail();
    let wrapper: ReactTestRenderer;
    await act(async () => {
      wrapper = create(<CarDetailViewDialog {...props} />);
    });

    expect(mockGetVehicleDetail).toHaveBeenCalled();
    expect(wrapper!.toJSON()).toMatchSnapshot();
  });

  it("should call getVehicleDetail API, when component is rendered", async () => {
    GetVehicleDetail();
    const wrapper = mount(<CarDetailViewDialog {...props} />);

    expect(wrapper.find(".progress").exists()).toBeTruthy();
    await Act(async () => {
      expect(mockGetVehicleDetail).toHaveBeenCalled();
    });
    wrapper.update();

    expect(wrapper.find(".progress").exists()).toBeFalsy();
    expect(wrapper.find(".car-dialog-image").exists()).toBeTruthy();
  });

  it("Error message should be displayed, when should call getVehicleDetail API returns an error", async () => {
    mockGetVehicleDetail.mockImplementationOnce(() =>
      Promise.reject({ statusCode: 500 })
    );
    mount(<CarDetailViewDialog {...props} />);

    await Act(async () => {
      expect(mockGetVehicleDetail).toHaveBeenCalled();
    });
    expect(showErrorMessage).toHaveBeenCalledWith(
      "Error loading vehicle detail, please try again!",
      "",
      true
    );
    expect(props.handleCloseDialog).toHaveBeenCalled();
  });

  it("should render VehicleImage and CarDealerInformation components", async () => {
    GetVehicleDetail();
    const wrapper = mount(<CarDetailViewDialog {...props} />);

    await Act(async () => {
      expect(mockGetVehicleDetail).toHaveBeenCalled();
    });
    wrapper.update();

    expect(wrapper.find(".vehicleImage").exists()).toBeTruthy();
    expect(wrapper.find(CarDealerInformation).exists()).toBeTruthy();
  });
});
