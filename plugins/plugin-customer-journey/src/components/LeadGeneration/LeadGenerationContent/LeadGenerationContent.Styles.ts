import styled from "react-emotion";
import {
  darkGrey,
  lightGrey,
  white,
  scrollbarColor,
  black,
  mediumGrey,
  leadGenBorderColor,
} from "@common/components";

export const LeadGenerationContentStyles = styled("div")({
  overflowY: "hidden",
  overflowX: "hidden",
  width: "100%",
  height: "100%",
  ".lead-gen-container": {
    fontSize: 14,
    padding: "16px 24px",
    height: "100%",
    width: "100%",
    background: lightGrey,
    marginLeft: 0,
    marginTop: 0,
    "&::-webkit-scrollbar": {
      width: "0.6em",
    },
    "&::-webkit-scrollbar-track": {
      background: lightGrey,
    },
    "&::-webkit-scrollbar-thumb": {
      background: darkGrey,
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: scrollbarColor,
    },
  },
  ".hide-scrollbar": {
    overflowY: "hidden",
  },
  ".show-scrollbar": {
    overflowY: "auto",
  },
  ".white-background": {
    background: white,
    margin: "12px 0",
    paddingTop: "0 !important",
    paddingBottom: "0 !important",
    border: `1px solid ${leadGenBorderColor}`,
    borderRadius: 4,
    boxShadow: "0px 1px 2px rgba(44, 43, 53, 0.04)",
  },
  ".customer-name": {
    paddingLeft: "2px !important",
    fontSize: 25,
    fontWeight: 600,
    color: darkGrey,
    display: "flex",
    wordBreak: "break-word",
  },
  ".step-container": {
    display: "flex",
  },
  ".step-name": {
    marginLeft: 16,
    marginRight: 4,
    marginTop: 22,
    fontSize: 20,
    fontWeight: 600,
    color: black,
    opacity: 0.5,
  },
  ".divider-left": {
    borderLeft: `1px solid ${mediumGrey}`,
    height: 40,
    margin: "0 16px",
  },
  ".menu-container": {
    display: "flex",
    justifyContent: "flex-end",
    paddingRight: "0px !important",
  },
  ".menu-container .icon-btn": {
    minHeight: 40,
    background: white,
  },
});
