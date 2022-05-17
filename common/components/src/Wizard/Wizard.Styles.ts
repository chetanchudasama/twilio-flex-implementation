import { createStyles, Theme, withStyles } from "@material-ui/core";
import Step from "@material-ui/core/Step";
import StepConnector from "@material-ui/core/StepConnector";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import type { StyleRules } from "@material-ui/core/styles/withStyles";
import {
  darkPurple,
  red,
  secondary,
  white,
  stepperHeaderColor,
} from "../shared/AppTheme";

export const wizardStyles = (theme: Theme): StyleRules =>
  createStyles({
    root: {},
    stepActive: {
      borderRight: `2px solid ${secondary}`,
      backgroundColor: secondary,
      color: `${white}!important`,
      "&:after": {
        borderLeft: `25px solid ${secondary}`,
      },
    },
    stepDanger: {
      borderRight: `2px solid ${red}`,
      backgroundColor: red,
      color: `${white}!important`,
      "&:after": {
        borderLeft: `25px solid ${red}`,
      },
    },
    stepperContent: {
      padding: theme.spacing.unit * 2,
    },
    clickableStep: {
      cursor: "pointer !important",
      "& span": {
        cursor: "pointer !important",
      },
    },
    checkIcon: {
      fontSize: "18px",
      verticalAlign: "text-bottom",
      paddingRight: "6px",
      paddingBottom: "2px",
    },
    stepIndex: {
      paddingRight: "6px",
    },
  });

const StepperStyles = (theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing.unit * 2,
      width: "100%",
      borderRadius: 5,
      overflow: "hidden",
      boxSizing: "border-box",
      maxWidth: "100%",
    },
  });
export const StyledStepper = withStyles(StepperStyles)(Stepper);

const StepConnectorStyles = () =>
  createStyles({
    root: {
      display: "none",
    },
  });

export const StyledStepConnector =
  withStyles(StepConnectorStyles)(StepConnector);

const StepStyles = (theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing.unit * 2,
      backgroundColor: stepperHeaderColor,
      borderRight: `1px solid${stepperHeaderColor}`,
      position: "relative",
      paddingLeft: 35,
      display: "border-box",
      cursor: "default",
      "&:first-child": {
        padding: theme.spacing.unit * 2,
        borderRadius: "5px 0px 0px 5px",
        "&:before": {
          display: "none",
        },
      },
      "&:last-child": {
        padding: theme.spacing.unit * 2,
        paddingLeft: 35,
        borderRadius: "0px 5px 5px 0px",
        "&:after": {
          display: "none",
        },
      },
      "&:after": {
        content: "''",
        position: "absolute",
        borderTop: "24px solid transparent",
        borderLeft: `25px solid ${stepperHeaderColor}`,
        borderBottom: "24px solid transparent",
        right: -23,
        bottom: 0,
        zIndex: 2,
      },
      "&:before": {
        content: "''",
        top: -5,
        left: -3,
        bottom: -3,
        position: "absolute",
        borderTop: "29px solid transparent",
        borderLeft: `30px solid ${white}`,
        borderBottom: "29px solid transparent",
        zIndex: 1,
      },
    },
    completed: {
      borderRight: `2px solid ${darkPurple}`,
      backgroundColor: darkPurple,
      color: `${white}!important`,
      "&:after": {
        borderLeft: `25px solid ${darkPurple}`,
      },
    },
  });

export const StyledStep = withStyles(StepStyles)(Step);

const StepLabelStyles = (theme: Theme) =>
  createStyles({
    iconContainer: {
      display: "none",
    },
    label: {
      fontSize: 16,
      padding: theme.spacing.unit,
      fontWeight: "bold",
      cursor: "default",
    },
    active: {
      color: `${white}!important`,
      cursor: "pointer",
    },
    completed: {
      color: `${white}!important`,
      cursor: "pointer",
    },
    error: {
      color: `${white}!important`,
      cursor: "pointer",
    },
  });

export const StyledStepLabel = withStyles(StepLabelStyles)(StepLabel);
