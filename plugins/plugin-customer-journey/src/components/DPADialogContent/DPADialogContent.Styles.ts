import { styled } from "@twilio/flex-ui";
import {
  black,
  white,
  red,
  secondary,
  darkGreen,
  lightGrey,
} from "@common/components";

export const DPADialogContentStyles = styled("div")({
  fontFamily: "Open Sans",
  ".confirm-pin-input > input[type='number']::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button":
    {
      WebkitAppearance: "none",
      margin: 0,
    },
  ".set-pin-input > input[type='number']::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button":
    {
      WebkitAppearance: "none",
      margin: 0,
    },
  ".confirm-pin-input > input": {
    pointerEvents: "none",
    userSelect: "none",
  },
  ".confirm-pin-message": {
    fontSize: "16px",
    textAlign: "center",
    color: black,
    paddingTop: "25px",
  },
  ".input-box": {
    textAlign: "center",
    padding: "20px 30px",
  },
  ".action-button-div": {
    textAlign: "center",
    paddingBottom: "30px",
  },
  ".button-red": {
    backgroundColor: `${red}!important`,
    color: `${white}!important`,
    fontWeight: 600,
    margin: "5px",
  },
  ".button-green": {
    backgroundColor: `${darkGreen}!important`,
    color: `${white}!important`,
    fontWeight: 600,
    margin: "5px",
  },
  ".set-pin-btn": {
    backgroundColor: `${secondary}!important`,
    color: `${white}!important`,
    fontWeight: 600,
    margin: "5px",
  },
  ".dialog-bottom-div": {
    backgroundColor: lightGrey,
    textAlign: "center",
  },
  ".confirm-detail-message": {
    fontSize: "16px",
    textAlign: "center",
    color: black,
    padding: "30px 0px 15px 0px",
  },
  ".form-control-label": {
    marginBottom: "-10px",
  },
  ".form-control-label > span:nth-child(2)": {
    fontSize: "12px",
    textAlign: "left",
    color: black,
  },
  ".input-box-set-pin": {
    textAlign: "center",
    padding: "15px 0px 30px 0px",
    height: "100px",
  },
  ".disabled-button": {
    opacity: 0.5,
  },
});
