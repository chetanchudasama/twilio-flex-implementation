import { Action } from "./actionTypes";
import { VehicleSortingOptions } from "../common/enum";
import { VehicleSummaryDetailModel } from "../models/VehicleSummaryDetailModel";
import { VehicleSearchRequestModel } from "../models/VehicleSearchRequestModel";
import { VehicleDetailModel } from "../models/VehicleDetailModel";
import { VehicleVRMSearchRequestModel } from "../models/VehicleVRMSearchRequestModel";

const SET_VEHICLES = "SET_VEHICLES";
const SET_SAVED_VEHICLES = "SET_SAVED_VEHICLES";
const SET_FILTERS = "SET_FILTERS";
const SET_TOTAL = "SET_TOTAL";
const SORT_SAVED_VEHICLES = "SORT_SAVED_VEHICLES";
const SET_SAVED_VEHICLES_SORT = "SET_SAVED_VEHICLES_SORT";
const SET_VRM_FILTERS = "SET_VRM_FILTERS";

export interface VehicleState {
  vehicles: VehicleSummaryDetailModel[];
  savedVehicles: VehicleDetailModel[];
  filters: VehicleSearchRequestModel;
  totalVehicles: number;
  savedVehicleSort: VehicleSortingOptions;
  vrmFilters: VehicleVRMSearchRequestModel;
}

const initialState: VehicleState = {
  vehicles: [],
  savedVehicles: [],
  filters: new VehicleSearchRequestModel(),
  totalVehicles: 0,
  savedVehicleSort: VehicleSortingOptions.PriceDescending,
  vrmFilters: new VehicleVRMSearchRequestModel(),
};

export class Actions {
  public static setVehicles = (
    vehicles: VehicleSummaryDetailModel[]
  ): Action => ({
    type: SET_VEHICLES,
    payload: { vehicles },
  });

  public static setSavedVehicles = (
    vehicles: VehicleDetailModel[]
  ): Action => ({
    type: SET_SAVED_VEHICLES,
    payload: { vehicles },
  });

  public static setFilters = (filters: VehicleSearchRequestModel): Action => ({
    type: SET_FILTERS,
    payload: { filters },
  });

  public static setTotalVehicles = (count: number): Action => ({
    type: SET_TOTAL,
    payload: { count },
  });

  public static sortSavedCars = (): Action => ({
    type: SORT_SAVED_VEHICLES,
    payload: {},
  });

  public static setSavedCarsSort = (field: VehicleSortingOptions): Action => ({
    type: SET_SAVED_VEHICLES_SORT,
    payload: { field },
  });

  public static setVRMFilters = (
    vrmFilters: VehicleVRMSearchRequestModel
  ): Action => ({
    type: SET_VRM_FILTERS,
    payload: { vrmFilters },
  });
}

const sortVehicles = (
  vehicles: VehicleDetailModel[],
  type: VehicleSortingOptions
) => {
  switch (type) {
    case VehicleSortingOptions.AgeAscending:
      return vehicles.sort((first, second) => {
        const aDate = new Date(first.date).getTime();
        const bDate = new Date(second.date).getTime();
        return bDate - aDate; // sorts by newest to oldest
      });
    case VehicleSortingOptions.PriceDescending:
      return vehicles.sort((a, b) => -1 * (a.price - b.price)); // will invert the sort, making it largest to smallest
    case VehicleSortingOptions.PriceAscending:
      return vehicles.sort((a, b) => a.price - b.price);
    default:
      return vehicles;
  }
};

export function reduce(
  state: VehicleState = initialState,
  action: Action
): VehicleState {
  switch (action.type) {
    case SET_VEHICLES: {
      return {
        ...state,
        vehicles: action.payload?.vehicles || [],
      };
    }
    case SET_SAVED_VEHICLES: {
      return {
        ...state,
        savedVehicles: sortVehicles(
          action.payload?.vehicles || [],
          state.savedVehicleSort
        ).map((v) => Object.assign(new VehicleDetailModel(), v)),
      };
    }
    case SET_FILTERS: {
      return {
        ...state,
        filters: action.payload?.filters || [],
      };
    }
    case SET_TOTAL: {
      return {
        ...state,
        totalVehicles: action.payload?.count || 0,
      };
    }
    case SORT_SAVED_VEHICLES: {
      return {
        ...state,
        savedVehicles: sortVehicles(
          state.savedVehicles,
          state.savedVehicleSort
        ).map((v) => Object.assign(new VehicleDetailModel(), v)),
      };
    }
    case SET_SAVED_VEHICLES_SORT: {
      return {
        ...state,
        savedVehicleSort:
          action.payload?.field || VehicleSortingOptions.PriceDescending,
        savedVehicles: sortVehicles(
          state.savedVehicles,
          action.payload?.field || VehicleSortingOptions.PriceDescending
        ).map((v) => Object.assign(new VehicleDetailModel(), v)),
      };
    }
    case SET_VRM_FILTERS: {
      return {
        ...state,
        vrmFilters: action.payload.vrmFilters || [],
      };
    }
    default:
      return state;
  }
}
