import { VehicleVRMSearchRequestModel } from "../../../../models/VehicleVRMSearchRequestModel";
import { VehicleSearchDropdownData } from "../../../../models/VehicleSearchDropdownData";
import { VehicleSummaryDetailModel } from "../../../../models/VehicleSummaryDetailModel";
import { VehicleSearchRequestModel } from "../../../../models/VehicleSearchRequestModel";
import { VehicleDetailModel } from "../../../../models/VehicleDetailModel";

export interface StateToProps {
  applicationId: number;
  filters: VehicleSearchRequestModel;
  postCode: string;
  isVehicleStaticDataFetched: boolean;
  hasSavedQuotes: boolean;
  savedVehicleCount: number;
  vrmFilters: VehicleVRMSearchRequestModel;
}

export interface DispatchToProps {
  setVehicleStaticDataFetched: (flag: boolean) => void;
  setVehicleSearchDropdownData: (items: VehicleSearchDropdownData) => void;
  setSavedVehicles: (vehicles: VehicleDetailModel[]) => void;
  setSavedQuotes: (quotes: any[]) => void;
  setVehicles: (vehicles: VehicleSummaryDetailModel[]) => void;
  setTotalVehicles: (count: number) => void;
}
