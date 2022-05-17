import { PreferredLenderModel } from "@common/components";
import { QualifyDetailModel } from "../../../../models/QualifyDetailModel";
import { ReasonForCarPurchaseItemModel } from "../../../../models/ReasonForCarPurchaseItemModel";
import { TimeForPurchaseItemModel } from "../../../../models/TimeForPurchaseModel";
import { WhereDidYouHearItemModel } from "../../../../models/WhereDidYouHearItemModel";

export interface StateToProps {
  reasonForPurchaseItems: ReasonForCarPurchaseItemModel[];
  timeForPurchaseItems: TimeForPurchaseItemModel[];
  whereDidYouHearItems: WhereDidYouHearItemModel[];
  preferredLender?: PreferredLenderModel;
  amountToFinance?: number;
  monthlyBudget?: number;
  term: number | null;
  monthlyIncome: number;
}

export interface DispatchToProps {
  setTerm: (value: number) => void;
}
export interface OwnProps {
  qualifyingDetail: QualifyDetailModel;
  updateQualifyingDetails: (
    key: keyof QualifyDetailModel,
    value: string | boolean | any | null
  ) => void;
  errors: Record<string, string[]>;
}

export type QualifyingContentProps = StateToProps & DispatchToProps & OwnProps;
