import React, { useState, useMemo, useEffect } from "react";
import { Grid, Button, Divider } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { v4 } from "uuid";
import { Manager } from "@twilio/flex-ui";
import { Shared } from "@common/components";

import { AppState } from "../../../states";
import { RecentNotesStyles } from "./RecentNotes.Styles";
import { RecentNotesProps } from "./RecentNotes.Props";
import { NoteModel } from "../../../models/NoteModel";
import ViewNotesDialog from "../ViewNotesDialog/ViewNotesDialog.Container";

export const RecentNotes: React.FC<RecentNotesProps> = ({ recentNotes }) => {
  const state: AppState = Manager.getInstance().store.getState();
  const [openViewNotesDialog, setOpenViewNotesDialog] =
    useState<boolean>(false);
  const [allNoteList, setAllNoteList] = useState<NoteModel[]>([]);
  const [isViewNoteBtnClicked, setIsViewNoteBtnClicked] =
    useState<boolean>(false);

  const noteList = useMemo(() => {
    return allNoteList.slice(0, 3);
  }, [allNoteList]);

  const sortNoteList = (notes: NoteModel[]) => {
    return notes.sort((a: NoteModel, b: NoteModel) => {
      // eslint-disable-next-line no-nested-ternary
      return a.createdOn < b.createdOn ? 1 : a.createdOn > b.createdOn ? -1 : 0;
    });
  };

  useEffect(() => {
    let tempNoteList = [...allNoteList];
    const newNotes = recentNotes.filter(
      (n: NoteModel) => !allNoteList.includes(n)
    );
    tempNoteList = [...tempNoteList, ...newNotes];
    setAllNoteList(sortNoteList(tempNoteList));
    // useEffect need not to be called on allNoteList state change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recentNotes]);

  const handleViewNotesDialogClose = (notes?: string) => {
    if (notes) {
      // add note detail to recent note list
      const noteModel: NoteModel = Object.assign(new NoteModel(), {
        commentId: v4(),
        comment: notes,
        createdOn: new Date().toISOString(),
        userName: state.flex.worker.attributes?.full_name || "",
      });
      const tempNoteList = [...allNoteList];
      tempNoteList.push(noteModel);
      setAllNoteList(sortNoteList(tempNoteList));
    }
    setOpenViewNotesDialog(false);
    setIsViewNoteBtnClicked(false);
  };

  return (
    <>
      <RecentNotesStyles>
        <Grid item xs={12} className="note-title-container">
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            spacing={8}
          >
            <Grid item>
              <Typography component="p" variant="caption" className="heading">
                Recent Notes
              </Typography>
            </Grid>
            <Grid item>
              <Button
                variant="text"
                className="note-btn view-note-btn"
                onClick={() => {
                  setIsViewNoteBtnClicked(true);
                  setOpenViewNotesDialog(true);
                }}
              >
                View all notes
              </Button>
              <Button
                variant="text"
                className="note-btn"
                onClick={() => {
                  setOpenViewNotesDialog(true);
                }}
              >
                Add note
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {recentNotes.length === 0 && (
            <Grid item xs={12} className="note-unavailable">
              No recent note(s) available
            </Grid>
          )}
          {noteList.length > 0 &&
            noteList.map((note: NoteModel, index: number) => (
              <Grid container key={v4()}>
                <Grid item xs={12} className="comment">
                  {note.comment}
                </Grid>
                <Grid item xs={12} className="comment-detail">
                  <span className="created-date">
                    {Shared.getFormattedDate(note.createdOn, "DD/MM/YY")}
                  </span>
                  <span>{note.userName}</span>
                </Grid>
                <Grid item xs={12}>
                  {noteList.length - 1 !== index && (
                    <Divider className="divider" />
                  )}
                </Grid>
              </Grid>
            ))}
        </Grid>
      </RecentNotesStyles>
      {openViewNotesDialog && (
        <ViewNotesDialog
          open={openViewNotesDialog}
          recentNotes={allNoteList}
          dialogTitle={isViewNoteBtnClicked ? "View Note" : "Add Note"}
          handleDialogClose={handleViewNotesDialogClose}
        />
      )}
    </>
  );
};
