import React from "react";
import { mount } from "enzyme";
import { Dialog } from "@material-ui/core";
import { Manager } from "@twilio/flex-ui";
import { act as Act } from "react-dom/test-utils";
import flushPromises from "flush-promises";

import { ViewNotesDialogProps } from "../LeadGeneration/ViewNotesDialog/ViewNotesDialog.Props";
import { ViewNotesDialog } from "../LeadGeneration/ViewNotesDialog/ViewNotesDialog";
import { flexManagerMock } from "../__mocks__/MockData";
import { showErrorMessage, showMessage } from "../../Notifications";

Manager.getInstance = flexManagerMock;

jest.mock("../../Notifications", () => {
  return {
    showErrorMessage: jest.fn(() => {}),
    showMessage: jest.fn(() => {}),
    CustomNotificationType: { SuccessNotification: "successNotification" },
  };
});

jest.mock("../../services/application.service");

const mockAddNoteRequest = jest.fn();

jest.mock("../../services/application.service", () => ({
  useApplicationService: jest.fn(() => ({
    addNoteRequest: mockAddNoteRequest,
  })),
}));

window.HTMLElement.prototype.scrollIntoView = jest.fn();

const notes = [
  {
    comment: "This is a test note",
    commentId: 1,
    createdOn: new Date(2021, 8, 20),
    department: "Development",
    userName: "User",
    isImportant: false,
  },
  {
    comment: "Test note",
    commentId: 11,
    createdOn: new Date(2021, 8, 15),
    department: "Development",
    userName: "User",
    isImportant: false,
  },
];

const props: ViewNotesDialogProps = {
  applicationId: 1,
  customerName: "John Smith",
  open: true,
  recentNotes: notes,
  dialogTitle: "View Note",
  handleDialogClose: jest.fn(),
};

describe("ViewNotesDialog", () => {
  it("renders correctly on load", () => {
    const wrapper = mount(<ViewNotesDialog {...props} />);

    expect(wrapper.find(Dialog).exists()).toBeTruthy();
  });

  it("should render customer name and applicationId correctly", () => {
    const wrapper = mount(<ViewNotesDialog {...props} />);

    expect(wrapper.find(".title-text").html()).toContain(
      `${props.customerName} (#${props.applicationId})`
    );
  });

  it("should render 'No note(s) available', if notes is not available", () => {
    props.recentNotes = [];
    const wrapper = mount(<ViewNotesDialog {...props} />);

    expect(wrapper.find(".notes-container").last().html()).toContain(
      "No note(s) available"
    );
  });

  it("should render notes correctly in UI", () => {
    props.recentNotes = notes;
    const wrapper = mount(<ViewNotesDialog {...props} />);

    expect(wrapper.find(".comment-container").exists()).toBeTruthy();
  });

  it("Add note button should be disabled, if note is not entered", async () => {
    await Act(async () => {
      const wrapper = mount(<ViewNotesDialog {...props} />);
      await flushPromises();
      wrapper.update();

      const disabledBtn = wrapper.find(".disabled-btn").last();

      expect(disabledBtn.exists()).toBeTruthy();
    });
  });

  it("should call AddNoteRequest API and display success message, when Add note button is clicked", async () => {
    mockAddNoteRequest.mockImplementationOnce(() => Promise.resolve(undefined));

    await Act(async () => {
      const wrapper = mount(<ViewNotesDialog {...props} />);
      await flushPromises();
      wrapper.update();

      const textField = wrapper.find("textarea").last();
      textField.simulate("change", { target: { value: "test note" } });
      wrapper.update();

      const button = wrapper.find(".add-btn").last();
      button.simulate("click");
      wrapper.update();
      await flushPromises();
      wrapper.update();

      expect(mockAddNoteRequest).toHaveBeenCalled();

      expect(showMessage).toHaveBeenCalledWith(
        "successNotification",
        "Note detail saved successfully!"
      );
    });
  });

  it("should render error message, when AddNoteRequest API returns an error", async () => {
    mockAddNoteRequest.mockImplementationOnce(() =>
      Promise.reject({ statusCode: 500 })
    );
    await Act(async () => {
      const wrapper = mount(<ViewNotesDialog {...props} />);
      await flushPromises();
      wrapper.update();

      const textField = wrapper.find("textarea").last();
      textField.simulate("change", { target: { value: "test note" } });
      wrapper.update();

      const button = wrapper.find(".add-btn").last();
      button.simulate("click");
      wrapper.update();
      await flushPromises();
      wrapper.update();

      expect(mockAddNoteRequest).toHaveBeenCalled();

      expect(showErrorMessage).toHaveBeenCalledWith(
        "Error submitting add note request, please try again!",
        "",
        true
      );
    });
  });

  it("should call handleDialogClose method, when close button is click", () => {
    const wrapper = mount(<ViewNotesDialog {...props} />);

    wrapper.find(".close-icon").first().simulate("click");

    expect(props.handleDialogClose).toHaveBeenCalled();
  });

  it("should render dialog title correctly, when value of dialogTitle props is 'View Note'", () => {
    const wrapper = mount(<ViewNotesDialog {...props} />);

    expect(wrapper.find(".title-text").html()).toContain("View Note");
  });

  it("should render dialog title correctly, when value of dialogTitle props is 'Add Note'", () => {
    props.dialogTitle = "Add Note";
    const wrapper = mount(<ViewNotesDialog {...props} />);

    expect(wrapper.find(".title-text").html()).toContain("Add Note");
  });
});
