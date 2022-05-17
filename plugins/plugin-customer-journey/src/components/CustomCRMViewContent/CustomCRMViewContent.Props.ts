import { CustomerDetailModel } from "@common/components";
import { HistoryPanelDetailModel } from "../../models/HistoryPanelDetailModel";

export interface StateToProps {
  selectedAppId: number;
  useZingWorkscreen: boolean;
  currentAppId: number | null;
}

export interface DispatchToProps {
  setCustomer: (customer: CustomerDetailModel) => void;
  setHistoryDetailList: (historyPanelList: HistoryPanelDetailModel[]) => void;
  setSelectedAppId: (id: number) => void;
}

export type CustomCRMViewContentProps = StateToProps & DispatchToProps;
