import { connect } from "react-redux";
import { Dispatch } from "redux";
import { CustomerDetailModel } from "@common/components";

import { AppState, namespace } from "../../../states";
import { ViewNotesDialog } from "./ViewNotesDialog";
import { StateToProps, DispatchToProps } from "./ViewNotesDialog.Props";

const mapStateToProps = (state: AppState): StateToProps => {
  const customer = Object.assign(
    new CustomerDetailModel(),
    state[namespace].customer.customer
  );
  return {
    applicationId: customer.applicationId ?? 0,
    customerName: customer.fullName,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchToProps => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ViewNotesDialog);
