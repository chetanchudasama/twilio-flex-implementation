import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";
import styled from "react-emotion";
import { IconButton, Icon } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { ResponsiveDialogStyles } from "./ResponsiveDialog.Styles";
import { white, secondary, deleteButtonColor } from "../shared/AppTheme";

export interface ResponsiveDialogProps {
  open: boolean;
  title?: string;
  okText?: string;
  cancelText?: string;
  deleteText?: string;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
  showActionButtons?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isConfirmationDialog?: boolean;
  disableSaveButton?: boolean;
  titleCloseIcon?: boolean;
  showDeleteButton?: boolean;
  onDelete?: () => void;
}

export const ResponsiveDialog: React.FC<ResponsiveDialogProps> = ({
  maxWidth,
  open,
  onCancel,
  onConfirm,
  title,
  titleCloseIcon,
  isConfirmationDialog,
  showActionButtons,
  cancelText,
  okText,
  deleteText,
  children,
  showDeleteButton,
  disableSaveButton,
  onDelete,
}) => {
  const StyledSaveButton = styled(Button)({
    backgroundColor: `${secondary}!important`,
    color: `${white}!important`,
  });

  const StyledCancelButton = styled(Button)({
    backgroundColor: `${white}!important`,
    color: `${secondary}!important`,
  });

  const StyledDeleteButton = styled(Button)({
    backgroundColor: `${white}!important`,
    color: `${deleteButtonColor}!important`,
  });

  return (
    <ResponsiveDialogStyles
      fullWidth
      maxWidth={maxWidth || "sm"}
      open={open}
      onClose={onCancel}
      aria-labelledby="max-width-dialog-title"
      disableBackdropClick
      disableEscapeKeyDown
      scroll="paper"
      disableEnforceFocus
    >
      {title || titleCloseIcon ? (
        <DialogTitle
          className={!titleCloseIcon ? "dialog-title" : ""}
          id="max-width-dialog-title"
        >
          {title || ""}
          {titleCloseIcon ? (
            <IconButton
              aria-label="Close"
              className="close-icon"
              onClick={onCancel}
            >
              <CloseIcon />
            </IconButton>
          ) : null}
        </DialogTitle>
      ) : null}
      <DialogContent
        className={isConfirmationDialog ? "confirmation-message" : ""}
      >
        {children}
      </DialogContent>
      {showActionButtons && (
        <DialogActions>
          {showDeleteButton && (
            <StyledDeleteButton
              variant="text"
              onClick={onDelete}
              type="button"
              className="delete-btn"
            >
              <Icon className="delete-btn-icon">delete</Icon>
              {deleteText || "Delete"}
            </StyledDeleteButton>
          )}
          <StyledCancelButton variant="text" onClick={onCancel} type="button">
            {cancelText || "Close"}
          </StyledCancelButton>
          <StyledSaveButton
            variant="contained"
            type="button"
            onClick={onConfirm}
            className={disableSaveButton ? "disabled-btn" : ""}
          >
            {okText || "Save"}
          </StyledSaveButton>
        </DialogActions>
      )}
    </ResponsiveDialogStyles>
  );
};
