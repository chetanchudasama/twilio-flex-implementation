import { CustomerDetailModel } from "@common/components";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";

import { Actions } from "../../../../states/vehicle";
import { AppState, namespace } from "../../../../states";
import CarSearchResultDetailWrapper from "./CarSearchResultDetailWrapper";
import {
  DispatchToProps,
  StateToProps,
} from "./CarSearchResultDetailWrapper.Props";

const mapStateToProps = (state: AppState): StateToProps => {
  const customer: CustomerDetailModel = Object.assign(
    new CustomerDetailModel(),
    state[namespace].customer.customer
  );
  return {
    applicationId: customer?.applicationId ?? 0,
    savedVehicles: state[namespace].vehicle.savedVehicles,
    mobileNumber: state[namespace].customer.customer?.mobileNumber ?? "",
    postCode: customer.primaryAddress.postcode ?? "",
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchToProps => ({
  setSavedVehicles: bindActionCreators(Actions.setSavedVehicles, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CarSearchResultDetailWrapper);
