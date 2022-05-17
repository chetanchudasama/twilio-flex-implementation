import { ItemModel } from "@common/components";
import { FactFindDetailModel } from "../../../models/FactFindDetailModel";
import { VehicleSearchDropdownData } from "../../../models/VehicleSearchDropdownData";
import { TimeForPurchaseItemModel } from "../../../models/TimeForPurchaseModel";

export interface StateToProps {
  vehicleSearchDropdownData: VehicleSearchDropdownData;
  timeForPurchaseItems: TimeForPurchaseItemModel[];
}

export interface DispatchToProps {}

export interface OwnProps {
  factFindDetail: FactFindDetailModel;
  updateFactFindDetail: (
    key: string,
    value:
      | string
      | number
      | boolean
      | TimeForPurchaseItemModel
      | ItemModel
      | null
  ) => void;
}

export type FactFindProps = StateToProps & DispatchToProps & OwnProps;
