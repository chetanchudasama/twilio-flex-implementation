import { Manager } from "@twilio/flex-ui";
import { mount, ReactWrapper, shallow } from "enzyme";
import flushPromises from "flush-promises";
import React from "react";
import { act } from "react-dom/test-utils";
import { CustomerDetailModel } from "@common/components";
import CustomCRMViewContent from "../CustomCRMViewContent/CustomCRMViewContent";
import { flexManagerMock } from "../__mocks__/MockData";

const props: any = {
  task: {
    attributes: {
      applicationId: 1,
    },
    status: "accepted",
  },
  setCustomer: jest.fn(() => {}),
  setHistoryDetailList: jest.fn(() => {}),
  setSelectedAppId: jest.fn(() => {}),
  selectedAppId: 0,
  useZingWorkscreen: true,
};

Manager.getInstance = flexManagerMock;

const mockGetBaseDetails = jest.fn();
const mockGetHistoryDetails = jest.fn();

jest.mock("../../services/application.service", () => ({
  useApplicationService: jest.fn(() => ({
    getBaseDetails: mockGetBaseDetails,
    getHistoryDetails: mockGetHistoryDetails,
  })),
}));

jest.mock("../CustomerBannerWrapper/CustomerBannerWrapper.Container", () => {
  return {
    __esModule: true,
    default: () => {
      return <div>test</div>;
    },
  };
});

jest.mock("../Wizard/Wizard.Container", () => {
  return {
    __esModule: true,
    default: () => {
      return <div>test</div>;
    },
  };
});

jest.mock(
  "../HistoryPanel/HistoryPanelWrapper/HistoryPanelWrapper.Container",
  () => {
    return {
      __esModule: true,
      default: () => {
        return <div>History Panel</div>;
      },
    };
  }
);

jest.mock("../LoadingComponent/Loading.Container", () => {
  return {
    __esModule: true,
    default: () => {
      return <div>test</div>;
    },
  };
});

jest.mock("../DPADialogWrapper/DPADialogWrapper.Container", () => {
  return {
    __esModule: true,
    default: () => {
      return <div>test</div>;
    },
  };
});

describe("CustomCRMViewContent", () => {
  beforeEach(() => {
    mockGetHistoryDetails.mockImplementationOnce(() => Promise.resolve([]));
  });

  afterEach(() => {
    mockGetBaseDetails.mockClear();
    mockGetHistoryDetails.mockClear();

    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it("renders correctly", () => {
    const wrapper = shallow(<CustomCRMViewContent {...props} />);

    expect(wrapper.exists()).toBeTruthy();
  });

  it("when getBaseDetails API returns an success response, UI should be rendered accordingly", async () => {
    props.task.attributes.applicationId = 1;

    mockGetBaseDetails.mockImplementationOnce(() =>
      Promise.resolve(new CustomerDetailModel())
    );

    let wrapper: ReactWrapper<any, Readonly<any>, React.Component>;

    await act(async () => {
      wrapper = mount(<CustomCRMViewContent {...props} />);
      await flushPromises();
    });

    expect(mockGetBaseDetails).toHaveBeenCalledTimes(1);
    wrapper!.update();
    expect(wrapper!.find(".missing-app-id").exists()).toBeFalsy();
    expect(wrapper!.find(".grid-container").exists()).toBeTruthy();
  });

  it("when getBaseDetails API returns an error, UI should be rendered accordingly", async () => {
    props.task.attributes.applicationId = 1;

    mockGetBaseDetails.mockImplementationOnce(() =>
      Promise.reject({ statusCode: 500 })
    );

    let wrapper: ReactWrapper<any, Readonly<any>, React.Component>;

    await act(async () => {
      wrapper = mount(<CustomCRMViewContent {...props} />);
      await flushPromises();
    });

    expect(mockGetBaseDetails).toHaveBeenCalledTimes(1);
    wrapper!.update();
    expect(wrapper!.find(".missing-app-id").exists()).toBeTruthy();
    expect(wrapper!.find(".grid-container").exists()).toBeFalsy();
  });

  it("when getHistoryDetail API returns an success response, setHistoryDetailList method should be called", async () => {
    props.task.attributes.applicationId = 1;

    mockGetBaseDetails.mockImplementationOnce(() =>
      Promise.resolve(new CustomerDetailModel())
    );

    let wrapper: ReactWrapper<any, Readonly<any>, React.Component>;

    await act(async () => {
      wrapper = mount(<CustomCRMViewContent {...props} />);
      await flushPromises();
    });

    expect(props.setHistoryDetailList).toHaveBeenCalled();
    expect(props.setSelectedAppId).toHaveBeenCalled();
  });
});
