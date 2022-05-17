import { createStyles, Theme } from "@material-ui/core";
import { StyleRules } from "@material-ui/core/styles";

import { fade } from "@material-ui/core/styles/colorManipulator";
import { defaultSnackbarColor } from "../shared/AppTheme";

export const styles = (theme: Theme): StyleRules =>
  createStyles({
    root: {
      padding: theme.spacing.unit,
      backgroundColor: defaultSnackbarColor,
      borderRadius: 3,
      width: "fit-content",
      boxShadow: "none",
    },
    button: {
      "&:first-child": {
        marginLeft: 0,
      },
      "&:last-child": {
        marginRight: 0,
      },
      marginLeft: theme.spacing.unit * 0.5,
      marginRight: theme.spacing.unit * 0.5,
      fontWeight: 600,
      borderRadius: "3px !important",
      color: `${fade(theme.palette.common.black, 0.6)} !important`,
      padding: theme.spacing.unit * 4,
    },
    selected: {
      backgroundColor: `${theme.palette.common.white} !important`,
      color: `${theme.palette.secondary.main} !important`,
      boxShadow:
        "0px 1px 5px 0px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 3px 1px -2px rgb(0 0 0 / 12%)",
      borderRadius: "3px !important",
    },
    label: {
      textTransform: "none",
    },
  });
