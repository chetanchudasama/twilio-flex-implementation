import { BaseWizardStepProps } from "@common/components";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withTaskContext } from "@twilio/flex-ui";

import { AppState, namespace } from "../../../../states";
import { Actions as StaticItemsActions } from "../../../../states/staticItems";
import { StateToProps, DispatchToProps } from "./QualifyingWrapper.Props";
import QualifyingWrapper from "./QualifyingWrapper";

const mapStateToProps = (state: AppState): StateToProps => {
  return {
    isStaticItemsFetched: state[namespace].staticItems.isFetched,
    applicationId: state[namespace].customer.customer?.applicationId ?? 0,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchToProps => ({
  setReasonForPurchaseItems: bindActionCreators(
    StaticItemsActions.setReasonForPurchaseItems,
    dispatch
  ),
  setTimeForPurchaseItems: bindActionCreators(
    StaticItemsActions.setTimeForPurchaseItems,
    dispatch
  ),
  setWhereDidYouHearItems: bindActionCreators(
    StaticItemsActions.setWhereDidYouHearItems,
    dispatch
  ),
  setStaticFetched: bindActionCreators(
    StaticItemsActions.setQualifyingStepStaticDataFetched,
    dispatch
  ),
});

export default withTaskContext<
  BaseWizardStepProps,
  React.ComponentType<BaseWizardStepProps>
>(connect(mapStateToProps, mapDispatchToProps)(QualifyingWrapper));
