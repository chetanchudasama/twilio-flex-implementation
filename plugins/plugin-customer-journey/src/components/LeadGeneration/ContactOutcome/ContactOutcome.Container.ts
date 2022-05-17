import { connect } from "react-redux";
import { Dispatch } from "redux";
import { CustomerDetailModel } from "@common/components";

import { AppState, namespace } from "../../../states";
import { ContactOutcome } from "./ContactOutcome";
import { StateToProps, DispatchToProps } from "./ContactOutcome.Props";

const mapStateToProps = (state: AppState): StateToProps => {
  const customer = Object.assign(
    new CustomerDetailModel(),
    state[namespace].customer.customer
  );
  return {
    callbackBooked: customer.callbackBooked,
    taskDecisions: state[namespace].staticItems.taskDecisions,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchToProps => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ContactOutcome);
