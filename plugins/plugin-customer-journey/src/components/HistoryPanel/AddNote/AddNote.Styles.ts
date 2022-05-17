import styled from "react-emotion";
import { secondary, white } from "@common/components";

export const AddNoteStyles = styled("div")({
  ".add-note-container": {
    textAlign: "left",
  },
  ".send-icon": {
    fontSize: "28px",
    transform: "rotate(-45deg)",
    position: "relative",
    left: "3px",
    color: white,
  },
  ".send-btn": {
    background: `${secondary}!important`,
    minWidth: "50px",
    width: "auto",
    height: "100%",
    borderRadius: 0,
  },
  ".add-note-form-control": {
    padding: "0px 16px 0px",
  },
  ".add-note-form-control > span:nth-child(1)": {
    padding: "5px",
  },
  ".add-note-form-control > span:nth-child(2)": {
    fontSize: "12px",
    padding: "0px",
  },
  ".disable-btn": {
    opacity: "0.5",
  },
  ".add-note-text-field > div:nth-child(1)": {
    paddingLeft: "10px",
  },
  ".add-note-text-field": {
    width: "100%",
  },
});
