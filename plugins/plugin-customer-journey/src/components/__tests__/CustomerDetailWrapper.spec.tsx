import React from "react";
import { create } from "react-test-renderer";
import flushPromises from "flush-promises";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { Manager } from "@twilio/flex-ui";
import { showErrorMessage, showMessage } from "../../Notifications";
import { CustomerDetailWrapper } from "../CustomerDetailAction/CustomerDetail/CustomerDetailWrapper/CustomerDetailWrapper";
import { flexManagerMock } from "../__mocks__/MockData";

jest.mock("../../services/application.service");

jest.mock("@common/components", () => {
  const components = jest.requireActual("@common/components");
  return {
    ...components,
    CustomerDetailModel: jest.fn().mockImplementation(() => {
      return { customerDetailModel: () => {} };
    }),
  };
});

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

jest.mock(
  "../CustomerDetailAction/CustomerDetail/CustomerProfile/CustomerProfile"
);
jest.mock(
  "../CustomerDetailAction/CustomerDetail/CustomerProfile/CustomerProfile.Container"
);

const defaultProps = {
  applicationId: 1,
  setCustomerDetails: jest.fn(() => {}),
  backToWizardStepper: jest.fn(() => {}),
};

const props = defaultProps;

Manager.getInstance = flexManagerMock;

jest.mock("../LoadingComponent/Loading.Container", () => {
  return {
    __esModule: true,
    default: () => {
      return <div>Loading</div>;
    },
  };
});

describe("CustomerDetailWrapper", () => {
  jest.useFakeTimers();
  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it("renders correctly", async () => {
    const wrapper = create(<CustomerDetailWrapper {...props} />).toJSON();
    await flushPromises();

    expect(wrapper).toMatchSnapshot();
  });

  it("should update customer detail and show success notification", async () => {
    mockUpdateBaseApplicationDetail.mockImplementationOnce(() =>
      Promise.resolve(undefined)
    );

    await act(async () => {
      const wrapper = mount(<CustomerDetailWrapper {...props} />);
      wrapper.update();
      await flushPromises();
      wrapper.update();

      const button = wrapper.find(".update-detail-btn").at(0);
      button.simulate("click");
      await flushPromises();
      wrapper.update();

      expect(mockUpdateBaseApplicationDetail).toHaveBeenCalledTimes(1);

      expect(showMessage).toHaveBeenCalledWith(
        "successNotification",
        "Customer detail updated successfully!"
      );

      expect(props.setCustomerDetails).toHaveBeenCalled();

      expect(setTimeout).toHaveBeenCalled();
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 0);
    });
  });

  it("should show error message, if error while update customer details", async () => {
    mockUpdateBaseApplicationDetail.mockImplementationOnce(() =>
      Promise.reject()
    );

    await act(async () => {
      const wrapper = mount(<CustomerDetailWrapper {...props} />);
      wrapper.update();
      await flushPromises();
      wrapper.update();

      const button = wrapper.find(".update-detail-btn");
      button.simulate("click");
      await flushPromises();
      wrapper.update();

      expect(showErrorMessage).toHaveBeenCalledWith(
        "Error in updating customer detail, please try again!",
        "",
        true
      );
    });
  });
});
