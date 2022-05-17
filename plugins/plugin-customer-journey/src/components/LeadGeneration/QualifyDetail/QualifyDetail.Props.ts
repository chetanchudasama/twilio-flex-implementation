import { QualifyDetailModel } from "../../../models/QualifyDetailModel";

export interface StateToProps {
  monthlyIncome: number;
}

export interface DispatchToProps {}

export interface OwnProps {
  qualifyingDetail: QualifyDetailModel;
  updateQualifyingDetails: (
    key: keyof QualifyDetailModel,
    value: boolean | null
  ) => void;
}

export type QualifyDetailProps = StateToProps & DispatchToProps & OwnProps;
