import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";
import { createStyles, Theme } from "@material-ui/core";
import { fade } from "@material-ui/core/styles/colorManipulator";
import {
  theme,
  infoSnackbarColor,
  defaultSnackbarColor,
  lightPurple,
} from "../shared/AppTheme";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const styles = (mTheme: Theme) =>
  createStyles({
    root: {
      marginTop: mTheme.spacing.unit,
      marginBottom: mTheme.spacing.unit,
    },
    snackbarContainer: {
      boxShadow: "none",
      maxWidth: "98%",
      padding: "0.5% 1%",
    },
    close: {
      fontSize: 14,
      padding: mTheme.spacing.unit * 2,
      borderRadius: 0,
    },
    message: {
      display: "flex",
      alignItems: "center",
      fontWeight: 600,
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: "10px",
    },
    icon: {
      fontSize: 20,
    },
    warning: {
      backgroundColor: fade(amber[700], 0.1),
      color: amber[700],
    },
    success: {
      backgroundColor: fade(green[600], 0.1),
      color: green[600],
    },
    error: {
      backgroundColor: fade(mTheme.palette.error.dark, 0.1),
      color: theme.palette.error.dark,
    },
    info: {
      backgroundColor: fade(infoSnackbarColor, 0.1),
      color: infoSnackbarColor,
    },
    primary: {
      backgroundColor: fade(mTheme.palette.primary.main, 0.1),
      color: mTheme.palette.primary.main,
    },
    secondary: {
      backgroundColor: lightPurple,
      color: mTheme.palette.secondary.main,
    },
    default: {
      backgroundColor: defaultSnackbarColor,
      color: fade(mTheme.palette.common.black, 0.7),
    },
  });
