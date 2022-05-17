import { VehicleDetailModel } from "../../../../models/VehicleDetailModel";

export interface StateToProps {
  applicationId: number;
  savedVehicles: VehicleDetailModel[];
  mobileNumber: string;
  postCode: string;
}

export interface DispatchToProps {
  setSavedVehicles: (vehicles: VehicleDetailModel[]) => void;
}
