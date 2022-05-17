import { HistoryPanelDetailModel } from "../../../models/HistoryPanelDetailModel";
import { HistoryPanelProps } from "../HistoryPanel.Props";

export interface StateToProps extends HistoryPanelProps {
  applicationId: number;
  historyPanelList: HistoryPanelDetailModel[];
}

export interface DispatchToProps {
  unPinHistoryDetail: (index: number) => void;
  addNoteDetail: (content: string, isImportant: boolean) => void;
}
