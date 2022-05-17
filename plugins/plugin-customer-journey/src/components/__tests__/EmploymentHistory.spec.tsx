import React from "react";
import { Manager } from "@twilio/flex-ui";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { create } from "react-test-renderer";
import { CustomerEmploymentModel } from "@common/components";
import { EmploymentListItem } from "../CustomerDetailAction/EmploymentHistory/EmploymentListItem/EmploymentListItem";
import { Props } from "../CustomerDetailAction/EmploymentHistory/EmploymentHistory.Props";
import { EmploymentHistory } from "../CustomerDetailAction/EmploymentHistory/EmploymentHistory";
import { flexManagerMock } from "../__mocks__/MockData";
import { EmploymentDialog } from "../CustomerDetailAction/EmploymentHistory/EmploymentDialog/EmploymentDialog";
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

const employments: CustomerEmploymentModel[] = [
  {
    occupationStatus: { id: -1, name: "Full-time" },
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
  },
  {
    occupationStatus: { id: -1, name: "Part-time" },
    yearsAtEmployment: 2,
    monthsAtEmployment: 25,
    occupation: "Car detailer",
    employerName: "Elliot S Naylor",
    employerPhoneNumber: "+446349988077",
    employerAddress: {
      postcode: "IP23 8UJ",
      buildingName: "Haven",
      subBuilding: "Haven-234",
      buildingNumber: "3",
      streetName: "21 Farburn Terrace",
      town: "LITTLE GREEN",
    },
    isCurrentEmployment: true,
  },
];

const props: Props = {
  applicationId: 0,
  currentEmployment: employments[1],
  previousEmployments: [employments[0]],
  setCustomerDetails: jest.fn(),
};

describe("EmploymentHistory", () => {
  it("renders correctly", () => {
    const wrapper = create(<EmploymentHistory {...props} />).toJSON();

    expect(wrapper).toMatchSnapshot();
  });

  it("renders current employment and previous employment correctly in UI", () => {
    const wrapper = create(<EmploymentHistory {...props} />).root;

    expect(
      wrapper.findAllByProps({
        className: "employment-label",
      })[1].props.children
    ).toContain("Current Employment");
    expect(
      wrapper.findAllByProps({
        className: "employment-label",
      })[2].props.children
    ).toContain("Previous Employment");
  });

  it("renders employment history item correctly in UI", () => {
    const wrapper = mount(<EmploymentHistory {...props} />);

    expect(wrapper.find(EmploymentListItem)).toHaveLength(
      [props.currentEmployment, ...props.previousEmployments].length
    );
  });

  it("should open employment dialog, when add employment button is clicked", async () => {
    const wrapper = mount(<EmploymentHistory {...props} />);

    wrapper.find(".add-employment-btn").at(0).simulate("click");
    wrapper.update();

    expect(wrapper.find(EmploymentDialog).exists()).toBeTruthy();
  });

  it("should open employment dialog, when edit employment button is clicked", async () => {
    const wrapper = mount(<EmploymentHistory {...props} />);

    act(() => {
      wrapper.find(EmploymentListItem).at(0).props().setActiveEmployment();
    });
    wrapper.update();

    expect(wrapper.find(EmploymentDialog).exists()).toBeTruthy();
  });

  it("should close employment dialog, when close button is clicked from EmploymentDialog", async () => {
    const wrapper = mount(<EmploymentHistory {...props} />);

    wrapper.find(".add-employment-btn").at(0).simulate("click");
    wrapper.update();

    expect(wrapper.find(EmploymentDialog).exists()).toBeTruthy();

    act(() => {
      wrapper.find(EmploymentDialog).props().onClose();
    });
    wrapper.update();

    expect(wrapper.find(EmploymentDialog).exists()).toBeFalsy();
  });

  it("should delete employment, when delete button is clicked from EmploymentDialog", async () => {
    mockUpdateBaseApplicationDetail.mockImplementationOnce(() =>
      Promise.resolve(undefined)
    );

    const wrapper = mount(<EmploymentHistory {...props} />);

    act(() => {
      wrapper.find(EmploymentListItem).at(0).props().setActiveEmployment();
    });
    wrapper.update();
    expect(wrapper.find(EmploymentDialog).exists()).toBeTruthy();

    wrapper.find(EmploymentDialog).props().onDelete();
    wrapper.update();

    await act(async () => {
      expect(mockUpdateBaseApplicationDetail).toHaveBeenCalled();
      wrapper.update();
    });

    expect(showMessage).toHaveBeenCalledWith(
      "successNotification",
      "Employment detail deleted successfully!"
    );
  });

  it("should display error message, if delete employment detail API returns an error", async () => {
    mockUpdateBaseApplicationDetail.mockImplementationOnce(() =>
      Promise.reject()
    );

    const wrapper = mount(<EmploymentHistory {...props} />);

    act(() => {
      wrapper.find(EmploymentListItem).at(0).props().setActiveEmployment();
    });
    wrapper.update();

    expect(wrapper.find(EmploymentDialog).exists()).toBeTruthy();

    wrapper.find(EmploymentDialog).props().onDelete();
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

  it("should update employment, when delete button is clicked from EmploymentDialog", async () => {
    mockUpdateBaseApplicationDetail.mockImplementationOnce(() =>
      Promise.resolve(undefined)
    );

    const wrapper = mount(<EmploymentHistory {...props} />);

    act(() => {
      wrapper.find(EmploymentListItem).at(0).props().setActiveEmployment();
    });
    wrapper.update();

    expect(wrapper.find(EmploymentDialog).exists()).toBeTruthy();

    await act(async () => {
      wrapper.find(EmploymentDialog).props().onSave(employments[1]);
      wrapper.update();

      expect(mockUpdateBaseApplicationDetail).toHaveBeenCalled();
    });

    expect(showMessage).toHaveBeenCalledWith(
      "successNotification",
      "Employment history detail updated successfully!"
    );
  });

  it("should show error message, if update employment detail API returns an error", async () => {
    mockUpdateBaseApplicationDetail.mockImplementationOnce(() =>
      Promise.reject()
    );

    const wrapper = mount(<EmploymentHistory {...props} />);

    act(() => {
      wrapper.find(EmploymentListItem).at(0).props().setActiveEmployment();
    });
    wrapper.update();

    expect(wrapper.find(EmploymentDialog).exists()).toBeTruthy();

    await act(async () => {
      wrapper.find(EmploymentDialog).props().onSave(employments[1]);
      wrapper.update();

      expect(mockUpdateBaseApplicationDetail).toHaveBeenCalled();
    });

    expect(showErrorMessage).toHaveBeenCalledWith(
      "Something went wrong, please try again!",
      "",
      true
    );
  });
});
