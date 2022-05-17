import styled from "react-emotion";
import { black, mediumGrey, secondary, white } from "@common/components";

export const UpdateApplicationStyles = styled("div")({
  background: white,
  padding: 24,
  marginLeft: -8,
  width: "100%",
  ".update-application-heading": {
    fontSize: 20,
    lineHeight: "24px",
    fontWeight: 600,
    color: black,
    paddingBottom: 8,
  },
  ".update-application-text": {
    fontSize: 14,
    paddingTop: 8,
  },
  ".update-application": {
    display: "flex",
    alignItems: "center",
  },
  ".update-button": {
    textAlign: "right",
  },
  ".update-application-btn": {
    margin: "5px 0",
    color: secondary,
    background: white,
    border: `1px solid ${mediumGrey}`,
    "&:hover": {
      backgroundColor: white,
    },
    borderRadius: 4,
    fontWeight: 600,
    fontSize: 14,
  },
});
