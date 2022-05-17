import { Grid, Icon } from "@material-ui/core";
import React from "react";
import { HistoryPanelDetailModel } from "../../../models/HistoryPanelDetailModel";
import { PinnedNoteStyles } from "./PinnedNote.Styles";

export interface PinnedNoteProps {
  pinnedNoteList: HistoryPanelDetailModel[];
  handleUnpinNote: (id: string) => void;
  containerHeight: number;
}

const PinnedNote: React.FC<PinnedNoteProps> = ({
  pinnedNoteList,
  handleUnpinNote,
  containerHeight,
}) => {
  return (
    <PinnedNoteStyles>
      <div
        className="pinned-chat-container"
        style={{ height: `${containerHeight}px` }}
      >
        {pinnedNoteList.map((message) => (
          <Grid container className="pinned-content" key={message.id}>
            <Grid item xs={1}>
              <Icon className="customer-icon-position" fontSize="small">
                check_circle
              </Icon>
            </Grid>
            <Grid item xs={10} className="message-content">
              {message.content}
            </Grid>
            <Grid item xs={1}>
              <Icon
                className="icon-close"
                fontSize="small"
                onClick={() => handleUnpinNote(message.id)}
              >
                close
              </Icon>
            </Grid>
          </Grid>
        ))}
      </div>
    </PinnedNoteStyles>
  );
};

export default PinnedNote;
