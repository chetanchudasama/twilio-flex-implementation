import { red, white, theme } from "@common/components";
import styled from "react-emotion";
import { fade } from "@material-ui/core/styles/colorManipulator";

export const PinnedNoteStyles = styled("div")({
  ".pinned-chat-container": {
    position: "relative",
    backgroundColor: white,
    zIndex: 2,
    overflowY: "scroll",
    textAlign: "left",
    padding: "0px 16px 0px",
    msOverflowStyle: "none" /* IE and Edge */,
    scrollbarWidth: "none" /* Firefox */,
  },
  ".pinned-chat-container::-webkit-scrollbar": {
    display: "none" /* Chrome, Safari and Opera */,
  },
  ".pinned-content": {
    margin: "5px 0px",
    backgroundColor: fade(theme.palette.error.dark, 0.1),
    color: red,
    padding: "5px",
  },
  ".icon-close": {
    position: "relative",
    cursor: "pointer",
    top: "2px",
  },
  ".customer-icon-position": {
    position: "relative",
    top: "3px",
    color: theme.palette.error.dark,
  },
  ".message-content": {
    wordBreak: "break-all",
    padding: "2px 5px 0px 5px",
    whiteSpace: "pre-line",
  },
});
