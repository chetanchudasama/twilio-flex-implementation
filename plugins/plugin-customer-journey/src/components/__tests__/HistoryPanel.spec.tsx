import React from "react";
import { Manager } from "@twilio/flex-ui";
import { create } from "react-test-renderer";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { Shared, ImagePreview, DocumentDownload } from "@common/components";
import DirectionsCarIcon from "@material-ui/icons/DirectionsCar";
import PhoneInTalkIcon from "@material-ui/icons/PhoneInTalk";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { HistoryPanelMemberType } from "../../common/enum";
import PinnedNote from "../HistoryPanel/PinnedNote/PinnedNote";
import HistoryPanel, { HistoryPanelProps } from "../HistoryPanel/HistoryPanel";
import {
  StateToProps,
  DispatchToProps,
} from "../HistoryPanel/HistoryPanel.Container";
import { AddNoteDetailModel } from "../../models/AddNoteDetailModel";
import AddNote from "../HistoryPanel/AddNote/AddNote";
import { flexManagerMock } from "../__mocks__/MockData";

type Props = StateToProps & DispatchToProps & HistoryPanelProps;

const props: Props = {
  historyPanelList: [
    {
      id: "1",
      actionType: {
        id: 1,
        name: "SMS",
      },
      actionedBy: 1,
      content: "Hello",
      isImportant: false,
      timestamp: new Date("06-02-2021 13:24"),
      url: "",
    },
    {
      id: "2",
      actionType: {
        id: 1,
        name: "call",
      },
      actionedBy: 2,
      content: "Hey, thanks for reaching out. How may I help you today?",
      isImportant: false,
      timestamp: new Date("06-02-2021 13:24"),
      url: "",
    },
    {
      id: "3",
      actionType: {
        id: 1,
        name: "recordOpened",
      },
      actionedBy: 2,
      content: "Record opened, Dan Graham",
      isImportant: false,
      timestamp: new Date("06-02-2021 13:24"),
      url: "",
    },
    {
      id: "4",
      actionType: {
        id: 1,
        name: "SMS",
      },
      actionedBy: 2,
      content:
        "Sure sir, could you provide me with your driving licence please.",
      isImportant: false,
      timestamp: new Date("06-02-2021 13:24"),
      url: "audio.mp3",
    },
    {
      id: "5",
      actionType: {
        id: 1,
        name: "carSelected",
      },
      actionedBy: 1,
      content: "Here is my driving licence",
      isImportant: false,
      timestamp: new Date("06-02-2021 13:24"),
      url: "abc.jpg",
    },
    {
      id: "6",
      actionType: {
        id: 1,
        name: "SMS",
      },
      actionedBy: 2,
      content: "Important Note",
      isImportant: true,
      timestamp: new Date("06-02-2021 13:24"),
      url: "file.pdf",
    },
  ],
  handleUnPinHistoryDetail: jest.fn(() => {}),
  handleSaveNoteDetail: jest.fn(() => {}),
  isNoteAdded: false,
};

Manager.getInstance = flexManagerMock;

jest.mock("../../services/application.service");

jest.mock("react-h5-audio-player", () => {
  return {
    __esModule: true,
    default: () => {
      return <div className="audio-player">Audio-Player</div>;
    },
  };
});

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

describe("HistoryPanel", () => {
  jest.useFakeTimers();
  it("renders correctly", async () => {
    const wrapper = create(
      <MuiThemeProvider theme={theme}>
        <HistoryPanel {...props} />
      </MuiThemeProvider>
    ).toJSON();

    expect(wrapper).toMatchSnapshot();
  });

  it("should render timestamp for data correctly in UI", () => {
    const wrapper = create(
      <MuiThemeProvider theme={theme}>
        <HistoryPanel {...props} />
      </MuiThemeProvider>
    ).root;

    const timeStampDiv = wrapper.findAllByProps({
      className: "time-stamp",
    });
    const timeStampItems = props.historyPanelList.map((item) => item.timestamp);

    timeStampDiv.forEach((el, index) => {
      expect(el.children).toEqual([
        Shared.getFormattedDate(timeStampItems[index], "HH:mm"),
      ]);
    });
  });

  it("should render data based on actionedBy property in UI", () => {
    const wrapper = create(
      <MuiThemeProvider theme={theme}>
        <HistoryPanel {...props} />
      </MuiThemeProvider>
    ).root;
    const customerArea = wrapper.findAllByProps({ className: "customer-area" });
    const agentArea = wrapper.findAllByProps({ className: "agent-area" });

    expect(customerArea).toHaveLength(
      props.historyPanelList.filter(
        (item) => item.actionedBy === HistoryPanelMemberType.Customer
      ).length
    );
    expect(agentArea).toHaveLength(
      props.historyPanelList.filter(
        (item) => item.actionedBy === HistoryPanelMemberType.Agent
      ).length
    );
  });

  it("should render ImagePreview component correctly in UI", () => {
    const wrapper = create(
      <MuiThemeProvider theme={theme}>
        <HistoryPanel {...props} />
      </MuiThemeProvider>
    ).root;
    const imagePreview = wrapper.findAllByType(ImagePreview);

    expect(imagePreview).toHaveLength(1);
  });

  it("should render AudioPlayer component correctly in UI", () => {
    const wrapper = create(
      <MuiThemeProvider theme={theme}>
        <HistoryPanel {...props} />
      </MuiThemeProvider>
    ).root;
    const audioPlayer = wrapper.findAllByProps({ className: "audio-player" });

    expect(audioPlayer).toHaveLength(1);
  });

  it("should render file and document download component correctly in UI", () => {
    const wrapper = create(
      <MuiThemeProvider theme={theme}>
        <HistoryPanel {...props} />
      </MuiThemeProvider>
    ).root;
    const file = wrapper.findAllByProps({ className: "document-div" });
    const downloadButton = wrapper.findAllByType(DocumentDownload);

    expect(file).toHaveLength(1);
    expect(downloadButton).toHaveLength(2);
  });

  it("should render car icon and document icon correctly in UI", () => {
    const wrapper = create(
      <MuiThemeProvider theme={theme}>
        <HistoryPanel {...props} />
      </MuiThemeProvider>
    ).root;
    const phoneIcon = wrapper.findAllByType(PhoneInTalkIcon);
    const carIcon = wrapper.findAllByType(DirectionsCarIcon);

    expect(phoneIcon).toHaveLength(1);
    expect(carIcon).toHaveLength(1);
  });

  it("should render PinnedNote component based on isImportant property in UI", () => {
    const wrapper = create(
      <MuiThemeProvider theme={theme}>
        <HistoryPanel {...props} />
      </MuiThemeProvider>
    ).root;

    expect(wrapper.findByType(PinnedNote)).toBeTruthy();
  });

  it("when close pin button is clicked from PinnedNote component, handleUnPinHistoryDetail method should be called", async () => {
    const wrapper = mount(
      <MuiThemeProvider theme={theme}>
        <HistoryPanel {...props} />
      </MuiThemeProvider>
    );

    expect(wrapper.find(PinnedNote).exists()).toBeTruthy();
    await act(async () => {
      const button = wrapper.find(".icon-close").at(0);
      button.simulate("click");
    });
    wrapper.update();
    expect(props.handleUnPinHistoryDetail).toHaveBeenCalled();
  });

  it("should render AddNote component correctly in UI", () => {
    const wrapper = create(
      <MuiThemeProvider theme={theme}>
        <HistoryPanel {...props} />
      </MuiThemeProvider>
    ).root;

    expect(wrapper.findByType(AddNote)).toBeTruthy();
  });

  it("when send button is clicked from AddNote component, handleSaveNoteDetail method should be called", async () => {
    const addNoteModel: AddNoteDetailModel = {
      applicationId: 1,
      content: "new message",
      isImportant: false,
      sendToBroker: false,
    };

    const wrapper = mount(
      <MuiThemeProvider theme={theme}>
        <HistoryPanel {...props} />
      </MuiThemeProvider>
    );

    expect(wrapper.find(AddNote).exists()).toBeTruthy();
    await act(async () => {
      wrapper.find(AddNote).props().onSaveNoteDetail(addNoteModel);
    });
    wrapper.update();

    expect(props.handleSaveNoteDetail).toHaveBeenCalled();
  });
});
