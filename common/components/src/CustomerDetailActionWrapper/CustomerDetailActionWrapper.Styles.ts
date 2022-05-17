import { createStyles } from "@material-ui/core";
import { StyleRules } from "@material-ui/core/styles";
import {
  paddingUnit,
  customerActionWrapperBackground,
  lightGrey,
  darkGrey,
  scrollbarColor,
  lightPurple,
} from "../shared/AppTheme";

export const wizardComponentStyles = (): StyleRules =>
  createStyles({
    root: {
      padding: paddingUnit * 2,
      background: customerActionWrapperBackground,
    },
    content: {
      overflowX: "hidden",
      overflowY: "auto",
      "&::-webkit-scrollbar": {
        width: "0.6em",
      },
      "&::-webkit-scrollbar-track": {
        background: lightGrey,
      },
      "&::-webkit-scrollbar-thumb": {
        background: darkGrey,
      },
      "&::-webkit-scrollbar-thumb:hover": {
        background: scrollbarColor,
      },
    },
    previousButton: {
      fontSize: "14px",
      fontWeight: 600,
      backgroundColor: lightPurple,
    },
    arrowBackBtn: {
      fontSize: 12,
      marginRight: 2,
      marginTop: 1,
    },
    actionContainer: {},
    leadGenScreen: {
      padding: paddingUnit * 2,
      paddingLeft: 0,
      background: lightGrey,
    },
  });
