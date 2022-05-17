import styled from "react-emotion";
import {
  black,
  paddingUnit,
  secondary,
  borderStyle,
  darkGrey,
} from "@common/components";

export const HistoryPanelStyles = styled("div")({
  ".heading": {
    padding: paddingUnit * 4,
    letterSpacing: "2.4px",
    textAlign: "left",
    color: black,
    fontSize: "24px",
    borderBottom: borderStyle,
  },
  ".history-container": {
    position: "relative",
    fontSize: "14px",
    color: black,
  },
  ".chat-container": {
    position: "relative",
    padding: "16px",
    overflowY: "scroll",
    textAlign: "center",
    msOverflowStyle: "none" /* IE and Edge */,
    scrollbarWidth: "none" /* Firefox */,
  },
  ".date-chip": {
    position: "sticky",
    top: "0px",
    zIndex: 1,
    minWidth: "220px",
    fontSize: 12,
  },
  ".chat-container::-webkit-scrollbar": {
    display: "none" /* Chrome, Safari and Opera */,
  },
  ".customer-area": {
    textAlign: "left",
    padding: "10px 0px",
  },
  ".agent-area": {
    textAlign: "right",
    padding: "10px 0px",
  },
  ".time-stamp": {
    fontSize: "12px",
    color: darkGrey,
  },
  ".message-content-div": {
    position: "relative",
    whiteSpace: "pre-line",
  },
  ".customer-icon-position": {
    position: "relative",
    top: "5px",
    marginRight: "5px",
    color: secondary,
  },
  ".agent-icon-position": {
    position: "relative",
    top: "5px",
    marginLeft: "5px",
    color: secondary,
  },
  ".agent-audio-div": {
    marginLeft: "70px",
    paddingTop: "5px",
  },
  ".customer-audio-div": {
    marginRight: "70px",
    paddingTop: "5px",
  },
  ".rhap_container": {
    boxShadow: "none",
  },
  ".rhap_time": {
    fontSize: 14,
  },
  ".send-message-container": {
    bottom: "0px",
    borderTop: borderStyle,
    minHeight: "50px",
  },
  ".document-div": {
    padding: "5px 0px",
  },
  ".file-icon": {
    position: "relative",
    top: "5px",
    marginRight: "5px",
    color: secondary,
  },
  ".missing-history-detail": {
    fontSize: "16px",
    textTransform: "uppercase",
    letterSpacing: "2px",
    paddingTop: "20px",
    textAlign: "center",
  },
});
