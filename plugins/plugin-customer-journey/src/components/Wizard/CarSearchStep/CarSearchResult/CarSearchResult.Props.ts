import { VehicleSummaryDetailModel } from "../../../../models/VehicleSummaryDetailModel";
import { VehicleSearchRequestModel } from "../../../../models/VehicleSearchRequestModel";
import { VehicleVRMSearchRequestModel } from "../../../../models/VehicleVRMSearchRequestModel";

export interface StateToProps {
  vehicles: VehicleSummaryDetailModel[];
  filters: VehicleSearchRequestModel;
  totalVehicles: number;
  vrmFilters: VehicleVRMSearchRequestModel;
}

export interface DispatchToProps {
  setFilters: (filters: VehicleSearchRequestModel) => void;
}
