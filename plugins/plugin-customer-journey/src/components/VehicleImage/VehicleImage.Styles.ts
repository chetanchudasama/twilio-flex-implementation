import {
  white,
  borderStyle,
  defaultSnackbarColor,
  darkGrey,
} from "@common/components";
import styled from "react-emotion";

export const VehicleImageStyles = styled("div")({
  width: "100%",
  height: "100%",
  border: borderStyle,
  position: "relative",
  backgroundColor: defaultSnackbarColor,
  borderRadius: "10px 0px 0px 3px",

  ".vehicle-img": {
    width: "100%",
    height: "100%",
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
    cursor: "pointer",
  },
  ".image-count": {
    position: "absolute",
    left: "0",
    top: "0",
    display: "flex",
    justifyContent: "center",
    padding: "10px",
    color: white,
    background: darkGrey,
    cursor: "pointer",
    borderRadius: "10px 0px 5px 0px",
  },
  ".icon": {
    fontSize: "18px",
  },
  ".image-count .icon": {
    paddingRight: "8px",
  },
  ".image-missing": {
    width: "100%",
    height: "100%",
  },
});
