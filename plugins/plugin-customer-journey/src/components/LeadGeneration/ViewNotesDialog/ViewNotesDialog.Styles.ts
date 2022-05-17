import {
  black,
  borderStyle,
  darkGrey,
  lightGrey,
  scrollbarColor,
  secondary,
  white,
} from "@common/components";
import styled from "react-emotion";
import { Dialog } from "@material-ui/core";

export const ViewNotesDialogStyles = styled(Dialog)({
  ".dialog-title": {
    padding: 24,
    borderBottom: borderStyle,
  },
  ".dialog-title h6": {
    fontSize: "22px",
    fontWeight: 600,
    textAlign: "left",
    color: black,
  },
  ".close-icon": {
    position: "absolute",
    right: 18,
    top: 20,
  },
  ".dialog-content": {
    padding: 24,
    minHeight: 400,
    "&::-webkit-scrollbar": {
      width: "0.6em",
    },
    "&::-webkit-scrollbar-track": {
      background: white,
    },
    "&::-webkit-scrollbar-thumb": {
      background: darkGrey,
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: scrollbarColor,
    },
  },
  ".dialog-action": {
    padding: "16px 24px",
    borderTop: borderStyle,
    margin: 0,
  },
  ".title-text": {
    display: "flex",
    alignItems: "center",
    marginRight: 48,
    textAlign: "justify",
  },
  ".title-text svg": {
    minHeight: 20,
    minWidth: 16,
    marginRight: 8,
  },
  ".comment-container": {
    padding: 16,
    background: lightGrey,
    marginTop: 4,
    marginBottom: 4,
  },
  ".comment-date-time": {
    color: darkGrey,
    fontSize: 12,
  },
  ".comment": {
    color: black,
    fontSize: 14,
    textAlign: "justify",
    whiteSpace: "pre-line",
    lineHeight: "24px",
    marginTop: -2,
  },
  ".username": {
    paddingTop: 16,
    color: darkGrey,
    fontSize: 12,
  },
  ".add-btn": {
    height: 40,
    marginLeft: 4,
  },
  ".custom-input div": {
    marginTop: "0px !important",
    padding: "10px !important",
  },
  ".disabled-btn": {
    color: `${white} !important`,
    background: `${secondary} !important`,
    opacity: 0.4,
  },
  ".note-unavailable": {
    width: 600,
    textAlign: "center",
  },
  ".content-end": {
    width: "100%",
    height: 1,
  },
});
