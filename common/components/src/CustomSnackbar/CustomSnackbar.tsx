import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import WarningIcon from "@material-ui/icons/Warning";
import { Grid, withStyles, WithStyles } from "@material-ui/core";
import { styles } from "./CustomSnackbar.Styles";

interface CustomSnackbarProps {
  message: string;
  type:
    | "error"
    | "warning"
    | "info"
    | "success"
    | "primary"
    | "secondary"
    | "default";
  onclose?: () => void;
  showCloseButton?: boolean;
  closeButtonText?: string;
}

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: WarningIcon,
  info: InfoIcon,
  primary: InfoIcon,
  secondary: InfoIcon,
  default: InfoIcon,
};

type Props = WithStyles<typeof styles> & CustomSnackbarProps;

const CustomSnackbarContent: React.FC<Props> = (props) => {
  const { type, message, showCloseButton, onclose, closeButtonText, classes } =
    props;
  const IconType = variantIcon[type];

  return (
    <Grid item xs={12} className={classes.root}>
      <SnackbarContent
        className={`${classes.snackbarContainer} ${classes[type]}`}
        message={
          <span className={classes.message}>
            <IconType className={`${classes.icon} ${classes.iconVariant}`} />
            {message}
          </span>
        }
        action={
          showCloseButton && (
            <IconButton
              color="inherit"
              className={classes.close}
              onClick={onclose}
            >
              {closeButtonText || <CloseIcon className={classes.icon} />}
            </IconButton>
          )
        }
      />
    </Grid>
  );
};
export const CustomSnackbar = withStyles(styles)(CustomSnackbarContent);
