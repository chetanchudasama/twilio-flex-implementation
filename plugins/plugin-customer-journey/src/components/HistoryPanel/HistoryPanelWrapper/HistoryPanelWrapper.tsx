import { Manager } from "@twilio/flex-ui";
import React, { useState } from "react";
import { AddNoteDetailModel } from "../../../models/AddNoteDetailModel";
import { UpdateDetailRequestModel } from "../../../models/UpdateDetailRequestModel";
import { showErrorMessage } from "../../../Notifications";
import { useApplicationService } from "../../../services/application.service";
import { AppState } from "../../../states";
import HistoryPanel from "../HistoryPanel.Container";
import { DispatchToProps, StateToProps } from "./HistoryPanelWrapper.Props";

type Props = StateToProps & DispatchToProps;

const HistoryPanelWrapper: React.FC<Props> = (props) => {
  const state: AppState = Manager.getInstance().store.getState();
  const applicationService = useApplicationService(
    state.flex.session.ssoTokenPayload.token
  );
  const [isNoteAdded, setIsNoteAdded] = useState(false); // required to clear add note UI, once note is saved

  const handleUnpinNote = async (messageId: string) => {
    const index = props.historyPanelList.findIndex(
      (item) => item.id === messageId
    );
    if (index > -1) {
      try {
        const requestModel = new UpdateDetailRequestModel();
        requestModel.op = "replace";
        requestModel.path = "/isImportant";
        requestModel.value = false;

        await applicationService.updateHistoryDetails(
          props.applicationId,
          messageId,
          [requestModel]
        );
        props.unPinHistoryDetail(index);
      } catch (error) {
        showErrorMessage("Something went wrong, please try again!", "", true);
      }
    }
  };

  const handleSaveNoteDetail = async (addNoteModel: AddNoteDetailModel) => {
    setIsNoteAdded(false);
    // eslint-disable-next-line no-param-reassign
    addNoteModel.applicationId = props.applicationId;
    try {
      await applicationService.addNoteDetail(addNoteModel);
      setIsNoteAdded(true);
      // add note to history panel detail list
      props.addNoteDetail(addNoteModel.content, addNoteModel.isImportant);
    } catch (error) {
      showErrorMessage("Something went wrong, please try again!", "", true);
    }
  };

  return (
    <>
      <HistoryPanel
        isNoteAdded={isNoteAdded}
        handleUnPinHistoryDetail={(messageId: string) =>
          handleUnpinNote(messageId)
        }
        handleSaveNoteDetail={(addNoteDetail: AddNoteDetailModel) =>
          handleSaveNoteDetail(addNoteDetail)
        }
      />
    </>
  );
};

export default HistoryPanelWrapper;
