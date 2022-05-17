import { ResponsiveDialog } from "@common/components";
import React, { useState } from "react";
import { Manager } from "@twilio/flex-ui";
import { DPAFailedRequest } from "../../models/DPAFailedRequest";
import { UpdateDetailRequestModel } from "../../models/UpdateDetailRequestModel";
import {
  CustomNotificationType,
  showErrorMessage,
  showMessage,
} from "../../Notifications";
import { useDPAService } from "../../services/dpa.service";
import DPADialogContent from "../DPADialogContent/DPADialogContent.Container";
import { DispatchToProps, StateToProps } from "./DPADialogWrapper.Props";
import { AppState } from "../../states";

export interface DPADialogWrapperProps {
  applicationId: number;
  closeDPADialog: () => void;
}

export type Props = StateToProps & DispatchToProps & DPADialogWrapperProps;

const DPADialogWrapper: React.FC<Props> = ({
  applicationId,
  closeDPADialog,
  pin,
  postCode,
  dateOfBirth,
}) => {
  const state: AppState = Manager.getInstance().store.getState();
  const dpaService = useDPAService(state.flex.session.ssoTokenPayload.token);

  const [open, setOpen] = useState(true);

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleDPAConfirm = () => {
    handleDialogClose();
    closeDPADialog();
  };

  const handleDPAFailed = async () => {
    try {
      await dpaService.dpaFailed(new DPAFailedRequest(applicationId));
      handleDialogClose();
      closeDPADialog();
      showMessage(
        CustomNotificationType.ErrorNotification,
        "Please raise a Suspicious Activity Report via the service desk."
      );
    } catch (error) {
      showErrorMessage("Something went wrong, please try again!", "", true);
    }
  };

  const setNewPin = async (newPin: string) => {
    try {
      const requestModel = new UpdateDetailRequestModel();
      requestModel.op = "replace";
      requestModel.path = "/dpaPin";
      requestModel.value = newPin;
      console.log("SET NEW PIN APPID");
      await dpaService.setNewPin(applicationId, [requestModel]);
      handleDialogClose();
      closeDPADialog();
    } catch (error) {
      showErrorMessage("Something went wrong, please try again!", "", true);
    }
  };

  return (
    <div>
      {open && (
        <ResponsiveDialog
          title="Data Protection"
          open={open}
          onCancel={handleDialogClose}
          onConfirm={handleDialogClose}
          maxWidth="sm"
          showActionButtons={false}
        >
          <DPADialogContent
            pin={pin}
            postCode={postCode}
            dateOfBirth={dateOfBirth}
            onDPAFailed={handleDPAFailed}
            onDPAConfirm={handleDPAConfirm}
            onSetNewPin={(newPin: string) => setNewPin(newPin)}
          />
        </ResponsiveDialog>
      )}
    </div>
  );
};

export default DPADialogWrapper;
