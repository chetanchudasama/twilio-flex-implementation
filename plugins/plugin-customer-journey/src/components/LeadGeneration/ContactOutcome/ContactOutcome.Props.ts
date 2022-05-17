import { TaskDecisionModel } from "../../../models/TaskDecisionModel";

export interface StateToProps {
  callbackBooked?: Date;
  taskDecisions: TaskDecisionModel[];
}

export interface DispatchToProps {}

export interface OwnProps {
  setCallbackDetail: (callbackDate: Date | null) => void;
  handleContactOutcomeClick: (
    taskDecision: TaskDecisionModel,
    callbackBooked?: Date
  ) => void;
}

export type ContactOutcomeProps = StateToProps & DispatchToProps & OwnProps;
