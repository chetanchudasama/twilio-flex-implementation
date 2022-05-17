import React from "react";
import { ResponsiveDialog } from "@common/components";
import * as Flex from "@twilio/flex-ui";

export interface QuoteSavedDialogProps {
  open: boolean;
  handleQuoteSavedDialogClose: () => void;
}

const QuoteSavedDialog: React.FC<QuoteSavedDialogProps> = ({
  open,
  handleQuoteSavedDialogClose,
}) => {
  const handleBackToSearchCar = () => {
    handleQuoteSavedDialogClose();
    Flex.Actions.invokeAction("MoveToCarSearchStep", { tabIndex: 0 });
  };

  const handleViewAllQuotes = () => {
    handleQuoteSavedDialogClose();
    Flex.Actions.invokeAction("MoveToQuoteStep", {});
  };

  return (
    <ResponsiveDialog
      open={open}
      okText="View All Quotes"
      cancelText="Back To Car Search"
      isConfirmationDialog
      showActionButtons
      title="Quote saved!"
      onCancel={handleBackToSearchCar}
      onConfirm={handleViewAllQuotes}
    >
      This quote can be found on the quotes screen.
    </ResponsiveDialog>
  );
};

export default QuoteSavedDialog;
