import styled from "react-emotion";
import {
  white,
  black,
  darkGrey,
  lightGrey,
  secondary,
} from "@common/components";

export const DPAFCAStyles = styled("div")({
  background: white,
  padding: 24,
  marginLeft: -8,
  color: darkGrey,
  ".heading": {
    fontSize: 20,
    lineHeight: "24px",
    fontWeight: 600,
    color: black,
  },
  ".dpafca-title": {
    fontSize: 16,
    fontWeight: 600,
    color: black,
  },
  ".date-of-birth": {
    display: "flex",
    marginBottom: 8,
  },
  ".dob-value": {
    marginTop: 1,
  },
  ".address": {
    borderBottom: `1px solid ${lightGrey}`,
    paddingTop: "0 !important",
    display: "flex",
  },
  ".icon": {
    marginRight: 12,
    color: secondary,
    opacity: 0.4,
  },
  ".icon svg": {
    height: 20,
    width: 16,
  },
  ".fca-note": {
    paddingTop: "0 !important",
  },
});
