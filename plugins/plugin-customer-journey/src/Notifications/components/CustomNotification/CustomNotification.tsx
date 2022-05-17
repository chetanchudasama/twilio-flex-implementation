import React from "react";
import { CustomNotificationStyles } from "./CustomNotification.Styles";

interface OwnProps {
  notificationContext?: {
    message: React.ReactNode;
  };
}

const CustomNotification: React.FC<OwnProps> = ({ notificationContext }) => (
  <CustomNotificationStyles>
    {notificationContext?.message}
  </CustomNotificationStyles>
);

export default CustomNotification;
