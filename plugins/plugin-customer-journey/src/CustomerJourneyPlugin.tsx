import * as Flex from "@twilio/flex-ui";
import { FlexPlugin, loadCSS } from "flex-plugin";
import { get } from "lodash";
import { customizePlugin } from "./helpers/util";
import reducers, { namespace } from "./states";

const PLUGIN_NAME = "CustomerJourneyPlugin";

export class CustomerJourneyPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof Flex }
   * @param manager { Flex.Manager }
   */
  init(flex: typeof Flex, manager: Flex.Manager): void {
    const allowedDepartments: string[] = ["DV"];
    const allowedAgentIds: string[] = ["12268"];

    const agentId: string = get(
      manager.store.getState().flex.worker.attributes,
      "agentId",
      null
    );

    const agentDepartmentId: string = get(
      manager.store.getState().flex.worker.attributes,
      "department_id",
      null
    );

    // if the development mode flag is set to true, always load the plugin
    // the flag should be set to false for production environments
    const devMode = process.env.REACT_APP_DEVELOPMENT_MODE || false;

    if (
      devMode ||
      allowedAgentIds.includes(agentId.toString()) ||
      allowedDepartments.includes(agentDepartmentId.toString())
    ) {
      loadCSS("https://fonts.googleapis.com/css?family=Roboto:300,400,500");
      loadCSS("https://fonts.googleapis.com/icon?family=Material+Icons");

      this.registerReducers(manager);

      customizePlugin(flex, manager);
    }
  }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  // eslint-disable-next-line class-methods-use-this
  private registerReducers(manager: Flex.Manager) {
    if (!manager.store.addReducer) {
      // tslint: disable-next-line
      console.error(
        `You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${Flex.VERSION}`
      );
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}
