import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { BankDetailModel } from "@common/components";
import { Actions } from "../../../states/customer";
import { AppState, namespace } from "../../../states";
import { DispatchToProps, StateToProps } from "./BankDetail.Props";
import { BankDetail } from "./BankDetail";

const mapStateToProps = (state: AppState): StateToProps => {
  return {
    applicationId: state[namespace].customer.customer?.applicationId ?? 0,
    bankDetail:
      state[namespace].customer.customer?.bankDetails ?? new BankDetailModel(),
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchToProps => ({
  setCustomerDetails: bindActionCreators(Actions.setCustomerDetails, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(BankDetail);
