import { ReasonForCarPurchaseItemModel } from "../../../../models/ReasonForCarPurchaseItemModel";
import { TimeForPurchaseItemModel } from "../../../../models/TimeForPurchaseModel";
import { WhereDidYouHearItemModel } from "../../../../models/WhereDidYouHearItemModel";

export interface StateToProps {
  isStaticItemsFetched: boolean;
  applicationId: number;
}

export interface DispatchToProps {
  setReasonForPurchaseItems: (items: ReasonForCarPurchaseItemModel[]) => void;
  setTimeForPurchaseItems: (items: TimeForPurchaseItemModel[]) => void;
  setWhereDidYouHearItems: (items: WhereDidYouHearItemModel[]) => void;
  setStaticFetched: (flag: boolean) => void;
}
