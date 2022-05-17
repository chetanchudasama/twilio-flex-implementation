import React from "react";
import { create, act } from "react-test-renderer";
import { mount, shallow } from "enzyme";
import { act as Act } from "react-dom/test-utils";
import { Manager } from "@twilio/flex-ui";
import flushPromises from "flush-promises";
import { CustomSnackbar } from "@common/components";
import { Checkbox } from "@material-ui/core";
import { DealerStateType } from "../../common/enum";
import { DealerStateSnackbar } from "../DealerStateSnackbar/DealerStateSnackbar";
import QuoteDialog, {
  QuoteDialogProps,
} from "../Wizard/QuotesStep/QuoteDialog/QuoteDialog";
import { QuoteDetailModel } from "../../models/QuoteDetailModel";
import { VehicleImage } from "../VehicleImage/VehicleImage";
import CarDealerInformation from "../CarDealerInformation/CarDealerInformation.Container";
import { DealerResponseModel } from "../../models/DealerResponseModel";
import QuoteSavedDialog from "../Wizard/QuotesStep/QuoteSavedDialog/QuoteSavedDialog";
import { flexManagerMock } from "../__mocks__/MockData";
import { CarRegisteredSnackbar } from "../CarRegisteredSnackbar/CarRegisteredSnackbar";

jest.mock("@common/components", () => {
  const components = jest.requireActual("@common/components");
  return {
    ...components,
    ResponsiveDialog: jest.fn(({ children }) => children),
  };
});

jest.mock("../../services/application.service");
jest.mock("../../services/vehicle.service");

const mockCreateQuote = jest.fn();
const mockGetVehicleExtraItemList = jest.fn();

jest.mock("../../services/application.service", () => ({
  useApplicationService: jest.fn(() => ({
    createQuote: mockCreateQuote,
  })),
}));

jest.mock("../../services/vehicle.service", () => ({
  useVehicleService: jest.fn(() => ({
    getVehicleExtraItemList: mockGetVehicleExtraItemList,
  })),
}));

jest.mock("../CarDealerInformation/CarDealerInformation.Container");
jest.mock("../CarDealerInformation/CarDealerInformation");
jest.mock("../DealerStateSnackbar/DealerStateSnackbar");
jest.mock("../CarRegisteredSnackbar/CarRegisteredSnackbar");

jest.mock("../../Notifications", () => {
  return {
    showErrorMessage: jest.fn(() => {}),
    showMessage: jest.fn(() => {}),
    CustomNotificationType: { SuccessNotification: "successNotification" },
  };
});

const vehicleExtraItems = [
  {
    vehicleExtraOptionId: 1,
    vehicleExtraTypeId: 1,
    vehicleExtraTypeName: "leather",
    description: "leather",
    price: 100,
  },
  {
    vehicleExtraOptionId: 2,
    vehicleExtraTypeId: 2,
    vehicleExtraTypeName: "upholstery",
    description: "upholstery",
    price: 200,
  },
];

const defaultProps = {
  open: true,
  quoteDetail: Object.assign(new QuoteDetailModel(), {
    regNumber: "AB13CDD",
    mileage: 10,
    price: 4000,
    make: "test",
    model: "test",
    term: 36,
  }),
  postCode: "123",
  applicationId: 1,
  handleCloseDialog: jest.fn(() => {}),
  saveQuote: jest.fn(() => {}),
  lenderId: 0,
  apr: 19.8,
  maxLendAmount: 10000,
  lenderName: "lenderName",
  vehicleExtraItemList: vehicleExtraItems,
  setVehicleExtraItemList: jest.fn(() => {}),
};

const quoteResultData = {
  applicationId: 1,
  quoteId: 12,
  lenderId: 0,
  tierId: 0,
  vehicleExtras: {
    vehicleExtraOptionId: 1,
    vehicleExtraTypeId: 1,
    vehicleExtraTypeName: "leather",
    description: "leather",
    price: 100,
  },
  partExchangeRegistration: "AA14ZZZ",
  partExchangeMileage: null,
  partExchangeValue: null,
  partExchangeSettlement: null,
  deposit: 0,
  term: 1,
  apr: 0,
  amountToFinance: 0,
  monthlyPayment: 0,
  totalAmountPayable: 0,
  createdByUserId: 12,
  created: new Date("2021-06-24T13:05:51.85976Z"),
  isAccepted: true,
  body: "Convertible",
  colour: "White",
  doorsCount: 5,
  specs: [
    {
      name: "test",
      desc: "test",
    },
  ],
  keywords: "Vehicle",
  hasImages: true,
  vehicleId: 987,
  make: "Audi",
  model: "A5",
  trans: "Automatic",
  fuel: "Petrol",
  trim: "Petrol",
  year: 2013,
  price: 70000,
  reducedPrice: 60000,
  priceMonthly: 400,
  mileage: 1700,
  options: "Luxury",
  date: new Date("2020-05-20T00:00:00Z"),
  distance: 40,
  is247Cars: true,
  regNumber: "AB13CDD",
  engine: 2.6,
  regYear: 2020,
  images: ["abc.jpg", "efg.jpg"],
  dealer: new DealerResponseModel(),
};

let props: QuoteDialogProps = defaultProps;

Manager.getInstance = flexManagerMock;

describe("QuoteDialog", () => {
  beforeEach(() => {
    props = defaultProps;
    mockCreateQuote.mockResolvedValueOnce(() =>
      Promise.resolve(quoteResultData)
    );
    mockGetVehicleExtraItemList.mockResolvedValueOnce(() =>
      Promise.resolve(vehicleExtraItems)
    );
  });

  afterEach(() => {
    mockCreateQuote.mockClear();
    mockGetVehicleExtraItemList.mockClear();

    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it("renders correctly", async () => {
    const wrapper = create(<QuoteDialog {...props} />).toJSON();

    expect(wrapper).toMatchSnapshot();
  });

  it("should render VehicleImage and CarDealerInformation component correctly in UI", async () => {
    const wrapper = mount(<QuoteDialog {...props} />);

    expect(wrapper.find(VehicleImage).exists()).toBeTruthy();
    expect(wrapper.find(CarDealerInformation).exists()).toBeTruthy();
  });

  it("should call handleCloseDialog method, when cancel button is clicked", () => {
    const wrapper = shallow(<QuoteDialog {...props} />);

    const spy = jest.spyOn(props, "handleCloseDialog");

    act(() => {
      wrapper.children().props().onCancel();
    });

    expect(spy).toHaveBeenCalled();
  });

  it("when save quote button is clicked, createQuote API should be called", async () => {
    const wrapper = shallow(<QuoteDialog {...props} />);

    mockCreateQuote.mockImplementationOnce(() =>
      Promise.resolve(quoteResultData)
    );

    act(() => {
      wrapper.children().props().onConfirm();
      expect(mockCreateQuote).toHaveBeenCalled();
    });
  });

  it("when save quote button is clicked, QuoteSavedDialog component rendered in UI", async () => {
    const wrapper = mount(<QuoteDialog {...props} />);

    mockCreateQuote.mockImplementationOnce(() =>
      Promise.resolve(quoteResultData)
    );

    await Act(async () => {
      wrapper.children().props().onConfirm();
      await flushPromises();
      expect(mockCreateQuote).toHaveBeenCalled();
    });
    wrapper.update();
    expect(wrapper.find(QuoteSavedDialog).exists()).toBeTruthy();
  });

  it("should display warning, if total payable amount exceeds maxLendAmount from the preferred lender", async () => {
    props.quoteDetail.deposit = 100;
    props.maxLendAmount = 1000;
    const wrapper = mount(<QuoteDialog {...props} />);
    wrapper.update();

    expect(wrapper.find(CustomSnackbar).exists()).toBeTruthy();
    expect(wrapper.find(CustomSnackbar).props().message).toEqual(
      "This exceeds the customer's maximum borrow amount by £2,921.45."
    );
  });

  it("when dealer state is not Approved, should render DealerStateSnackbar component in UI", async () => {
    props.quoteDetail.dealer.state = DealerStateType.Declined;
    const wrapper = mount(<QuoteDialog {...props} />);
    wrapper.update();

    expect(wrapper.find(DealerStateSnackbar).exists()).toBeTruthy();
  });

  it("when car is marked as CF247 car and dealer is approved, should render CarRegisteredSnackbar component in UI", async () => {
    props.quoteDetail.dealer.state = DealerStateType.Approved;
    props.quoteDetail.is247Cars = true;
    const wrapper = mount(<QuoteDialog {...props} />);
    wrapper.update();

    expect(wrapper.find(CarRegisteredSnackbar).exists()).toBeTruthy();
  });

  it("when car is not marked as CF247 car, should render CarRegisteredSnackbar component in UI", async () => {
    props.quoteDetail.is247Cars = false;
    const wrapper = mount(<QuoteDialog {...props} />);
    wrapper.update();

    expect(wrapper.find(CarRegisteredSnackbar).exists()).toBeTruthy();
  });

  it("should fetch paint protection dropdown data if not fetched", async () => {
    const updatedProps = { ...props };
    updatedProps.vehicleExtraItemList = [];
    mockGetVehicleExtraItemList.mockImplementationOnce(() =>
      Promise.resolve(vehicleExtraItems)
    );

    await act(async () => {
      const wrapper = mount(<QuoteDialog {...updatedProps} />);
      await flushPromises();
      wrapper.update();

      expect(mockGetVehicleExtraItemList).toHaveBeenCalled();
    });
  });

  it("should not fetch paint protection dropdown data if already fetched", async () => {
    mockGetVehicleExtraItemList.mockImplementationOnce(() =>
      Promise.resolve(vehicleExtraItems)
    );

    await act(async () => {
      const wrapper = mount(<QuoteDialog {...props} />);
      await flushPromises();
      wrapper.update();

      expect(mockGetVehicleExtraItemList).toHaveBeenCalledTimes(0);
    });
  });

  it("should render include paint protection in monthly payments checkbox as unchecked, if vehiclesExtras is null", async () => {
    const wrapper = mount(<QuoteDialog {...props} />);
    wrapper.update();

    const checkbox = wrapper.find(Checkbox).first();

    expect(checkbox.props().checked).toBe(false);
  });

  it("should render include paint protection in monthly payments checkbox as checked, if vehiclesExtras is not null", async () => {
    props.quoteDetail.vehicleExtras = {
      vehicleExtraOptionId: 1,
      vehicleExtraTypeId: 1,
      vehicleExtraTypeName: "leather",
      description: "leather",
      price: 100,
    };
    const wrapper = mount(<QuoteDialog {...props} />);
    wrapper.update();

    const checkbox = wrapper.find(Checkbox).first();

    expect(checkbox.props().checked).toBe(true);
  });
});
