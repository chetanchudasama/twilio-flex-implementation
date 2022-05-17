import Dialog from "@material-ui/core/Dialog";
import styled from "react-emotion";
import { black, borderStyle } from "../shared/AppTheme";

export const ResponsiveDialogStyles = styled(Dialog)({
  fontFamily: "Open Sans !important",
  ".dialog-title": {
    borderBottom: borderStyle,
  },
  ".dialog-title > h6": {
    fontSize: "22px",
    fontWeight: 600,
    textAlign: "left",
    color: black,
  },
  ".confirmation-message": {
    margin: "10px",
  },
  ".disabled-btn": {
    pointerEvents: "none",
    cursor: "default",
    opacity: "0.4",
  },
  ".close-icon": {
    position: "absolute",
    right: 8,
    top: 5,
    padding: 4,
  },
  ".delete-btn": {
    position: "absolute",
    left: "12px",
  },
  ".delete-btn-icon": {
    margin: "-3px 5px 0 0",
    fontSize: 20,
  },
});
