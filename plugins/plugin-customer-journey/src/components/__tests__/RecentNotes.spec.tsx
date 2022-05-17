import React from "react";
import { create } from "react-test-renderer";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";

import { Grid } from "@material-ui/core";
import { Manager } from "@twilio/flex-ui";
import ViewNotesDialog from "../LeadGeneration/ViewNotesDialog/ViewNotesDialog.Container";
import { RecentNotesProps } from "../LeadGeneration/RecentNotes/RecentNotes.Props";
import { RecentNotes } from "../LeadGeneration/RecentNotes/RecentNotes";
import { flexManagerMock } from "../__mocks__/MockData";

Manager.getInstance = flexManagerMock;

jest.mock("../LeadGeneration/ViewNotesDialog/ViewNotesDialog.Container", () => {
  return {
    __esModule: true,
    default: jest.fn(({ children }) => {
      return <div className="view-notes-dialog">{children}</div>;
    }),
  };
});

const props: RecentNotesProps = {
  recentNotes: [
    {
      comment: "This is a test note",
      commentId: 1,
      createdOn: new Date(2021, 8, 8),
      department: "Development",
      userName: "User",
      isImportant: false,
    },
    {
      comment: "Test note",
      commentId: 11,
      createdOn: new Date(2021, 8, 4),
      department: "Development",
      userName: "User",
      isImportant: false,
    },
  ],
};

describe("RecentNotes", () => {
  it("renders correctly on load", () => {
    const wrapper = create(<RecentNotes {...props} />).toJSON();

    expect(wrapper).toMatchSnapshot();
  });

  it("should render view all notes, add note buttons", () => {
    const wrapper = create(<RecentNotes {...props} />).root;

    expect(
      wrapper.findAllByProps({
        className: "note-btn",
      })
    ).toHaveLength(2);
  });

  it("should render recent notes list", () => {
    const wrapper = create(<RecentNotes {...props} />);

    const noteElements = wrapper.root.findAll(
      (el) => el.props.className === "comment" && el.type === Grid
    );
    const commentDetailElements = wrapper.root.findAll(
      (el) => el.props.className === "comment-detail" && el.type === Grid
    );

    expect(noteElements.length).toEqual(props.recentNotes.length);
    expect(commentDetailElements.length).toEqual(props.recentNotes.length);
  });

  it("should render no recent notes available message", () => {
    props.recentNotes = [];
    const wrapper = create(<RecentNotes {...props} />);

    const elements = wrapper.root.findAll(
      (el) => el.props.className === "note-unavailable" && el.type === Grid
    );

    expect(elements.length).toEqual(1);
  });

  it("should open ViewNotesDialog, when View all notes button is clicked", () => {
    const wrapper = mount(<RecentNotes {...props} />);

    const button = wrapper.find(".view-note-btn").last();
    button.simulate("click");

    expect(wrapper.find(ViewNotesDialog).exists()).toBeTruthy();
    expect(wrapper.find(ViewNotesDialog).props().dialogTitle).toBe("View Note");
  });

  it("should open ViewNotesDialog, when Add note button is clicked", () => {
    const wrapper = mount(<RecentNotes {...props} />);

    const button = wrapper.find(".note-btn").last();
    button.simulate("click");

    expect(wrapper.find(ViewNotesDialog).exists()).toBeTruthy();
    expect(wrapper.find(ViewNotesDialog).props().dialogTitle).toBe("Add Note");
  });

  it("should close ViewNotesDialog component, when handleDialogClose method is emitted", () => {
    const wrapper = mount(<RecentNotes {...props} />);

    const button = wrapper.find(".note-btn").last();
    button.simulate("click");

    expect(wrapper.find(ViewNotesDialog).exists()).toBeTruthy();

    act(() => {
      wrapper.find(ViewNotesDialog).props().handleDialogClose();
    });
    wrapper.update();

    expect(wrapper.find(ViewNotesDialog).exists()).toBe(false);
  });
});
