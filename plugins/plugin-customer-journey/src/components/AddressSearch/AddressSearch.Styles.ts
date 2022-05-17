import {
  black,
  lightGrey,
  secondary,
  borderStyle,
  mediumGrey,
} from "@common/components";
import styled from "react-emotion";

export const AddressSearchStyles = styled("div")({
  padding: "10px",
  fontFamily: "Open Sans !important",
  fontSize: "14px !important",
  ".address-title": {
    borderBottom: borderStyle,
  },
  ".address-configuration": {
    paddingTop: "30px",
  },
  ".custom-width-select": {
    marginBottom: "9px",
  },
  ".building-name": {
    paddingLeft: "10px",
  },
  ".building-number": {
    paddingRight: "10px",
  },
  ".link-button": {
    textDecoration: "underline",
    paddingLeft: 0,
    textTransform: "capitalize",
  },
  ".link-button:hover": {
    textDecoration: "underline",
  },
  ".address-current": {
    backgroundColor: lightGrey,
    color: black,
    padding: "1rem",
    marginTop: "15px",
  },
  ".enter-manually": {
    paddingBottom: "40px",
    borderBottom: borderStyle,
  },
  ".edit-icon": {
    position: "relative",
    right: "5px",
    fontSize: "16px",
  },
  "address-edit-button": {
    width: "fit-content",
    display: "flex",
    fontSize: "14px",
    color: secondary,
    padding: "8px 0px 0px 0px",
    textTransform: "unset",
  },
  ".react-select-container": {
    width: "100% !important",
  },
  ".react-select__control": {
    borderColor: `${mediumGrey} !important`,
    borderWidth: "1px !important",
    boxShadow: "none !important",
  },
});
