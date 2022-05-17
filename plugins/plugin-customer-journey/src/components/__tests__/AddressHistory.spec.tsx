import React from "react";
import { Manager } from "@twilio/flex-ui";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { create } from "react-test-renderer";
import { AddressItemModel } from "@common/components";
import { AddressDetail } from "../CustomerDetailAction/AddressHistory/AddressDetail/AddressDetail";
import {
  StateToProps,
  DispatchToProps,
} from "../CustomerDetailAction/AddressHistory/AddressHistory.Props";
import { AddressHistory } from "../CustomerDetailAction/AddressHistory/AddressHistory";
import { flexManagerMock } from "../__mocks__/MockData";
import { AddressDialog } from "../CustomerDetailAction/AddressHistory/AddressDialog/AddressDialog";
import { showErrorMessage, showMessage } from "../../Notifications";

Manager.getInstance = flexManagerMock;

const mockUpdateBaseApplicationDetail = jest.fn();

jest.mock("../../services/application.service", () => ({
  useApplicationService: jest.fn(() => ({
    updateBaseApplicationDetail: mockUpdateBaseApplicationDetail,
  })),
}));

jest.mock("../../Notifications", () => {
  return {
    showErrorMessage: jest.fn(() => {}),
    showMessage: jest.fn(() => {}),
    CustomNotificationType: { SuccessNotification: "successNotification" },
  };
});

type Props = StateToProps & DispatchToProps;

const address: AddressItemModel[] = [
  {
    postcode: "NP6 8RF",
    buildingName: "Parsley",
    subBuilding: "Parsley-9",
    buildingNumber: "114",
    streetName: "48 Bullwood Rd",
    town: "ST ARVANS",
    addressStatus: {
      addressStatusId: 0,
      addressStatusName: "Home Owner",
      yearsAtAddress: 2,
      monthsAtAddress: 27,
    },
    isPrimaryAddress: true,
  },
  {
    postcode: "NN6 2XS",
    buildingName: "Grange",
    subBuilding: "Grange-1",
    buildingNumber: "110",
    streetName: "43 Buckingham Rd",
    town: "THORNBY",
    addressStatus: {
      addressStatusId: 2,
      addressStatusName: "Tenant",
      yearsAtAddress: 1,
      monthsAtAddress: 12,
    },
    isPrimaryAddress: false,
  },
  {
    postcode: "YO4 3XA",
    buildingName: "Lilac",
    subBuilding: "Lilac-3",
    buildingNumber: "112",
    streetName: "114 Long Street",
    town: "MILLINGTON",
    addressStatus: {
      addressStatusId: 3,
      addressStatusName: "Private Tenant",
      yearsAtAddress: 0,
      monthsAtAddress: 11,
    },
    isPrimaryAddress: false,
  },
];

const props: Props = {
  applicationId: 1,
  currentAddress: address[0],
  previousAddressList: [address[1], address[2]],
  setCustomerDetails: jest.fn(),
};

describe("AddressHistory", () => {
  it("renders correctly", () => {
    const wrapper = create(<AddressHistory {...props} />).toJSON();

    expect(wrapper).toMatchSnapshot();
  });

  it("renders current address and previous addresses correctly in UI", () => {
    const wrapper = create(<AddressHistory {...props} />).root;

    expect(
      wrapper.findAllByProps({
        className: "address-header",
      })[1].props.children
    ).toContain("Current Address");
    expect(
      wrapper.findAllByProps({
        className: "address-header",
      })[2].props.children
    ).toContain("Previous Addresses");
  });

  it("renders address history item correctly in UI", () => {
    const wrapper = mount(<AddressHistory {...props} />);

    expect(wrapper.find(AddressDetail)).toHaveLength(
      [props.currentAddress, ...props.previousAddressList].length
    );
  });

  it("should open address dialog, when add address button is clicked", async () => {
    const wrapper = mount(<AddressHistory {...props} />);

    wrapper.find(".add-address-btn").at(0).simulate("click");
    wrapper.update();

    expect(wrapper.find(AddressDialog).exists()).toBeTruthy();
  });

  it("should open address dialog, when edit address button is clicked", async () => {
    const wrapper = mount(<AddressHistory {...props} />);

    act(() => {
      wrapper.find(AddressDetail).at(0).props().onEdit();
    });
    wrapper.update();

    expect(wrapper.find(AddressDialog).exists()).toBeTruthy();
  });

  it("should close address dialog, when close button is clicked from AddressDialog", async () => {
    const wrapper = mount(<AddressHistory {...props} />);

    wrapper.find(".add-address-btn").at(0).simulate("click");
    wrapper.update();

    expect(wrapper.find(AddressDialog).exists()).toBeTruthy();

    act(() => {
      wrapper.find(AddressDialog).props().onClose();
    });
    wrapper.update();

    expect(wrapper.find(AddressDialog).exists()).toBeFalsy();
  });

  it("should delete address, when delete button is clicked from AddressDialog", async () => {
    mockUpdateBaseApplicationDetail.mockImplementationOnce(() =>
      Promise.resolve(undefined)
    );

    const wrapper = mount(<AddressHistory {...props} />);

    act(() => {
      wrapper.find(AddressDetail).at(0).props().onEdit();
    });
    wrapper.update();
    expect(wrapper.find(AddressDialog).exists()).toBeTruthy();

    wrapper.find(AddressDialog).props().onDelete();
    wrapper.update();

    await act(async () => {
      expect(mockUpdateBaseApplicationDetail).toHaveBeenCalled();
      wrapper.update();
    });

    expect(showMessage).toHaveBeenCalledWith(
      "successNotification",
      "Address detail deleted successfully!"
    );
  });

  it("should display error message, if delete address detail API returns an error", async () => {
    mockUpdateBaseApplicationDetail.mockImplementationOnce(() =>
      Promise.reject()
    );

    const wrapper = mount(<AddressHistory {...props} />);

    act(() => {
      wrapper.find(AddressDetail).at(0).props().onEdit();
    });
    wrapper.update();

    expect(wrapper.find(AddressDialog).exists()).toBeTruthy();

    wrapper.find(AddressDialog).props().onDelete();
    wrapper.update();

    await act(async () => {
      expect(mockUpdateBaseApplicationDetail).toHaveBeenCalled();
      wrapper.update();
    });

    expect(showErrorMessage).toHaveBeenCalledWith(
      "Something went wrong, please try again!",
      "",
      true
    );
  });

  it("should update address, when edit address button is clicked from AddressDialog", async () => {
    mockUpdateBaseApplicationDetail.mockImplementationOnce(() =>
      Promise.resolve(undefined)
    );

    const wrapper = mount(<AddressHistory {...props} />);

    act(() => {
      wrapper.find(AddressDetail).at(0).props().onEdit();
    });
    wrapper.update();

    expect(wrapper.find(AddressDialog).exists()).toBeTruthy();

    await act(async () => {
      wrapper.find(AddressDialog).props().onSave(address[1]);
      wrapper.update();

      expect(mockUpdateBaseApplicationDetail).toHaveBeenCalled();
    });

    expect(showMessage).toHaveBeenCalledWith(
      "successNotification",
      "Address detail updated successfully!"
    );
  });

  it("should show error message, if update address detail API returns an error", async () => {
    mockUpdateBaseApplicationDetail.mockImplementationOnce(() =>
      Promise.reject()
    );

    const wrapper = mount(<AddressHistory {...props} />);

    act(() => {
      wrapper.find(AddressDetail).at(0).props().onEdit();
    });
    wrapper.update();

    expect(wrapper.find(AddressDialog).exists()).toBeTruthy();

    await act(async () => {
      wrapper.find(AddressDialog).props().onSave(address[1]);
      wrapper.update();

      expect(mockUpdateBaseApplicationDetail).toHaveBeenCalled();
    });

    expect(showErrorMessage).toHaveBeenCalledWith(
      "Something went wrong, please try again!",
      "",
      true
    );
  });

  it("should show No Address found message, if addresses are not available", async () => {
    props.currentAddress = null;
    props.previousAddressList = [];
    const wrapper = mount(<AddressHistory {...props} />);

    expect(wrapper.find(AddressDetail).exists()).toBeFalsy();

    expect(wrapper.html()).toContain("No Address found.");
  });
});
