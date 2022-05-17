import { connect } from "react-redux";
import { Dispatch } from "redux";
import { CustomerDetailModel, Shared } from "@common/components";

import { AppState, namespace } from "../../../states";
import { DPAFCA } from "./DPAFCA";
import { StateToProps, DispatchToProps } from "./DPAFCA.Props";

const mapStateToProps = (state: AppState): StateToProps => {
  const customer = Object.assign(
    new CustomerDetailModel(),
    state[namespace].customer.customer
  );
  return {
    dateOfBirth: Shared.getFormattedDate(customer.dateOfBirth, "DD/MM/YYYY"),
    address: customer.address,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchToProps => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DPAFCA);
