import { Manager } from "@twilio/flex-ui";
import { mount } from "enzyme";
import flushPromises from "flush-promises";
import React from "react";
import { create } from "react-test-renderer";
import { showMessage, showErrorMessage } from "../../Notifications";
import CustomerBannerWrapper from "../CustomerBannerWrapper/CustomerBannerWrapper";
import {
  DispatchToProps,
  StateToProps,
} from "../CustomerBannerWrapper/CustomerBannerWrapper.Container";
import { flexManagerMock } from "../__mocks__/MockData";

const props: StateToProps & DispatchToProps = {
  isCustomerAvailable: true,
  applicationId: 1,
  name: "Thomas Snow",
  dob: "",
  address: "Building1",
  mobileNumber: "+44567890",
  email: "thomas@gmail.com",
  callbackBooked: new Date(2021, 5, 21),
  setCustomer: () => jest.fn(() => {}),
  setCustomerDetails: () => jest.fn(() => {}),
  hasThirdPartyAuthorization: false,
  thirdPartyAuthorization: null,
  saveThirdPartyDetailHandler: () => jest.fn(() => {}),
  hasVulnerableCustomerReported: false,
  saveVulnerableCustomerInformation: jest.fn(),
  vulnerableCustomerInformation: null,
  setCallbackDetail: jest.fn(() => {}),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addNoteDetail: (_content: string, _isImportant: boolean) => null,
  canMakeCall: true,
  lenderName: "Auto loan",
  apr: 19.8,
  tierName: "Tier 1",
};

jest.mock("../../Notifications", () => {
  return {
    CustomNotificationType: { SuccessNotification: "successNotification" },
    showErrorMessage: jest.fn(() => {}),
    showMessage: jest.fn(() => {}),
  };
});

Manager.getInstance = flexManagerMock;

jest.mock("@material-ui/core", () => {
  const materialUI = jest.requireActual("@material-ui/core");
  return {
    ...materialUI,
    Tooltip: jest.fn(({ children }) => children),
  };
});

jest.mock("../../services/application.service");

const mockUpdateBaseApplicationDetail = jest.fn();
const mockSubmitCallbackDetail = jest.fn();

jest.mock("../../services/application.service", () => ({
  useApplicationService: jest.fn(() => ({
    updateBaseApplicationDetail: mockUpdateBaseApplicationDetail,
    submitCallbackDetail: mockSubmitCallbackDetail,
  })),
}));

jest.mock("@common/components", () => {
  const components = jest.requireActual("@common/components");
  return {
    ...components,
    CustomerBanner: jest.fn(
      ({
        children,
        saveThirdPartyDetailHandler,
        callbackBooked,
        setCallbackDetail,
      }) => {
        return (
          <div>
            Customer Banner
            <button
              type="button"
              className="save-third-party-detail"
              onClick={() => saveThirdPartyDetailHandler(null)}
            >
              Save Third Party Detail
            </button>
            <button
              type="button"
              className="set-callback"
              onClick={() => setCallbackDetail(callbackBooked, "test reason")}
            >
              Set Callback
            </button>
            <button
              type="button"
              className="delete-callback"
              onClick={() => setCallbackDetail(null, "")}
            >
              Delete
            </button>
            {children}
          </div>
        );
      }
    ),
  };
});

describe("CustomerBannerWrapper", () => {
  it("renders correctly", () => {
    const wrapper = create(<CustomerBannerWrapper {...props} />).toJSON();

    expect(wrapper).toMatchSnapshot();
  });

  it("when value of customer prop is not passed, CustomerBanner component should not be rendered", async () => {
    props.isCustomerAvailable = false;
    const wrapper = mount(<CustomerBannerWrapper {...props} />);

    expect(wrapper).toEqual({});
  });

  it("when saveThirdPartyDetailHandler method is emitted from CustomerBanner component, updateBaseApplicationDetail API should be called", async () => {
    props.isCustomerAvailable = true;
    mockUpdateBaseApplicationDetail.mockImplementationOnce(() =>
      Promise.resolve(undefined)
    );
    const wrapper = mount(<CustomerBannerWrapper {...props} />);

    wrapper.find(".save-third-party-detail").simulate("click");

    await flushPromises();

    expect(showMessage).toHaveBeenCalledWith(
      "successNotification",
      "Third party authorization detail updated successfully!"
    );
  });

  it("when updateBaseApplicationDetail API returns an error, error message should be displayed", async () => {
    props.isCustomerAvailable = true;
    mockUpdateBaseApplicationDetail.mockImplementationOnce(() =>
      // eslint-disable-next-line prefer-promise-reject-errors
      Promise.reject({ statusCode: 500 })
    );
    const wrapper = mount(<CustomerBannerWrapper {...props} />);

    wrapper.find(".save-third-party-detail").simulate("click");

    await flushPromises();

    expect(showErrorMessage).toHaveBeenCalledWith(
      "Something went wrong, please try again!",
      "",
      true
    );
  });

  it("when set callback button is clicked from CustomerBanner component, submitCallbackDetail API should be called", async () => {
    mockSubmitCallbackDetail.mockImplementationOnce(() =>
      Promise.resolve(undefined)
    );
    const wrapper = mount(<CustomerBannerWrapper {...props} />);

    wrapper.find(".set-callback").simulate("click");

    await flushPromises();
    expect(mockSubmitCallbackDetail).toHaveBeenCalledTimes(1);
  });

  it("when submitCallbackDetail API returns an error, error message should be displayed", async () => {
    mockSubmitCallbackDetail.mockImplementationOnce(() =>
      // eslint-disable-next-line prefer-promise-reject-errors
      Promise.reject({ statusCode: 500 })
    );
    const wrapper = mount(<CustomerBannerWrapper {...props} />);

    wrapper.find(".set-callback").simulate("click");

    await flushPromises();

    expect(showErrorMessage).toHaveBeenCalledWith(
      "Something went wrong, please try again!",
      "",
      true
    );
  });

  it("when delete callback button is clicked from CustomerBanner component, updateBaseApplicationDetail API should be called", async () => {
    mockUpdateBaseApplicationDetail.mockImplementationOnce(() =>
      Promise.resolve(undefined)
    );
    const wrapper = mount(<CustomerBannerWrapper {...props} />);

    wrapper.find(".delete-callback").simulate("click");

    await flushPromises();
    expect(mockUpdateBaseApplicationDetail).toHaveBeenCalled();
  });
});
