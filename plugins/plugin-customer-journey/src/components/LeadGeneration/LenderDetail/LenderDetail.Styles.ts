import styled from "react-emotion";
import { darkGrey, white, black } from "@common/components";

export const LenderDetailStyles = styled("div")({
  padding: 24,
  background: white,
  marginLeft: -8,
  ".lender-detail-heading": {
    fontSize: 20,
    lineHeight: "24px",
    fontWeight: 600,
    color: black,
    marginBottom: 4,
  },
  ".preferred-lender": {
    display: "flex",
  },
  ".preferred-lender-icon": {
    marginRight: 12,
  },
  ".preferred-lender-icon svg": {
    height: 20,
    width: 16,
  },
  ".preferred-lender-name": {
    color: darkGrey,
  },
});
