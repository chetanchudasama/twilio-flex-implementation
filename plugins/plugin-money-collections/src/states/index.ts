import { AppState as FlexAppState } from "@twilio/flex-ui";
import { combineReducers } from "redux";

// Register your redux store under a unique namespace
export const namespace = "money-collections";

// Register all component states under the namespace
export interface AppState {
  flex: FlexAppState;
  [namespace]: {
    // States states
  };
}

// Combine the reducers
export default combineReducers({});
