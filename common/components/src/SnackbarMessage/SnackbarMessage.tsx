import React from "react";
import { Snackbar, Button } from "@material-ui/core";
import { SnackbarMessageStyles } from "./SnackbarMessage.Styles";

export interface SnackbarMessageProp {
  open: boolean;
  message: string;
  buttonText?: string;
  handleCloseSnackbar: (isButtonClicked: boolean) => void;
}

export const SnackbarMessage: React.FC<SnackbarMessageProp> = ({
  open,
  message,
  buttonText,
  handleCloseSnackbar,
}) => {
  const handleClose = (
    _event: React.SyntheticEvent | MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    handleCloseSnackbar(reason !== "timeout");
  };

  return (
    <SnackbarMessageStyles>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        onClose={handleClose}
        message={message}
        autoHideDuration={5000}
        action={
          <>
            <Button className="close-icon" size="small" onClick={handleClose}>
              {buttonText || "Close"}
            </Button>
          </>
        }
      />
    </SnackbarMessageStyles>
  );
};
