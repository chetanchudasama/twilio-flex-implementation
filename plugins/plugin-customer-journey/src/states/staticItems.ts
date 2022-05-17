import { Action } from "./actionTypes";
import { ReasonForCarPurchaseItemModel } from "../models/ReasonForCarPurchaseItemModel";
import { TimeForPurchaseItemModel } from "../models/TimeForPurchaseModel";
import { WhereDidYouHearItemModel } from "../models/WhereDidYouHearItemModel";
import { VehicleSearchDropdownData } from "../models/VehicleSearchDropdownData";
import { VehicleExtraModel } from "../models/VehicleExtraModel";
import { TaskDecisionModel } from "../models/TaskDecisionModel";

const SET_REASON_FOR_PURCHASE_ITEMS = "SET_REASON_FOR_PURCHASE_ITEMS";
const SET_TIME_FOR_PURCHASE_ITEMS = "SET_TIME_FOR_PURCHASE_ITEMS";
const SET_WHERE_DID_YOU_HEAR_ITEMS = "SET_WHERE_DID_YOU_HEAR_ITEMS";
const SET_VEHICLE_SEARCH_DROPDOWN_DATA = "SET_VEHICLE_SEARCH_DROPDOWN_DATA";
const SET_QUALIFYING_STATIC_DATA_FETCHED = "SET_QUALIFYING_STATIC_DATA_FETCHED";
const SET_VEHICLE_STATIC_DATA_FETCHED = "SET_VEHICLE_STATIC_DATA_FETCHED";
const SET_VEHICLE_EXTRA_DROPDOWN_DATA = "SET_VEHICLE_EXTRA_DROPDOWN_DATA";
const SET_TASK_DECISIONS = "SET_TASK_DECISIONS";

export interface StaticItemsState {
  reasonForPurchaseItems: ReasonForCarPurchaseItemModel[];
  timeForPurchaseItems: TimeForPurchaseItemModel[];
  whereDidYouHearItems: WhereDidYouHearItemModel[];
  vehicleSearchDropdownData: VehicleSearchDropdownData;
  isFetched: boolean;
  isVehicleStaticDataFetched: boolean;
  vehicleExtraItemList: VehicleExtraModel[];
  taskDecisions: TaskDecisionModel[];
}

const initialState: StaticItemsState = {
  reasonForPurchaseItems: [],
  timeForPurchaseItems: [],
  whereDidYouHearItems: [],
  vehicleSearchDropdownData: new VehicleSearchDropdownData(),
  isFetched: false,
  isVehicleStaticDataFetched: false,
  vehicleExtraItemList: [],
  taskDecisions: [],
};

export class Actions {
  public static setReasonForPurchaseItems = (
    items: ReasonForCarPurchaseItemModel[]
  ): Action => ({
    type: SET_REASON_FOR_PURCHASE_ITEMS,
    payload: { items },
  });

  public static setTimeForPurchaseItems = (
    items: TimeForPurchaseItemModel[]
  ): Action => ({
    type: SET_TIME_FOR_PURCHASE_ITEMS,
    payload: { items },
  });

  public static setWhereDidYouHearItems = (
    items: WhereDidYouHearItemModel[]
  ): Action => ({
    type: SET_WHERE_DID_YOU_HEAR_ITEMS,
    payload: { items },
  });

  public static setVehicleSearchDropdownData = (
    items: VehicleSearchDropdownData
  ): Action => ({
    type: SET_VEHICLE_SEARCH_DROPDOWN_DATA,
    payload: { items },
  });

  public static setQualifyingStepStaticDataFetched = (
    flag: boolean
  ): Action => ({
    type: SET_QUALIFYING_STATIC_DATA_FETCHED,
    payload: { flag },
  });

  public static setVehicleStaticDataFetched = (flag: boolean): Action => ({
    type: SET_VEHICLE_STATIC_DATA_FETCHED,
    payload: { flag },
  });

  public static setVehicleExtraItemList = (
    items: VehicleExtraModel[]
  ): Action => ({
    type: SET_VEHICLE_EXTRA_DROPDOWN_DATA,
    payload: { items },
  });

  public static setTaskDecisions = (items: TaskDecisionModel[]): Action => ({
    type: SET_TASK_DECISIONS,
    payload: { items },
  });
}

export function reduce(state: StaticItemsState = initialState, action: Action) {
  switch (action.type) {
    case SET_REASON_FOR_PURCHASE_ITEMS:
      return {
        ...state,
        reasonForPurchaseItems: action.payload?.items || [],
      };
    case SET_TIME_FOR_PURCHASE_ITEMS:
      return {
        ...state,
        timeForPurchaseItems: action.payload?.items || [],
      };
    case SET_WHERE_DID_YOU_HEAR_ITEMS:
      return {
        ...state,
        whereDidYouHearItems: action.payload?.items || [],
      };
    case SET_VEHICLE_SEARCH_DROPDOWN_DATA:
      return {
        ...state,
        vehicleSearchDropdownData: action.payload?.items,
      };
    case SET_QUALIFYING_STATIC_DATA_FETCHED:
      return {
        ...state,
        isFetched: action.payload?.flag || false,
      };
    case SET_VEHICLE_STATIC_DATA_FETCHED:
      return {
        ...state,
        isVehicleStaticDataFetched: action.payload?.flag || false,
      };
    case SET_VEHICLE_EXTRA_DROPDOWN_DATA:
      return {
        ...state,
        vehicleExtraItemList: action.payload?.items || [],
      };
    case SET_TASK_DECISIONS:
      return {
        ...state,
        taskDecisions: action.payload?.items || [],
      };
    default:
      return state;
  }
}
