import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import { AppState, namespace } from "../../../states";
import { Actions } from "../../../states/customer";
import { EmploymentHistory } from "./EmploymentHistory";
import { DispatchToProps, StateToProps } from "./EmploymentHistory.Props";

const mapStateToProps = (state: AppState): StateToProps => {
  return {
    applicationId: state[namespace].customer.customer?.applicationId ?? 0,
    currentEmployment:
      state[namespace].customer.customer?.employmentHistory?.find(
        (e) => e.isCurrentEmployment
      ) ?? null,
    previousEmployments:
      state[namespace].customer.customer?.employmentHistory?.filter(
        (e) => !e.isCurrentEmployment
      ) ?? [],
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchToProps => ({
  setCustomerDetails: bindActionCreators(Actions.setCustomerDetails, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmploymentHistory);
