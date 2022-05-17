import React from "react";
import { CustomerDetailType } from "@common/components";
import { Manager } from "@twilio/flex-ui";
import { create } from "react-test-renderer";
import { CustomerDetailActionContent } from "../CustomerDetailAction/CustomerDetailActionContent";

import { flexManagerMock } from "../__mocks__/MockData";

Manager.getInstance = flexManagerMock;

jest.mock(
  "../CustomerDetailAction/CustomerDetail/CustomerDetailWrapper/CustomerDetailWrapper.Container"
);
jest.mock(
  "../CustomerDetailAction/CustomerDetail/CustomerDetailWrapper/CustomerDetailWrapper"
);
jest.mock("../CustomerDetailAction/AddressHistory/AddressHistory.Container");

const props = {
  currentProgressStatus: "",
  backToWizardStepper: jest.fn(() => {}),
  customerDetailType: CustomerDetailType.CustomerDetail,
};

describe("CustomerDetailActionContent", () => {
  it("should render customerDetail component, when customerDetailType prop value is CustomerDetail", () => {
    const wrapper = create(<CustomerDetailActionContent {...props} />).toJSON();

    expect(wrapper).toMatchSnapshot();
  });

  it("should render address history component, when customerDetailType prop value is AddressHistory", () => {
    props.customerDetailType = CustomerDetailType.AddressHistory;
    const wrapper = create(<CustomerDetailActionContent {...props} />).toJSON();

    expect(wrapper).toMatchSnapshot();
  });
});
