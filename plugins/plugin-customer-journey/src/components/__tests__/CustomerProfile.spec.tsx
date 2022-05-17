import React from "react";
import { mount } from "enzyme";
import { create } from "react-test-renderer";
import { CustomerDetailModel } from "@common/components";
import { CustomerProfile } from "../CustomerDetailAction/CustomerDetail/CustomerProfile/CustomerProfile";

jest.mock("@common/components", () => {
  const components = jest.requireActual("@common/components");
  return {
    ...components,
    Shared: {
      titles: [{ id: 1, description: "Mrs" }],
      maritalStatuses: [{ id: 1, description: "Married" }],
      licenceTypes: [{ id: 1, description: "Full UK Driving Licence" }],
    },
    CustomSelect: jest.fn(({ children }) => children),
    CustomInput: jest.fn(() => {
      return <div className="custom-input" />;
    }),
    CustomerDetailModel: jest.fn().mockImplementation(() => {
      return { customerDetailModel: () => {} };
    }),
  };
});

const customerProfileModel: CustomerDetailModel = Object.assign(
  new CustomerDetailModel(),
  {
    title: { titleId: 1, titleName: "Mrs" },
    firstName: "Fred",
    lastName: "smith",
    middleName: "John",
    dateOfBirth: new Date(1990, 12, 12),
    maritalStatus: { maritalStatusId: 1, maritalStatusName: "Married" },
    drivingLicenceType: {
      drivingLicenceTypeId: 1,
      drivingLicenceTypeName: "Full UK Driving Licence",
    },
    email: "John.Fred@example.com",
    mobileNumber: "+447700903977",
    workNumber: "+444592900077",
    homeNumber: "+447492480056",
  }
);

const props = {
  customer: customerProfileModel,
  errorList: {},
  updateProfile: jest.fn(() => {}),
};

describe("CustomerProfile", () => {
  it("renders correctly", () => {
    const wrapper = create(<CustomerProfile {...props} />).toJSON();

    expect(wrapper).toMatchSnapshot();
  });

  it("should call updateProfile method, when update details button is clicked", () => {
    const wrapper = mount(<CustomerProfile {...props} />);

    wrapper.find(".update-detail-btn").first().simulate("click");
    wrapper.update();

    expect(props.updateProfile).toHaveBeenCalled();
  });
});
