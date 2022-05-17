import React from "react";
import { create } from "react-test-renderer";
import flushPromises from "flush-promises";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { Manager } from "@twilio/flex-ui";
import { showErrorMessage, showMessage } from "../../Notifications";
import {
  BankDetail,
  ComponentProps,
} from "../CustomerDetailAction/BankDetail/BankDetail";
import { flexManagerMock } from "../__mocks__/MockData";

jest.mock("../../services/application.service");

jest.mock("../../Notifications", () => {
  return {
    showErrorMessage: jest.fn(() => {}),
    showMessage: jest.fn(() => {}),
    CustomNotificationType: { SuccessNotification: "successNotification" },
  };
});

const mockUpdateBaseApplicationDetail = jest.fn();

jest.mock("../../services/application.service", () => ({
  useApplicationService: jest.fn(() => ({
    updateBaseApplicationDetail: mockUpdateBaseApplicationDetail,
  })),
}));

jest.mock("../LoadingComponent/Loading.Container", () => {
  return {
    __esModule: true,
    default: () => {
      return <div>Loading</div>;
    },
  };
});

Manager.getInstance = flexManagerMock;

const props: ComponentProps = {
  applicationId: 1,
  bankDetail: {
    bankName: "Bank of England",
    monthsAtBank: 11,
    nameOnBankAccount: "Edward Gibbs",
    accountNumber: "31510604",
    sortCode: "565777",
    netMonthlyIncome: 30000,
  },
  setCustomerDetails: jest.fn(() => {}),
  backToWizardStepper: jest.fn(() => {}),
};

describe("BankDetail", () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it("renders correctly", async () => {
    const wrapper = create(<BankDetail {...props} />).toJSON();
    await flushPromises();

    expect(wrapper).toMatchSnapshot();
  });

  it("should render all input fields correctly in UI", () => {
    const wrapper = create(<BankDetail {...props} />).root;

    expect(wrapper.findAllByType("input")).toHaveLength(6);
  });

  it("when update detail button is clicked, should update bank detail and show success notification", async () => {
    mockUpdateBaseApplicationDetail.mockImplementationOnce(() =>
      Promise.resolve(undefined)
    );

    await act(async () => {
      const wrapper = mount(<BankDetail {...props} />);
      const input = wrapper
        .find(".monthly-income-container")
        .last()
        .find("input")
        .last();
      input.simulate("change", { target: { value: "1000" } });
      await flushPromises();
      wrapper.update();

      wrapper.find(".update-btn").at(0).simulate("click");
      await flushPromises();
      wrapper.update();

      expect(mockUpdateBaseApplicationDetail).toHaveBeenCalledTimes(1);
      expect(showMessage).toHaveBeenCalledWith(
        "successNotification",
        "Customer bank detail updated successfully!"
      );
      expect(props.setCustomerDetails).toHaveBeenCalled();
      expect(props.backToWizardStepper).toHaveBeenCalled();
    });
  });

  it("should show error message, if getting error while update bank details", async () => {
    mockUpdateBaseApplicationDetail.mockImplementationOnce(() =>
      Promise.reject()
    );

    await act(async () => {
      const wrapper = mount(<BankDetail {...props} />);
      const input = wrapper
        .find(".monthly-income-container")
        .last()
        .find("input")
        .last();
      input.simulate("change", { target: { value: "1000" } });
      await flushPromises();
      wrapper.update();

      wrapper.find(".update-btn").at(0).simulate("click");
      await flushPromises();
      wrapper.update();

      expect(showErrorMessage).toHaveBeenCalledWith(
        "Error in updating bank detail, please try again!",
        "",
        true
      );
    });
  });

  it("should display error message, if sort code is invalid", async () => {
    props.bankDetail.sortCode = "123";
    const wrapper = mount(<BankDetail {...props} />);

    wrapper.find(".update-btn").last().simulate("click");
    wrapper.update();
    await flushPromises();

    expect(
      wrapper.find("p").contains("The sort code field must be valid.")
    ).toBeTruthy();
    expect(props.setCustomerDetails).not.toHaveBeenCalled();
  });

  it("should display error message, if account number is invalid", async () => {
    props.bankDetail.accountNumber = "74855";
    const wrapper = mount(<BankDetail {...props} />);

    wrapper.find(".update-btn").last().simulate("click");
    wrapper.update();
    await flushPromises();

    expect(
      wrapper
        .find("p")
        .contains("The account number field must be 8 digits long.")
    ).toBeTruthy();
    expect(props.setCustomerDetails).not.toHaveBeenCalled();
  });

  it("should not call updateBaseApplicationDetail api, if bank detail is not changed", async () => {
    mockUpdateBaseApplicationDetail.mockImplementationOnce(() =>
      Promise.resolve(undefined)
    );

    await act(async () => {
      const wrapper = mount(<BankDetail {...props} />);

      wrapper.find(".update-btn").at(0).simulate("click");
      await flushPromises();
      wrapper.update();

      expect(mockUpdateBaseApplicationDetail).toHaveBeenCalledTimes(0);
      expect(props.backToWizardStepper).toHaveBeenCalledTimes(0);
    });
  });
});
