import styled from "react-emotion";
import { black, borderStyle } from "@common/components";
import { Dialog } from "@material-ui/core";

export const DealerGuideStyles = styled(Dialog)({
  ".dialog-title": {
    padding: "24px 24px 16px 24px",
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
    right: 16,
    top: 18,
  },
  ".dialog-content": {
    padding: "16px 24px 16px 24px",
    textAlign: "justify",
    lineHeight: "28px",
    fontSize: "14px",
  },
  ".padding-bottom": {
    paddingBottom: "16px",
  },
  ".sub-heading": {
    fontWeight: 600,
    paddingBottom: "8px",
    fontSize: "16px",
  },
  ".approved-for-dci-list": {
    listStyle: "decimal",
    paddingLeft: "32px",
  },
  ".approved-for-dci-list li": {
    paddingLeft: "8px",
  },
  ".unknown-guide-list": {
    listStyle: "disc",
    paddingLeft: "32px",
  },
  ".unknown-guide-list li": {
    paddingLeft: "4px",
  },
  ".link": {
    fontWeight: 600,
    textDecoration: "underline",
    color: "inherit",
  },
  ".dialog-action": {
    padding: "16px 24px 16px 24px",
    margin: 0,
  },
  ".close-btn": {
    fontSize: "14px",
    fontWeight: "bold",
  },
});
