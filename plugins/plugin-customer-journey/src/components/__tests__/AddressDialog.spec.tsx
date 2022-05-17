import React from "react";
import { create } from "react-test-renderer";
import { mount, shallow } from "enzyme";
import { act } from "react-dom/test-utils";
import { ResponsiveDialog, AddressItemModel } from "@common/components";
import { AddressDialog } from "../CustomerDetailAction/AddressHistory/AddressDialog/AddressDialog";
import { AddressDialogProps } from "../CustomerDetailAction/AddressHistory/AddressDialog/AddressDialog.Props";

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

const addressDetail = {
  postcode: "NN6 2XS",
  buildingName: "Grange",
  subBuilding: "Grange-1",
  buildingNumber: "110",
  streetName: "43 Buckingham Rd",
  town: "THORNBY",
  addressStatus: {
    addressStatusId: 1,
    addressStatusName: "Home Owner",
    yearsAtAddress: 1,
    monthsAtAddress: 12,
  },
  isPrimaryAddress: true,
};

const props: AddressDialogProps = {
  isEdit: true,
  open: true,
  loading: false,
  activeAddress: addressDetail,
  onDelete: jest.fn(() => {}),
  onClose: jest.fn(() => {}),
  onSave: jest.fn(() => {}),
};

describe("AddressDialog", () => {
  it("renders correctly", () => {
    const wrapper = create(<AddressDialog {...props} />).toJSON();

    expect(wrapper).toMatchSnapshot();
  });

  it("when value of isEdit prop is false, UI should be rendered with empty fields", () => {
    props.isEdit = false;
    props.activeAddress = new AddressItemModel();
    const wrapper = create(<AddressDialog {...props} />).toJSON();

    expect(wrapper).toMatchSnapshot();
  });

  it("should emit onClose method, when cancel button is clicked", () => {
    const wrapper = shallow(<AddressDialog {...props} />);

    const spy = jest.spyOn(props, "onClose");

    act(() => {
      wrapper.children().props().onCancel();
    });

    expect(spy).toHaveBeenCalled();
  });

  it("should render Confirmation dialog, when delete button is clicked", () => {
    const wrapper = shallow(<AddressDialog {...props} />);

    expect(wrapper.find(ResponsiveDialog)).toHaveLength(1);
    act(() => {
      wrapper.children().props().onDelete();
    });

    expect(wrapper.find(ResponsiveDialog)).toHaveLength(2);
    expect(wrapper.find(".confirmation-message").exists()).toBeTruthy();
    expect(wrapper.find(".confirmation-message").text()).toContain(
      "Are you sure you want to delete this address?"
    );
  });

  it("should close confirmation dialog, when No button is clicked from confirmation dialog", () => {
    const wrapper = shallow(<AddressDialog {...props} />);

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
    const wrapper = shallow(<AddressDialog {...props} />);

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
    props.activeAddress = new AddressItemModel();
    const wrapper = mount(<AddressDialog {...props} />);

    const spy = jest.spyOn(props, "onSave");

    act(() => {
      wrapper.find(ResponsiveDialog).at(0).props().onConfirm();
    });

    expect(wrapper.find(".residential-status").at(0).html()).toContain(
      "The residential status is required."
    );
    expect(wrapper.find(".residential-period").at(0).html()).toContain(
      "Residential period is required."
    );

    expect(spy).not.toHaveBeenCalled();
  });

  it("when edit address button is clicked, onSave method should be called", async () => {
    props.isEdit = true;
    props.activeAddress = addressDetail;
    const wrapper = mount(<AddressDialog {...props} />);

    const spy = jest.spyOn(props, "onSave");

    act(() => {
      wrapper.find(ResponsiveDialog).at(0).props().onConfirm();
    });

    expect(spy).toHaveBeenCalledWith(addressDetail);
  });

  it("should render AddressSearch component correctly in UI", async () => {
    const wrapper = mount(<AddressDialog {...props} />);

    expect(wrapper.find(".address-search").exists()).toBeTruthy();
  });
});
