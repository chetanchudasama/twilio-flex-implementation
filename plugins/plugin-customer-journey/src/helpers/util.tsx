import { CustomCRM } from "@common/components";
import React from "react";
import * as Flex from "@twilio/flex-ui";
import CustomCRMViewContent from "../components/CustomCRMViewContent/CustomCRMViewContent.Container";
import { setupCustomNotifications } from "../Notifications";

/**
 * Function to manage Plugin UI Customization
 *
 * @param {typeof Flex} flex - flex instance
 * @param {Flex.Manager} manager - flex manager instance
 */
export const customizePlugin = (
  flex: typeof Flex,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  manager: Flex.Manager
): void => {
  const devMode = process.env.REACT_APP_DEVELOPMENT_MODE || false;
  if (devMode) {
    // eslint-disable-next-line no-param-reassign
    flex.AgentDesktopView.defaultProps.splitterOptions = {
      minimumSecondPanelSize: "75%",
    };

    // eslint-disable-next-line no-param-reassign
    flex.AgentDesktopView.Panel1.defaultProps.splitterOrientation =
      Flex.SplitterOrientation.vertical;
  }

  // remove CRMContainer
  flex.AgentDesktopView.Panel2.Content.remove("container");
  // add Custom CRMContainer - with order of 999 (in front of Phoenix)
  flex.AgentDesktopView.Panel2.Content.add(
    <CustomCRM
      key="CustomCRMContainer"
      component={<CustomCRMViewContent key="CustomCRMViewContent" />}
    />,
    {
      sortOrder: 999,
    }
  );

  // setup custom notifications in flex plugins
  setupCustomNotifications();
};
