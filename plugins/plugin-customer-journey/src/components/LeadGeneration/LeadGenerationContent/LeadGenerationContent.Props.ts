import { ItemModel } from "@common/components";

import { QualifyDetailModel } from "../../../models/QualifyDetailModel";
import { FactFindDetailModel } from "../../../models/FactFindDetailModel";
import { TimeForPurchaseItemModel } from "../../../models/TimeForPurchaseModel";
import { NoteModel } from "../../../models/NoteModel";
import { TaskDecisionModel } from "../../../models/TaskDecisionModel";

export interface StateToProps {
  applicationId: number;
  customerName: string;
}

export interface DispatchToProps {}

export interface OwnProps {
  qualifyingDetail: QualifyDetailModel;
  updateQualifyingDetails: (
    key: keyof QualifyDetailModel,
    value: boolean | null
  ) => void;
  updateApplication: () => void;
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
  recentNotes: NoteModel[];
  updateCustomerPreferredName: (preferredName: string) => void;
  setCallbackDetail: (callbackDate: Date | null) => void;
  getRankedAgents: () => void;
  handleContactOutcomeClick: (
    taskDecision: TaskDecisionModel,
    callbackBooked?: Date
  ) => void;
}

export type LeadGenerationContentProps = StateToProps &
  DispatchToProps &
  OwnProps;
