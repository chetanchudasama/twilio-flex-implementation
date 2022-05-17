import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Icon,
  TextField,
} from "@material-ui/core";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import React, { useEffect, useState } from "react";
import { AddNoteDetailModel } from "../../../models/AddNoteDetailModel";
import { AddNoteStyles } from "./AddNote.Styles";

export interface AddNoteProps {
  isNoteAdded: boolean;
  onSaveNoteDetail: (addNoteModel: AddNoteDetailModel) => void;
}

const AddNote: React.FC<AddNoteProps> = ({ isNoteAdded, onSaveNoteDetail }) => {
  const [addNoteDetail, setAddNoteDetail] = useState<AddNoteDetailModel>(
    new AddNoteDetailModel()
  );

  useEffect(() => {
    setAddNoteDetail(new AddNoteDetailModel());
  }, [isNoteAdded]);

  const handleAddNoteDetailChange = (event: any, propertyName: string) => {
    setAddNoteDetail({
      ...addNoteDetail,
      [propertyName]:
        propertyName === "content" ? event.target.value : event.target.checked,
    });
  };

  return (
    <AddNoteStyles>
      <Grid container>
        <Grid className="add-note-container" item xs={10}>
          <Grid item xs={12}>
            <TextField
              className="add-note-text-field"
              onChange={(event) => handleAddNoteDetailChange(event, "content")}
              multiline
              rows={3}
              InputProps={{
                placeholder: "Add note",
              }}
              variant="standard"
              value={addNoteDetail.content}
            />
          </Grid>
          <Grid item xs={12}>
            <FormGroup row>
              <FormControlLabel
                className="add-note-form-control"
                control={
                  <Checkbox
                    icon={
                      <CheckBoxOutlineBlankIcon
                        fontSize="small"
                        className="checkbox"
                      />
                    }
                    checkedIcon={
                      <CheckBoxIcon fontSize="small" className="checkbox" />
                    }
                    checked={addNoteDetail.isImportant}
                    onChange={(event) =>
                      handleAddNoteDetailChange(event, "isImportant")
                    }
                    name="Important"
                  />
                }
                label="Important"
              />
              <FormControlLabel
                className="add-note-form-control"
                control={
                  <Checkbox
                    icon={
                      <CheckBoxOutlineBlankIcon
                        fontSize="small"
                        className="checkbox"
                      />
                    }
                    checkedIcon={
                      <CheckBoxIcon fontSize="small" className="checkbox" />
                    }
                    checked={addNoteDetail.sendToBroker}
                    onChange={(event) =>
                      handleAddNoteDetailChange(event, "sendToBroker")
                    }
                    name="Share with broker"
                  />
                }
                label="Share With Broker"
              />
            </FormGroup>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            color="primary"
            className={`send-btn ${
              !addNoteDetail.content.trim() ? " disable-btn" : ""
            }`}
            onClick={() => onSaveNoteDetail(addNoteDetail)}
            disabled={!addNoteDetail.content.trim()}
          >
            <Icon className="send-icon">send</Icon>
          </Button>
        </Grid>
      </Grid>
    </AddNoteStyles>
  );
};

export default AddNote;
