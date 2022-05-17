import { connect } from "react-redux";
import { Dispatch } from "redux";
import { CustomerDetailModel } from "@common/components";
import { LenderDetail } from "./LenderDetail";
import { AppState, namespace } from "../../../states";
import { StateToProps, DispatchToProps } from "./LenderDetail.Props";

const mapStateToProps = (state: AppState): StateToProps => {
  const customer: CustomerDetailModel = Object.assign(
    new CustomerDetailModel(),
    state[namespace].customer.customer
  );

  return {
    lenderName: customer.preferredLender?.lenderName ?? "",
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchToProps => ({});

export default connect(mapStateToProps, mapDispatchToProps)(LenderDetail);
