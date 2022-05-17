import { Grid, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { ResponsiveDialog } from "../ResponsiveDialog/index";
import { CallbackDialogStyles } from "./CallbackDialog.Styles";
import { MuiDatePicker } from "../MuiDatePicker/MuiDatePicker";

export interface CallbackDialogProps {
  open: boolean;
  noteOptional?: boolean;
  callbackBooked?: Date;
  setCallbackDetail: (callback: Date | null, note?: string) => void;
  handleCloseDialog: () => void;
}

export const CallbackDialog: React.FC<CallbackDialogProps> = ({
  open,
  noteOptional,
  callbackBooked,
  setCallbackDetail,
  handleCloseDialog,
}) => {
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [callbackDateTime, setCallbackDateTime] = useState<Date | null>(
    callbackBooked as Date
  );
  const [reason, setReason] = useState<string>("");
  const [highlightRequiredDetail, setHighlightRequiredDetail] =
    useState<boolean>(false);

  const handleChange = (value: Date | string, propertyName: string) => {
    if (propertyName === "callbackDateTime") {
      setCallbackDateTime(value as Date);
    } else {
      setReason(value as string);
    }
  };

  const handleSetCallback = () => {
    setHighlightRequiredDetail(true);
    if (callbackDateTime && (!noteOptional ? reason : true)) {
      setCallbackDetail(callbackDateTime, reason);
    }
  };

  return (
    <>
      {open && (
        <ResponsiveDialog
          title={callbackBooked ? "Update Callback" : "Set Callback"}
          open={open}
          onCancel={() => handleCloseDialog()}
          onConfirm={() => handleSetCallback()}
          maxWidth="xs"
          showActionButtons
          cancelText="close"
          okText={callbackBooked ? "Update" : "Set Callback"}
          disableSaveButton={callbackBooked === callbackDateTime}
          showDeleteButton={!!callbackBooked}
          onDelete={() => {
            setOpenConfirmationDialog(true);
          }}
        >
          <CallbackDialogStyles>
            <Grid item xs={12}>
              <MuiDatePicker
                showDateTimePicker
                value={callbackDateTime}
                label="Callback Date Time"
                disablePastDates
                isRequired
                handleDateChange={(value) => {
                  handleChange(value!, "callbackDateTime");
                }}
                error={highlightRequiredDetail && !callbackDateTime}
              />
            </Grid>
            {!noteOptional && (
              <Grid item xs={12} className="reason-field">
                <TextField
                  label="Reason for call"
                  value={reason}
                  onChange={(event) =>
                    handleChange(event.target.value, "reason")
                  }
                  fullWidth
                  multiline
                  rows={3}
                  required
                  error={highlightRequiredDetail && !reason}
                  helperText={
                    highlightRequiredDetail && !reason
                      ? "The reason field is required"
                      : ""
                  }
                />
              </Grid>
            )}
          </CallbackDialogStyles>
        </ResponsiveDialog>
      )}
      {openConfirmationDialog && (
        <ResponsiveDialog
          open={openConfirmationDialog}
          maxWidth="xs"
          onConfirm={() => setCallbackDetail(null)}
          onCancel={() => setOpenConfirmationDialog(false)}
          showActionButtons
          okText="Yes"
          cancelText="No"
          isConfirmationDialog
        >
          <div className="confirmation-message">
            Are you sure you want to delete the call back details?
          </div>
        </ResponsiveDialog>
      )}
    </>
  );
};
