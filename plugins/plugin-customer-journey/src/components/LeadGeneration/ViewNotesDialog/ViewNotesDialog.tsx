import React, {
  ChangeEvent,
  useMemo,
  useState,
  useRef,
  useEffect,
} from "react";
import { CustomInput, Shared, NoteIcon, secondary } from "@common/components";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
} from "@material-ui/core";
import { v4 } from "uuid";
import { Manager } from "@twilio/flex-ui";
import CloseIcon from "@material-ui/icons/Close";

import { AddNoteRequestModel } from "../../../models/AddNoteRequestModel";
import { AppState } from "../../../states";
import { NoteModel } from "../../../models/NoteModel";
import { ViewNotesDialogStyles } from "./ViewNotesDialog.Styles";
import { ViewNotesDialogProps } from "./ViewNotesDialog.Props";
import { useApplicationService } from "../../../services/application.service";
import {
  CustomNotificationType,
  showErrorMessage,
  showMessage,
} from "../../../Notifications";

export const ViewNotesDialog: React.FC<ViewNotesDialogProps> = ({
  applicationId,
  customerName,
  open,
  recentNotes,
  dialogTitle,
  handleDialogClose,
}) => {
  const state: AppState = Manager.getInstance().store.getState();
  const token: string = useMemo(() => {
    return state.flex.session.ssoTokenPayload.token ?? "";
  }, [state.flex.session.ssoTokenPayload]);
  const applicationService = useApplicationService(token);

  const [notes, setNotes] = useState<string>("");
  const contentEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // wait till note list bind in UI
    setTimeout(() => {
      if (contentEndRef && contentEndRef.current) {
        (contentEndRef.current as HTMLDivElement).scrollIntoView({
          behavior: "smooth",
        });
      }
    }, 0);
  }, []);

  const noteList = useMemo(() => {
    return recentNotes.sort((a: NoteModel, b: NoteModel) => {
      // eslint-disable-next-line no-nested-ternary
      return a.createdOn < b.createdOn ? -1 : a.createdOn > b.createdOn ? 1 : 0;
    });
  }, [recentNotes]);

  const handleNoteChange = (value: string) => {
    setNotes(value);
  };

  const onAddNotes = () => {
    const addNoteRequestModel = Object.assign(new AddNoteRequestModel(), {
      applicationId,
      notes,
    });

    applicationService
      .addNoteRequest(applicationId, addNoteRequestModel)
      .then(() => {
        handleDialogClose(notes);
        showMessage(
          CustomNotificationType.SuccessNotification,
          "Note detail saved successfully!"
        );
      })
      .catch((error) => {
        showErrorMessage(
          "Error submitting add note request, please try again!",
          "",
          true
        );
      });
  };

  return (
    <ViewNotesDialogStyles
      onClose={() => handleDialogClose()}
      open={open}
      maxWidth="sm"
      disableBackdropClick
      disableEscapeKeyDown
      scroll="paper"
    >
      <DialogTitle className="dialog-title">
        <div className="title-text">
          <NoteIcon color={secondary} />
          {`${dialogTitle}: ${customerName} (#${applicationId})`}
        </div>
        <IconButton className="close-icon" onClick={() => handleDialogClose()}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className="dialog-content">
        <Grid container className="notes-container">
          <Grid item xs={12}>
            {noteList.length === 0 && (
              <Grid item xs={12} className="note-unavailable">
                No note(s) available
              </Grid>
            )}
            {noteList.length > 0 &&
              noteList.map((note: NoteModel) => (
                <Grid container key={v4()} className="comment-container">
                  <Grid item xs={3} className="comment-date-time">
                    {Shared.getFormattedDate(note.createdOn, "DD/MM/YY HH:mm")}
                  </Grid>
                  <Grid item xs={9} className="comment-detail">
                    <Grid container>
                      <Grid item xs={12} className="comment">
                        {note.comment}
                      </Grid>
                      <Grid item xs={12} className="username">
                        {`Added by ${note.userName}`}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
          </Grid>
        </Grid>
        <div ref={contentEndRef} className="content-end" />
      </DialogContent>
      <DialogActions className="dialog-action">
        <CustomInput
          label=""
          placeholder="Add a note"
          value={notes}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            handleNoteChange(event.target.value)
          }
          rows={2}
          endAdornment={
            <Button
              onClick={onAddNotes}
              variant="contained"
              color="secondary"
              className={`add-btn ${!notes ? "disabled-btn" : ""}`}
              disabled={!notes}
            >
              Add
            </Button>
          }
          classes={{
            formControl: "custom-input",
          }}
        />
      </DialogActions>
    </ViewNotesDialogStyles>
  );
};
