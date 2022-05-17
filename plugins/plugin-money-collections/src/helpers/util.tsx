import * as Flex from "@twilio/flex-ui";
import { setupCustomNotifications } from "../Notifications";

/**
 * Function to manage Plugin UI Customization
 *
 * @param {typeof Flex} _flex - flex instance
 * @param {Flex.Manager} manager - flex manager instance
 */
export const customizePlugin = (
  flex: typeof Flex,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  manager: Flex.Manager
): void => {
  // eslint-disable-next-line no-param-reassign
  flex.AgentDesktopView.Panel1.defaultProps.splitterOrientation =
    Flex.SplitterOrientation.vertical;

  // setup custom notifications in flex plugins
  setupCustomNotifications();
};
