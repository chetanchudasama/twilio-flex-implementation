import { connect } from "react-redux";
import { Dispatch } from "redux";
import { CustomerDetailModel } from "@common/components";

import { AppState, namespace } from "../../../states";
import { CustomerName } from "./CustomerName";
import { StateToProps, DispatchToProps } from "./CustomerName.Props";

const mapStateToProps = (state: AppState): StateToProps => {
  const customer = Object.assign(
    new CustomerDetailModel(),
    state[namespace].customer.customer
  );
  return {
    firstName: customer.firstName,
    fullName: customer.fullName,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchToProps => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerName);
