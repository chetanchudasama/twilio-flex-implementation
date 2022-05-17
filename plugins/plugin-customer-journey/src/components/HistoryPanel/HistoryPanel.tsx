import {
  Shared,
  ImagePreview,
  DocumentDownload,
  FileType,
} from "@common/components";
import React, { useState, useEffect } from "react";
import DirectionsCarIcon from "@material-ui/icons/DirectionsCar";
import PhoneInTalkIcon from "@material-ui/icons/PhoneInTalk";
import { Icon, Chip } from "@material-ui/core";
import AudioPlayer from "react-h5-audio-player";
import { v4 } from "uuid";
import { HistoryPanelDetailModel } from "models/HistoryPanelDetailModel";
import { AddNoteDetailModel } from "../../models/AddNoteDetailModel";
import { HistoryPanelStyles } from "./HistoryPanel.Styles";
import "react-h5-audio-player/lib/styles.css";
import { HistoryPanelMemberType } from "../../common/enum";
import PinnedNote from "./PinnedNote/PinnedNote";
import {
  StateToProps,
  DispatchToProps,
  HistoryPanelProps,
} from "./HistoryPanel.Props";
import AddNote from "./AddNote/AddNote";

type Props = StateToProps & DispatchToProps & HistoryPanelProps;

export enum ActionType {
  CarSelected = "carSelected",
  Call = "call",
  RecordOpened = "recordOpened",
  DocumentUploaded = "documentUploaded",
  SMS = "SMS",
  Note = "note",
}

const HistoryPanel: React.FC<Props> = ({
  historyPanelList,
  isNoteAdded,
  handleUnPinHistoryDetail,
  handleSaveNoteDetail,
}) => {
  const [historyContainerHeight, setHistoryContainerHeight] = useState(100);
  const [pinnedNoteContainerHeight, setPinnedNoteContainerHeight] =
    useState(100);

  const checkIsDateChanged = (index: number) => {
    if (index === 0) {
      return true;
    }
    const oldDate = Shared.getFormattedDate(
      historyPanelList[index - 1].timestamp,
      "DDMMYYYY"
    );
    const newDate = Shared.getFormattedDate(
      historyPanelList[index].timestamp,
      "DDMMYYYY"
    );
    return newDate !== oldDate;
  };

  const getPinnedNoteList = () =>
    historyPanelList.filter(
      (message: HistoryPanelDetailModel) => message.isImportant === true
    );

  // get dynamic height for chat container and pinned chat container
  useEffect(() => {
    let timeout: any = null;
    const calculateHeight = () => {
      // get twilio header height
      const twilioHeadingHeight = (
        document.getElementsByClassName("Twilio-MainHeader")[0] as HTMLElement
      )?.offsetHeight;
      // get history heading height
      const headingHeight = (
        document.getElementsByClassName("heading")[0] as HTMLElement
      )?.offsetHeight;
      // get send message container height
      const sendMessageHeight = (
        document.getElementsByClassName(
          "send-message-container"
        )[0] as HTMLElement
      )?.offsetHeight;
      // get available height to load chat container
      const availableHeight =
        window.innerHeight -
        ((twilioHeadingHeight ?? 0) +
          (headingHeight ?? 0) +
          (sendMessageHeight ?? 0));
      // assign 64% from available height to chat container
      let chatHeight = availableHeight * 0.64;
      // assign 30% from available height to pinned chat container
      let pinnedChatHeight = availableHeight * 0.3;
      // pinned chat container padding
      const padding = 20;
      // wait till UI is loaded to set dynamic height
      timeout = setTimeout(() => {
        let pinnedChatInnerHeight = 0;
        // get all pinned message elements
        const pinnedChatElements: any =
          document.getElementsByClassName("pinned-content");
        // get innerHeight of all pinned message
        pinnedChatElements.forEach((element: HTMLElement) => {
          pinnedChatInnerHeight += element.offsetHeight;
        });
        // if inner height is less than pinned chat container, then recalculate container height
        if (pinnedChatInnerHeight < pinnedChatHeight) {
          chatHeight += pinnedChatHeight - (pinnedChatInnerHeight + padding);
          pinnedChatHeight = pinnedChatInnerHeight + padding;
        }
        // set dynamic height
        setHistoryContainerHeight(chatHeight);
        setPinnedNoteContainerHeight(pinnedChatHeight);
      }, 0);
    };
    // update height on window resize
    window.addEventListener("resize", calculateHeight);
    calculateHeight();
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", calculateHeight);
    };
  }, [historyPanelList]);

  const getFileName = (fileUrl: string) => {
    const index = fileUrl.indexOf("?");
    const newUrl = index > 0 ? fileUrl.substring(0, index) : fileUrl;
    return newUrl.split("\\").pop()?.split("/").pop();
  };

  const messageIcon = (message: HistoryPanelDetailModel): React.ReactNode => {
    const { name } = message.actionType;
    if (name === ActionType.CarSelected) {
      return (
        <DirectionsCarIcon
          key={v4()}
          className={
            message.actionedBy === HistoryPanelMemberType.Customer
              ? "customer-icon-position"
              : "agent-icon-position"
          }
        />
      );
    }

    if (name === ActionType.Call) {
      return (
        <PhoneInTalkIcon
          key={v4()}
          className={
            message.actionedBy === HistoryPanelMemberType.Customer
              ? "customer-icon-position"
              : "agent-icon-position"
          }
        />
      );
    }

    const isUrlFileTypeOther = message.url
      ? Shared.getFileType(message.url) !== FileType.Other
      : true;
    return (
      (ActionType.RecordOpened || ActionType.DocumentUploaded) &&
      isUrlFileTypeOther && (
        <Icon
          key={v4()}
          className={
            message.actionedBy === HistoryPanelMemberType.Customer
              ? "customer-icon-position"
              : "agent-icon-position"
          }
        >
          description
        </Icon>
      )
    );
  };

  const dataAvailableElement = (
    <>
      <div className="history-container">
        <div
          className="chat-container"
          style={{ height: `${historyContainerHeight}px` }}
        >
          {historyPanelList.map(
            (message: HistoryPanelDetailModel, index: number) => (
              <React.Fragment key={v4()}>
                {checkIsDateChanged(index) && (
                  <Chip
                    key={v4()}
                    className="date-chip"
                    label={Shared.getFormattedDate(
                      message.timestamp,
                      "dddd, MMMM, DD, YYYY"
                    )}
                  />
                )}
                <div
                  key={v4()}
                  className={
                    message.actionedBy === HistoryPanelMemberType.Customer
                      ? "customer-area"
                      : "agent-area"
                  }
                >
                  <div className="message-content-div" key={v4()}>
                    {message.actionedBy === HistoryPanelMemberType.Agent &&
                      message.content}
                    {messageIcon(message)}
                    {message.actionedBy === HistoryPanelMemberType.Customer &&
                      message.content}
                    {message.url &&
                      Shared.getFileType(message.url) === FileType.Audio && (
                        <div
                          key={v4()}
                          className={
                            message.actionedBy ===
                            HistoryPanelMemberType.Customer
                              ? "customer-audio-div"
                              : "agent-audio-div"
                          }
                        >
                          <AudioPlayer
                            src={message.url}
                            customAdditionalControls={[]}
                            customVolumeControls={[]}
                          />
                        </div>
                      )}
                    {message.url &&
                      Shared.getFileType(message.url) === FileType.Image && (
                        <>
                          <ImagePreview imageSrc={message.url} key={v4()} />
                          <DocumentDownload fileUrl={message.url} key={v4()} />
                        </>
                      )}
                    {message.url &&
                      Shared.getFileType(message.url) === FileType.Other && (
                        <div className="document-div" key={v4()}>
                          <Icon className="file-icon" key={v4()}>
                            insert_drive_file
                          </Icon>
                          {getFileName(message.url)}
                          <DocumentDownload fileUrl={message.url} key={v4()} />
                        </div>
                      )}
                  </div>
                  <div className="time-stamp" key={v4()}>
                    {Shared.getFormattedDate(message.timestamp, "HH:mm")}
                  </div>
                </div>
              </React.Fragment>
            )
          )}
        </div>
        <div style={{ height: `${pinnedNoteContainerHeight}px` }}>
          {getPinnedNoteList().length > 0 && (
            <PinnedNote
              pinnedNoteList={getPinnedNoteList()}
              containerHeight={pinnedNoteContainerHeight}
              handleUnpinNote={(id: string) => handleUnPinHistoryDetail(id)}
            />
          )}
        </div>
      </div>
      <div className="send-message-container">
        <AddNote
          isNoteAdded={isNoteAdded}
          onSaveNoteDetail={(addNoteModel: AddNoteDetailModel) =>
            handleSaveNoteDetail(addNoteModel)
          }
        />
      </div>
    </>
  );

  const dataNotAvailableElement = (
    <div className="missing-history-detail">Data not available</div>
  );

  return (
    <HistoryPanelStyles>
      <div className="heading">HISTORY</div>
      {historyPanelList.length ? dataAvailableElement : dataNotAvailableElement}
    </HistoryPanelStyles>
  );
};

export default HistoryPanel;
