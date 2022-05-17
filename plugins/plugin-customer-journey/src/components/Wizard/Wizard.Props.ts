import { CustomerDetailModel } from "@common/components";
import { ReasonForCarPurchaseItemModel } from "../../models/ReasonForCarPurchaseItemModel";
import { TimeForPurchaseItemModel } from "../../models/TimeForPurchaseModel";
import { WhereDidYouHearItemModel } from "../../models/WhereDidYouHearItemModel";

export interface StateToProps {
  customer?: CustomerDetailModel;
}

export interface DispatchToProps {
  setCustomerDetails: (key: keyof CustomerDetailModel, value: any) => void;
  setReasonForPurchaseItems: (items: ReasonForCarPurchaseItemModel[]) => void;
  setTimeForPurchaseItems: (items: TimeForPurchaseItemModel[]) => void;
  setWhereDidYouHearItems: (items: WhereDidYouHearItemModel[]) => void;
}
