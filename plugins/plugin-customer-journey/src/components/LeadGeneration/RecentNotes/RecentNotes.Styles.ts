import {
  white,
  black,
  secondary,
  darkGrey,
  leadGenBorderColor,
} from "@common/components";
import styled from "react-emotion";

export const RecentNotesStyles = styled("div")({
  background: white,
  padding: 24,
  marginRight: -8,
  height: "calc(100% - 48px)",
  border: `1px solid ${leadGenBorderColor}`,
  borderRadius: 4,
  boxShadow: "0px 1px 2px rgba(44, 43, 53, 0.04)",
  ".note-title-container": {
    marginTop: -8,
    marginBottom: 18,
  },
  ".heading": {
    fontSize: 20,
    lineHeight: "24px",
    fontWeight: 600,
    marginBottom: 2,
    color: black,
  },
  ".note-btn": {
    color: secondary,
    background: white,
    "&:hover": {
      backgroundColor: white,
    },
    fontWeight: 400,
    fontSize: 14,
    textTransform: "none",
  },
  ".view-note-btn": {
    marginRight: 24,
  },
  ".comment": {
    color: darkGrey,
    fontSize: 14,
    lineHeight: "24px",
    whiteSpace: "pre-line",
    textAlign: "justify",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 3,
    textOverflow: "ellipsis",
    overflow: "hidden",
    display: "-webkit-box",
  },
  ".divider": {
    margin: "10px 0",
  },
  ".comment-detail": {
    fontSize: 12,
    color: darkGrey,
    opacity: 0.7,
    marginTop: 2,
  },
  ".created-date": {
    marginRight: 16,
  },
  ".note-unavailable": {
    color: darkGrey,
    fontSize: 16,
    textAlign: "center",
  },
});
