import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { withTaskContext } from "@twilio/flex-ui";

import { AppState, namespace } from "../../../states";
import { Actions as StaticItemsActions } from "../../../states/staticItems";
import { LeadGenerationWrapper } from "./LeadGenerationWrapper";
import {
  StateToProps,
  DispatchToProps,
  LeadGenerationWrapperProps,
} from "./LeadGenerationWrapper.Props";
import { Actions } from "../../../states/customer";

const mapStateToProps = (state: AppState): StateToProps => {
  return {
    applicationId: state[namespace].customer.customer?.applicationId ?? 0,
    isStaticItemsFetched: state[namespace].staticItems.isFetched,
    isVehicleStaticDataFetched:
      state[namespace].staticItems.isVehicleStaticDataFetched,
    vehicleSearchDropdownData:
      state[namespace].staticItems.vehicleSearchDropdownData,
    taskDecisions: state[namespace].staticItems.taskDecisions,
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
  setVehicleStaticDataFetched: bindActionCreators(
    StaticItemsActions.setVehicleStaticDataFetched,
    dispatch
  ),
  setVehicleSearchDropdownData: bindActionCreators(
    StaticItemsActions.setVehicleSearchDropdownData,
    dispatch
  ),
  setCustomerDetails: bindActionCreators(Actions.setCustomerDetails, dispatch),
  setTaskDecisions: bindActionCreators(
    StaticItemsActions.setTaskDecisions,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTaskContext<
    LeadGenerationWrapperProps,
    React.ComponentType<LeadGenerationWrapperProps>
  >(LeadGenerationWrapper)
);
