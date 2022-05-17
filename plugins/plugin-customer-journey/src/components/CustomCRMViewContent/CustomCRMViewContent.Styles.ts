import { borderStyle, white } from "@common/components";
import styled from "react-emotion";

export const CustomCRMViewContentStyles = styled("div")({
  display: "flex",
  position: "relative",
  overflowX: "hidden",
  flex: "1 1 0%",
  background: white,
  borderLeft: borderStyle,
  "flex-direction": "column",
  "-webkit-box-align": "center",
  "align-items": "center",
  "-webkit-box-pack": "center",
  zIndex: 1000,

  ".grid-container": {
    height: "100%",
  },
  ".content-left": {
    borderRight: borderStyle,
  },
  ".customer-banner": {
    borderBottom: borderStyle,
    height: "fit-content",
  },
  ".missing-app-id": {
    fontSize: "24px",
    textTransform: "uppercase",
    letterSpacing: "2px",
    textAlign: "center",
    margin: "34px 20px 0px",
  },
});
