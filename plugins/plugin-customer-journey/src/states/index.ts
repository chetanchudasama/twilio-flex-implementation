import { AppState as FlexAppState } from "@twilio/flex-ui";
import { combineReducers } from "redux";
import { CustomerState, reduce as CustomerReducer } from "./customer";
import {
  HistoryDetailState,
  reduce as HistoryDetailReducer,
} from "./historyDetail";

import { StaticItemsState, reduce as StaticItemsReducer } from "./staticItems";
import { VehicleState, reduce as VehicleReducer } from "./vehicle";
import { QuoteState, reduce as QuoteReducer } from "./quote";
import { CrmState } from "./crm";

// Register your redux store under a unique namespace
export const namespace = "customer-journey";

// Reference namespace from other plugin
export const namespaceCrm = "crm";

// Register all component states under the namespace
export interface AppState {
  flex: FlexAppState;
  [namespace]: {
    customer: CustomerState;
    historyDetail: HistoryDetailState;
    staticItems: StaticItemsState;
    vehicle: VehicleState;
    quote: QuoteState;
  };
  [namespaceCrm]: {
    crmState: CrmState;
  };
}

// Combine the reducers
// eslint-disable-next-line import/no-default-export
export default combineReducers({
  customer: CustomerReducer,
  historyDetail: HistoryDetailReducer,
  staticItems: StaticItemsReducer,
  vehicle: VehicleReducer,
  quote: QuoteReducer,
});
