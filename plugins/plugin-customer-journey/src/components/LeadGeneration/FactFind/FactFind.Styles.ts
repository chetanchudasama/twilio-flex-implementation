import styled from "react-emotion";
import { black, darkGrey } from "@common/components";

export const FactFindStyles = styled("div")({
  padding: 24,
  marginLeft: -8,
  width: "100%",
  ".heading": {
    fontSize: 20,
    lineHeight: "24px",
    fontWeight: 600,
    color: black,
    marginBottom: 4,
  },
  ".spacing-left": {
    paddingLeft: 16,
  },
  ".custom-width-select": {
    marginTop: 0,
    marginBottom: 0,
  },
  ".custom-width-select > div": {
    height: 40,
    width: 224,
  },
  ".custom-width-select div div": {
    paddingTop: 12,
    paddingBottom: 12,
  },
  ".custom-input": {
    width: 224,
    marginTop: "0 !important",
    marginBottom: "0 !important",
  },
  ".custom-input > div": {
    marginTop: "0 !important",
    height: 40,
    alignItems: "baseline",
  },
  ".custom-input input": {
    paddingTop: "12px !important",
  },
  ".top-spacing": {
    paddingTop: "0 !important",
  },
  ".optional-text": {
    color: darkGrey,
    fontSize: 12,
  },
});
