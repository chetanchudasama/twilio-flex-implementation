import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { AppState, namespace } from "../../../states";
import { HistoryDetailActions } from "../../../states/historyDetail";
import HistoryPanelWrapper from "./HistoryPanelWrapper";
import { StateToProps, DispatchToProps } from "./HistoryPanelWrapper.Props";

const mapStateToProps = (state: AppState): StateToProps => {
  return {
    applicationId: state[namespace].customer.customer?.applicationId ?? 0,
    historyPanelList: state[namespace].historyDetail.historyDetailList,
    handleUnPinHistoryDetail: () => {},
    isNoteAdded: false,
    handleSaveNoteDetail: () => {},
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchToProps => ({
  unPinHistoryDetail: bindActionCreators(
    HistoryDetailActions.unPinHistoryDetail,
    dispatch
  ),
  addNoteDetail: bindActionCreators(
    HistoryDetailActions.addNoteDetail,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryPanelWrapper);
