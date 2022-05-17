import styled from "react-emotion";
import { black } from "@common/components";
import {
  convertHexToRGB,
  fade,
} from "@material-ui/core/styles/colorManipulator";

export const DealerSearchStyles = styled("div")({
  paddingTop: "3px",
  ".react-select-container": {
    width: "100% !important",
  },
  ".react-select__control": {
    borderColor: `${fade(convertHexToRGB(black), 0.2)} !important`,
    borderWidth: "1px !important",
    boxShadow: "none !important",
    minHeight: "47px",
    fontSize: "14px",
    color: black,
  },
  ".react-select__placeholder": {
    fontSize: "14px",
    color: black,
  },
  ".react-select__indicator-separator": {
    display: "none",
  },
  ".react-select__menu": {
    fontSize: "14px",
  },
});
