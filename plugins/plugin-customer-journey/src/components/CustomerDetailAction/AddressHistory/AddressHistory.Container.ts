import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { CustomerDetailModel } from "@common/components";
import { AppState, namespace } from "../../../states";
import { DispatchToProps, StateToProps } from "./AddressHistory.Props";
import { AddressHistory } from "./AddressHistory";
import { Actions } from "../../../states/customer";

const mapStateToProps = (state: AppState): StateToProps => {
  const customer: CustomerDetailModel = Object.assign(
    new CustomerDetailModel(),
    state[namespace].customer.customer
  );
  return {
    applicationId: customer.applicationId ?? 0,
    currentAddress:
      customer.addresses.find((item) => item.isPrimaryAddress) ?? null,
    previousAddressList:
      customer.addresses.filter((item) => !item.isPrimaryAddress) ?? [],
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchToProps => ({
  setCustomerDetails: bindActionCreators(Actions.setCustomerDetails, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressHistory);
