import { VehicleSearchDropdownData } from "../../../../models/VehicleSearchDropdownData";
import { VehicleSearchRequestModel } from "../../../../models/VehicleSearchRequestModel";
import { VehicleVRMSearchRequestModel } from "../../../../models/VehicleVRMSearchRequestModel";

export interface StateToProps {
  vehicleSearchDropdownData: VehicleSearchDropdownData;
  termId: number | null;
  maxLendAmount: number;
}

export interface DispatchToProps {
  setFilters: (filters: VehicleSearchRequestModel) => void;
  setVRMFilters: (dealer: VehicleVRMSearchRequestModel) => void;
}
