import { withTaskContext } from "@twilio/flex-ui";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { AppState, namespace } from "../../states";
import { Actions } from "../../states/customer";
import { HistoryDetailActions } from "../../states/historyDetail";
import {
  StateToProps,
  DispatchToProps,
  CustomCRMViewContentProps,
} from "./CustomCRMViewContent.Props";
import CustomCRMViewContent from "./CustomCRMViewContent";

const mapStateToProps = (state: AppState | any): StateToProps => {
  return {
    selectedAppId: state[namespace].historyDetail.selectedAppId,
    useZingWorkscreen: state["crm"]?.crmState?.useZingWorkscreen,
    currentAppId: state["crm"]?.crmState?.currentCustomer?.applicationId,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchToProps => ({
  setCustomer: bindActionCreators(Actions.setCustomer, dispatch),
  setHistoryDetailList: bindActionCreators(
    HistoryDetailActions.setHistoryDetailList,
    dispatch
  ),
  setSelectedAppId: bindActionCreators(
    HistoryDetailActions.setSelectedAppId,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTaskContext<
    CustomCRMViewContentProps,
    React.ComponentType<CustomCRMViewContentProps>
  >(CustomCRMViewContent)
);
