import { Manager } from "@twilio/flex-ui";
import { mount, shallow } from "enzyme";
import React from "react";
import { act } from "react-dom/test-utils";
import flushPromises from "flush-promises";
import DPADialogWrapper, {
  DPADialogWrapperProps,
  Props,
} from "../DPADialogWrapper/DPADialogWrapper";
import { showErrorMessage, showMessage } from "../../Notifications";
import DPADialog from "../DPADialogContent/DPADialogContent.Container";
import { flexManagerMock } from "../__mocks__/MockData";

jest.mock("../DPADialogContent/DPADialogContent.Container");
jest.mock("../../services/dpa.service");

const mockDpaFailed = jest.fn();
const mockSetNewPin = jest.fn();

jest.mock("../../services/dpa.service", () => ({
  useDPAService: jest.fn(() => ({
    dpaFailed: mockDpaFailed,
    setNewPin: mockSetNewPin,
  })),
}));

jest.mock("@common/components", () => {
  const components = jest.requireActual("@common/components");
  return {
    ...components,
    ResponsiveDialog: jest.fn(({ children }) => children),
  };
});

jest.mock("../../Notifications", () => {
  return {
    CustomNotificationType: { ErrorNotification: "errorNotification" },
    showErrorMessage: jest.fn(() => {}),
    showMessage: jest.fn(() => {}),
  };
});

const props: Props & DPADialogWrapperProps = {
  applicationId: 1,
  closeDPADialog: jest.fn(() => {}),
  pin: "",
  postCode: "",
  dateOfBirth: "",
};

Manager.getInstance = flexManagerMock;

describe("DPADialogWrapper", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    mockDpaFailed.mockClear();
    mockSetNewPin.mockClear();

    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  it("renders correctly", async () => {
    const wrapper = shallow(<DPADialogWrapper {...props} />);
    await flushPromises();
    wrapper.update();

    expect(wrapper.exists()).toBeTruthy();
  });

  it("when user clicked on failed button, dpaFailed method should be called", async () => {
    mockDpaFailed.mockImplementationOnce(() =>
      Promise.resolve({
        responseObj: undefined,
        statusCode: 200,
      })
    );
    props.pin = "1234";

    await act(async () => {
      const wrapper = mount(<DPADialogWrapper {...props} />);
      await flushPromises();
      wrapper.update();

      wrapper.find(DPADialog).invoke<"onDPAFailed">("onDPAFailed")();
      await flushPromises();
      wrapper.update();
    });

    expect(mockDpaFailed).toHaveBeenCalledTimes(1);
    expect(showMessage).toHaveBeenCalledWith(
      "errorNotification",
      "Please raise a Suspicious Activity Report via the service desk."
    );
  });

  it("when dpaFailed API returns an error, error message should be displayed", async () => {
    mockDpaFailed.mockImplementationOnce(() => Promise.reject(undefined));

    await act(async () => {
      const wrapper = mount(<DPADialogWrapper {...props} />);
      await flushPromises();
      wrapper.update();

      wrapper.find(DPADialog).invoke<"onDPAFailed">("onDPAFailed")();
      await flushPromises();
      wrapper.update();
    });

    expect(mockDpaFailed).toHaveBeenCalled();
    expect(showErrorMessage).toHaveBeenCalledWith(
      "Something went wrong, please try again!",
      "",
      true
    );
  });

  it("when user clicked on set new pin button, setNewPin method should be called", async () => {
    mockSetNewPin.mockImplementationOnce(() =>
      Promise.resolve({
        responseObj: undefined,
        statusCode: 201,
      })
    );
    await act(async () => {
      const wrapper = mount(<DPADialogWrapper {...props} />);
      await flushPromises();
      wrapper.update();

      wrapper.find(DPADialog).invoke<"onSetNewPin">("onSetNewPin")("test");
      await flushPromises();
      wrapper.update();

      expect(mockSetNewPin).toHaveBeenCalledTimes(1);
    });
  });

  it("when setNewPin API returns an error, error message should be displayed", async () => {
    mockSetNewPin.mockImplementationOnce(() => Promise.reject(undefined));

    await act(async () => {
      const wrapper = mount(<DPADialogWrapper {...props} />);
      await flushPromises();
      wrapper.update();

      wrapper.find(DPADialog).invoke<"onSetNewPin">("onSetNewPin")("test");
      await flushPromises();
      wrapper.update();
    });

    expect(mockSetNewPin).toHaveBeenCalled();
    expect(showErrorMessage).toHaveBeenCalledWith(
      "Something went wrong, please try again!",
      "",
      true
    );
  });

  it("when user clicked on confirm button, closeDPADialog method should be called", async () => {
    props.pin = "1234";
    const wrapper = mount(<DPADialogWrapper {...props} />);
    await flushPromises();
    wrapper.update();

    wrapper.find(DPADialog).invoke<"onDPAConfirm">("onDPAConfirm")();
    await flushPromises();
    wrapper.update();

    expect(props.closeDPADialog).toHaveBeenCalled();
  });
});
