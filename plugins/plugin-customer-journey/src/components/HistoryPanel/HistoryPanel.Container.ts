import { connect } from "react-redux";
import { Dispatch } from "redux";
import { AppState, namespace } from "../../states";
import HistoryPanel from "./HistoryPanel";
import { DispatchToProps, StateToProps } from "./HistoryPanel.Props";

const mapStateToProps = (state: AppState): StateToProps => {
  return {
    historyPanelList: state[namespace].historyDetail.historyDetailList,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchToProps => ({});

export default connect(mapStateToProps, mapDispatchToProps)(HistoryPanel);
