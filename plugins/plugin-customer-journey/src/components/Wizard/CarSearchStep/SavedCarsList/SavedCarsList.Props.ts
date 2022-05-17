import { VehicleDetailModel } from "../../../../models/VehicleDetailModel";
import { VehicleSortingOptions } from "../../../../common/enum";

export interface StateToProps {
  savedVehicles: VehicleDetailModel[];
  totalSavedVehicles: number;
  sort: VehicleSortingOptions;
}

export interface DispatchToProps {
  setSort: (field: VehicleSortingOptions) => void;
}
