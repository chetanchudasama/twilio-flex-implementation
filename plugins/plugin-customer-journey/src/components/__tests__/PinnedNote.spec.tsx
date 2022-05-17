import React from "react";
import { shallow } from "enzyme";
import PinnedNote, {
  PinnedNoteProps,
} from "../HistoryPanel/PinnedNote/PinnedNote";
import { HistoryPanelMemberType } from "../../common/enum";

const props: PinnedNoteProps = {
  pinnedNoteList: [
    {
      id: "1",
      actionedBy: HistoryPanelMemberType.Customer,
      actionType: { id: 1, name: "SMS" },
      content: "Hello",
      isImportant: true,
      timestamp: new Date("May 29 2021 10:45"),
      url: "",
    },
    {
      id: "2",
      actionedBy: HistoryPanelMemberType.Agent,
      actionType: { id: 1, name: "SMS" },
      content: "How are you?",
      isImportant: true,
      timestamp: new Date("May 29 2021 10:47"),
      url: "",
    },
  ],
  containerHeight: 30,
  handleUnpinNote: jest.fn(),
};

describe("PinnedNote", () => {
  it("renders correctly on load", () => {
    const wrapper = shallow(<PinnedNote {...props} />);

    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find(".pinned-chat-container").exists()).toBeTruthy();
  });

  it("pinned note content renders correctly", () => {
    const wrapper = shallow(<PinnedNote {...props} />);

    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find(".pinned-content")).toHaveLength(
      props.pinnedNoteList.length
    );
  });

  it("when close pin icon is clicked, handleUnpinNote method should be called", () => {
    const wrapper = shallow(<PinnedNote {...props} />);
    const button = wrapper.find(".icon-close").at(0);

    button.simulate("click");
    wrapper.update();

    expect(props.handleUnpinNote).toBeCalledTimes(1);
  });
});
