import { CustomerDetailModel } from "@common/components";
import { TaskDecisionModel } from "../../../models/TaskDecisionModel";
import { VehicleSearchDropdownData } from "../../../models/VehicleSearchDropdownData";
import { ReasonForCarPurchaseItemModel } from "../../../models/ReasonForCarPurchaseItemModel";
import { TimeForPurchaseItemModel } from "../../../models/TimeForPurchaseModel";
import { WhereDidYouHearItemModel } from "../../../models/WhereDidYouHearItemModel";

export interface StateToProps {
  applicationId: number;
  isStaticItemsFetched: boolean;
  isVehicleStaticDataFetched: boolean;
  vehicleSearchDropdownData: VehicleSearchDropdownData;
  taskDecisions: TaskDecisionModel[];
}

export interface DispatchToProps {
  setReasonForPurchaseItems: (items: ReasonForCarPurchaseItemModel[]) => void;
  setTimeForPurchaseItems: (items: TimeForPurchaseItemModel[]) => void;
  setWhereDidYouHearItems: (items: WhereDidYouHearItemModel[]) => void;
  setStaticFetched: (flag: boolean) => void;
  setVehicleStaticDataFetched: (flag: boolean) => void;
  setVehicleSearchDropdownData: (items: VehicleSearchDropdownData) => void;
  setCustomerDetails: (
    key: keyof CustomerDetailModel,
    value: Date | string | number | null
  ) => void;
  setTaskDecisions: (items: TaskDecisionModel[]) => void;
}

export type LeadGenerationWrapperProps = StateToProps & DispatchToProps;
