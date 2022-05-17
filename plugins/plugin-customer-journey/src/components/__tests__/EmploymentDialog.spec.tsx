import React from "react";
import { create } from "react-test-renderer";
import { mount, shallow } from "enzyme";
import { act } from "react-dom/test-utils";
import { ResponsiveDialog, CustomerEmploymentModel } from "@common/components";

import { EmploymentDialog } from "../CustomerDetailAction/EmploymentHistory/EmploymentDialog/EmploymentDialog";
import { EmploymentDialogProps } from "../CustomerDetailAction/EmploymentHistory/EmploymentDialog/EmploymentDialog.Props";

jest.mock("@common/components", () => {
  const components = jest.requireActual("@common/components");
  return {
    ...components,
    ResponsiveDialog: jest.fn(({ children }) => children),
  };
});

jest.mock("../AddressSearch/AddressSearch", () => {
  return {
    AddressSearch: () => {
      return <div className="address-search">Address Search</div>;
    },
  };
});

const employmentDetail = {
  occupationStatus: { id: 1, name: "Employed Full Time" },
  yearsAtEmployment: 1,
  monthsAtEmployment: 11,
  occupation: "Car rental agent",
  employerName: "Zara R Woods",
  employerPhoneNumber: "+446349900077",
  employerAddress: {
    postcode: "IP6 3YZ",
    buildingName: "Granary",
    subBuilding: "Granary-23",
    buildingNumber: "2",
    streetName: "75 Golf Road",
    town: "SWILLAND",
  },
  isCurrentEmployment: false,
};

const props: EmploymentDialogProps = {
  isEdit: true,
  open: true,
  loading: false,
  activeEmployment: employmentDetail,
  onDelete: jest.fn(() => {}),
  onClose: jest.fn(() => {}),
  onSave: jest.fn(() => {}),
};

describe("EmploymentDialog", () => {
  it("renders correctly", () => {
    const wrapper = create(<EmploymentDialog {...props} />).toJSON();

    expect(wrapper).toMatchSnapshot();
  });

  it("when value of isEdit prop is false, UI should be rendered with empty fields", () => {
    props.isEdit = false;
    props.activeEmployment = new CustomerEmploymentModel();
    const wrapper = create(<EmploymentDialog {...props} />).toJSON();

    expect(wrapper).toMatchSnapshot();
  });

  it("should emit onClose method, when cancel button is clicked", () => {
    const wrapper = shallow(<EmploymentDialog {...props} />);

    const spy = jest.spyOn(props, "onClose");

    act(() => {
      wrapper.children().props().onCancel();
    });

    expect(spy).toHaveBeenCalled();
  });

  it("should render Confirmation dialog, when delete button is clicked", () => {
    const wrapper = shallow(<EmploymentDialog {...props} />);

    expect(wrapper.find(ResponsiveDialog)).toHaveLength(1);
    act(() => {
      wrapper.children().props().onDelete();
    });

    expect(wrapper.find(ResponsiveDialog)).toHaveLength(2);
    expect(wrapper.find(".confirmation-message").exists()).toBeTruthy();
    expect(wrapper.find(".confirmation-message").text()).toContain(
      "Are you sure you want to delete this employment?"
    );
  });

  it("should close confirmation dialog, when No button is clicked from confirmation dialog", () => {
    const wrapper = shallow(<EmploymentDialog {...props} />);

    act(() => {
      wrapper.children().props().onDelete();
    });

    expect(wrapper.find(".confirmation-message").exists()).toBeTruthy();
    act(() => {
      wrapper.find(ResponsiveDialog).at(1).props().onCancel();
    });

    expect(wrapper.find(".confirmation-message").exists()).toBeFalsy();
  });

  it("should emit onDelete method, when Yes button is clicked from confirmation dialog", () => {
    const wrapper = shallow(<EmploymentDialog {...props} />);

    const spy = jest.spyOn(props, "onDelete");

    act(() => {
      wrapper.children().props().onDelete();
    });
    expect(wrapper.find(".confirmation-message").exists()).toBeTruthy();

    act(() => {
      wrapper.find(ResponsiveDialog).at(1).props().onConfirm();
    });

    expect(spy).toHaveBeenCalled();
  });

  it("should render validation message", async () => {
    props.isEdit = false;
    const wrapper = mount(<EmploymentDialog {...props} />);

    const spy = jest.spyOn(props, "onSave");

    act(() => {
      wrapper.find(ResponsiveDialog).at(0).props().onConfirm();
    });

    expect(wrapper.find(".occupation-status").at(0).html()).toContain(
      "Occupation status is required"
    );
    expect(wrapper.find(".employment-time").at(0).html()).toContain(
      "Experience is required"
    );
    expect(wrapper.find(".employer-name").at(0).html()).toContain(
      "Name of employer is required"
    );
    expect(wrapper.find(".employer-phone-no").at(0).html()).toContain(
      "Phone number of employer is required"
    );

    expect(spy).not.toHaveBeenCalled();
  });

  it("when edit employment button is clicked, onSave method should be emitted", async () => {
    props.isEdit = true;
    props.activeEmployment = employmentDetail;
    const wrapper = mount(<EmploymentDialog {...props} />);

    const spy = jest.spyOn(props, "onSave");

    act(() => {
      wrapper.find(ResponsiveDialog).at(0).props().onConfirm();
    });

    expect(spy).toHaveBeenCalledWith(employmentDetail);
  });

  it("should render AddressSearch component", async () => {
    const wrapper = mount(<EmploymentDialog {...props} />);

    expect(wrapper.find(".address-search").exists()).toBeTruthy();
  });

  it("should render Town field, when occupation status is 'Not Employed'", async () => {
    props.activeEmployment.occupationStatus = { id: 5, name: "Not Employed" };
    const wrapper = mount(<EmploymentDialog {...props} />);

    expect(wrapper.find(".town").exists()).toBeTruthy();
  });

  it("should not render occupation and employer detail, when occupation status is 'Not Employed'", async () => {
    const wrapper = mount(<EmploymentDialog {...props} />);

    expect(wrapper.find(".employer-name").exists()).toBeFalsy();
    expect(wrapper.find(".employer-phone-no").exists()).toBeFalsy();
    expect(wrapper.find(".emp-occupation").exists()).toBeFalsy();
    expect(wrapper.find(".employer-address").exists()).toBeFalsy();
  });
});
