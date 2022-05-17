import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";

import { AppState, namespace } from "../../states";
import { Actions as CustomerActions } from "../../states/customer";
import { Actions as StaticItemsActions } from "../../states/staticItems";
import { StateToProps, DispatchToProps } from "./Wizard.Props";
import Wizard from "./Wizard";

const mapStateToProps = (state: AppState): StateToProps => ({
  customer: state[namespace].customer.customer,
});

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchToProps => ({
  setCustomerDetails: bindActionCreators(
    CustomerActions.setCustomerDetails,
    dispatch
  ),
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Wizard);
