import * as Flex from "@twilio/flex-ui";
import { FlexPlugin, loadCSS } from "flex-plugin";
import { get } from "lodash";
import { customizePlugin } from "./helpers/util";
import reducers, { namespace } from "./states";

const PLUGIN_NAME = "MoneyCollectionsPlugin";

export class MoneyCollectionsPlugin extends FlexPlugin {
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
    loadCSS("https://fonts.googleapis.com/css?family=Roboto:300,400,500");
    loadCSS("https://fonts.googleapis.com/icon?family=Material+Icons");

    this.registerReducers(manager);

    customizePlugin(flex, manager);
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
