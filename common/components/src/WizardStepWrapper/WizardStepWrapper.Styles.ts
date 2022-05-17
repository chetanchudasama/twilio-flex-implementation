import { createStyles } from "@material-ui/core";
import { StyleRules } from "@material-ui/core/styles";
import {
  lightGrey,
  darkGrey,
  scrollbarColor,
  lightPurple,
} from "../shared/AppTheme";

export const wizardStepComponentStyles = (): StyleRules =>
  createStyles({
    root: {},
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
    nextButton: {
      padding: "6px 8px",
      fontWeight: 600,
    },
    previousButton: {
      backgroundColor: lightPurple,
      fontWeight: 600,
    },
    arrowBackBtn: {
      fontSize: 12,
      marginRight: 2,
      marginTop: 1,
    },
    arrowForwardBtn: {
      fontSize: 12,
      marginLeft: 5,
      marginTop: 1,
    },
    actionContainer: {},
  });
