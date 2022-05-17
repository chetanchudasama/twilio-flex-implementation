import styled from "react-emotion";
import { borderStyle } from "@common/components";

export const CarSearchCriteriaStyles = styled("div")({
  padding: "20px",
  ".car-search-container": {
    borderBottom: borderStyle,
    paddingBottom: "20px",
  },
  ".margin-top": {
    marginTop: "20px",
  },
  ".budget-container": {
    paddingTop: "25px",
    paddingLeft: "80px",
  },
  ".text-align-right": {
    textAlign: "right",
  },
  ".padding-left": {
    paddingLeft: "10px",
  },
  ".padding-right": {
    paddingRight: "10px",
  },
  ".flexible-budget-control": {
    padding: "7px 0px 3px",
  },
  ".search-icon": {
    position: "relative",
    left: "-5px",
  },
  ".link": {
    fontSize: "14px",
    textDecoration: "underline",
    padding: 0,
    textTransform: "unset",
  },
  ".link:hover": {
    background: "none",
    textDecoration: "underline",
  },
  ".budget-type": {
    marginBottom: "6px",
  },
  ".engine-size-label": {
    marginTop: "8px",
  },
  ".custom-snackbar": {
    padding: "15px 0px",
  },
  ".dealer-container": {
    paddingTop: "8px",
    paddingBottom: "8px",
  },
});
