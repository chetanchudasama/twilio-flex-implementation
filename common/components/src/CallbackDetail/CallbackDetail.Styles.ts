import styled from "react-emotion";
import { secondary, borderStyle, lightPurple } from "../shared/AppTheme";

export const CallbackStyles = styled("div")({
  justifyContent: "center",
  fontSize: "12px",
  color: secondary,
  textAlign: "left",
  float: "right",
  ".callback-booked": {
    backgroundColor: lightPurple,
    padding: "2px 10px",
    marginTop: "-2px",
    borderRadius: 4,
  },
  ".callback-btn": {
    padding: "7px",
    color: secondary,
    fontWeight: 600,
    border: borderStyle,
  },
  ".callback-date": {
    verticalAlign: "top",
  },
  ".edit-icon": {
    paddingLeft: "10px",
    fontSize: "14px",
    cursor: "pointer",
  },
  ".callback-icon": {
    paddingRight: "5px",
    fontSize: "14px",
  },
});
