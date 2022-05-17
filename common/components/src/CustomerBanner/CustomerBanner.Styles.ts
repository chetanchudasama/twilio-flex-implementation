import styled from "react-emotion";
import {
  darkGrey,
  paddingUnit,
  secondary,
  lightGrey,
} from "../shared/AppTheme";

export const CustomerBannerStyles = styled("div")({
  padding: "15px 9px 4px 10px",
  ".banner-container-1": {
    marginBottom: 25,
  },
  ".banner-container-2": {
    marginBottom: 10,
  },
  ".banner-container-3": {
    marginBottom: 5,
  },
  ".app-text": {
    fontSize: 25,
    fontWeight: 600,
  },
  ".app-icon": {
    verticalAlign: "text-bottom",
    padding: "0 5px",
  },
  ".name": {
    fontWeight: 600,
    fontSize: 25,
    color: darkGrey,
  },
  ".app-status": {
    background: lightGrey,
    padding: 10,
    verticalAlign: "super",
    fontSize: 14,
    color: darkGrey,
    fontWight: 600,
    marginLeft: 15,
    borderRadius: 4,
  },
  ".banner-menu": { textAlign: "center", marginTop: -2 },
  ".icon": {
    color: secondary,
    opacity: "0.4",
  },
  ".dob": {
    fontSize: 14,
    marginTop: 4,
    paddingLeft: 20,
  },
  ".mobile-number": {
    fontSize: 14,
    marginTop: 4,
    paddingLeft: 20,
  },
  ".address": {
    fontSize: 14,
    marginTop: 3,
    marginLeft: -3,
  },
  ".lender-info": {
    paddingRight: 10,
    paddingLeft: 40,
  },
  ".preferred-lender": {
    fontSize: 14,
    marginTop: 3,
    paddingLeft: 10,
    display: "flex",
  },
  ".email": {
    fontSize: 14,
    marginTop: 2,
  },
  ".mobile-icon": {
    padding: paddingUnit,
    verticalAlign: "bottom",
    color: secondary,
  },
  ".apr": {
    fontSize: 14,
    marginTop: 2,
    paddingLeft: 10,
  },
  ".tier": {
    fontSize: 14,
    marginTop: 2,
    paddingLeft: 15,
  },
  ".text-align-right": {
    textAlign: "right",
  },
  ".percentIcon": {
    color: secondary,
    opacity: "0.4",
    fontSize: 20,
    position: "relative",
    bottom: "3px",
  },
  ".lender-label": {
    minWidth: "120px",
    width: "120px",
  },
  ".lender-name": {
    wordBreak: "break-all",
  },
});
