import * as Flex from "@twilio/flex-ui";
import React from "react";
import CustomNotification from "../components/CustomNotification/CustomNotification";

export enum CustomNotificationType {
  SuccessNotification = "successNotification",
  InfoNotification = "infoNotification",
  WarningNotification = "warningNotification",
  ErrorNotification = "errorNotification",
}

/**
 *  Function to setup Custom notifications in flex plugin
 *
 */
export const setupCustomNotifications = (): void => {
  // Notifications
  Flex.Notifications.registerNotification({
    id: "successNotification",
    content: <CustomNotification />,
    type: Flex.NotificationType.success,
  });
  Flex.Notifications.registerNotification({
    id: "infoNotification",
    content: <CustomNotification />,
    type: Flex.NotificationType.information,
  });
  Flex.Notifications.registerNotification({
    id: "warningNotification",
    content: <CustomNotification />,
    type: Flex.NotificationType.warning,
    icon: "Error",
  });
  Flex.Notifications.registerNotification({
    id: "errorNotification",
    content: <CustomNotification />,
    type: Flex.NotificationType.error,
  });
};

/**
 * Function to show notification messages
 *
 * @param {CustomNotificationType} type - Custom notification type
 * @param {string} message - message to show
 *
 */
export const showMessage = (
  type: CustomNotificationType,
  message: string
): void => {
  Flex.Notifications.showNotification(type, { message });
};

/**
 * Function to show error message
 *
 * @param {string} message - error message
 * @param {string} [method] - name f method in which error occurred
 * @param {boolean} [isStaticMessage] - flag to show only message
 *
 */
export const showErrorMessage = (
  message: string,
  method?: string,
  isStaticMessage?: boolean
): void => {
  let errorMessage = "Error";
  if (process.env.NODE_ENV === "development" && method) {
    errorMessage = `${errorMessage} : ${method}`;
  }

  showMessage(
    CustomNotificationType.ErrorNotification,
    isStaticMessage ? message : `${errorMessage} : ${message}`
  );
};
