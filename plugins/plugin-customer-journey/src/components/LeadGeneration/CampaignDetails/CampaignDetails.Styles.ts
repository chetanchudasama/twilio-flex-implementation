import {
  white,
  darkGrey,
  lightGrey,
  black,
  leadGenBorderColor,
} from "@common/components";
import styled from "react-emotion";

export const CampaignDetailsStyles = styled("div")({
  background: white,
  padding: 24,
  marginLeft: -8,
  height: "calc(100% - 48px)",
  border: `1px solid ${leadGenBorderColor}`,
  borderRadius: 4,
  boxShadow: "0px 1px 2px rgba(44, 43, 53, 0.04)",
  ".border-bottom": {
    borderBottom: `1px solid ${lightGrey}`,
  },
  ".campaign-details-heading": {
    fontSize: 20,
    lineHeight: "24px",
    fontWeight: 600,
    marginBottom: 8,
    color: black,
  },
  ".title": {
    fontWeight: 600,
    color: darkGrey,
  },
  ".detail-value": {
    textAlign: "right",
    color: darkGrey,
  },
  ".detail-row": {
    display: "flex",
    alignItems: "center",
    padding: "12px 0 !important",
    margin: "0 8px",
  },
});
