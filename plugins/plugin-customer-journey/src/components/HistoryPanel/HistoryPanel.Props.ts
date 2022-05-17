import { AddNoteDetailModel } from "../../models/AddNoteDetailModel";
import { HistoryPanelDetailModel } from "../../models/HistoryPanelDetailModel";

export interface StateToProps {
  historyPanelList: HistoryPanelDetailModel[];
}

export interface DispatchToProps {}

export interface HistoryPanelProps {
  isNoteAdded: boolean;
  handleUnPinHistoryDetail: (messageId: string) => void;
  handleSaveNoteDetail: (addNoteModel: AddNoteDetailModel) => void;
}
