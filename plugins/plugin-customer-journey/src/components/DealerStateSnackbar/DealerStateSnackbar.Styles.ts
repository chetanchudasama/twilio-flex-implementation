import { createStyles, Theme } from "@material-ui/core";
import { amber } from "@material-ui/core/colors";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { deleteButtonColor } from "@common/components";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing.unit * 2,
    },
    snackbarContainer: {
      boxShadow: "none",
      maxWidth: "98%",
      padding: "0.5% 1%",
    },
    listType: {
      listStyle: "disc",
      paddingLeft: "24px",
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: "10px",
    },
    icon: {
      fontSize: 20,
      verticalAlign: "text-bottom",
    },
    warning: {
      backgroundColor: fade(amber[700], 0.1),
      color: deleteButtonColor,
    },
    error: {
      backgroundColor: fade(theme.palette.error.dark, 0.05),
      color: theme.palette.error.dark,
    },
    link: {
      background: "none",
      border: "none",
      cursor: "pointer",
      textDecoration: "underline",
      display: "inline",
      margin: "0",
      padding: "0",
      fontSize: "14px",
      color: "inherit",
      font: "inherit",
      "&:focus": {
        outline: "none",
      },
    },
    content: {
      display: "flex",
      alignItems: "flex-start",
    },
    declinedMessageLink: {
      background: "none",
      border: "none",
      display: "inline",
      textDecoration: "underline",
    },
  });
