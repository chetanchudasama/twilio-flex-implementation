import { CustomerDetailModel } from "@common/components";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { AppState, namespace } from "../../states";
import CarDetailViewDialog from "./CarDetailViewDialog";
import { DispatchToProps, StateToProps } from "./CarDetailViewDialog.Props";

const mapStateToProps = (state: AppState): StateToProps => {
  const customer: CustomerDetailModel = Object.assign(
    new CustomerDetailModel(),
    state[namespace].customer.customer
  );

  return {
    postCode: customer.primaryAddress.postcode ?? "",
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchToProps => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CarDetailViewDialog);
