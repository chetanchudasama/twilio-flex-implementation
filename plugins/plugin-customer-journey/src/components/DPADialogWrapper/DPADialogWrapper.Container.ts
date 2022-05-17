import { connect } from "react-redux";
import { Dispatch } from "redux";
import { CustomerDetailModel } from "@common/components/lib/cjs/models/CustomerDetailModel";
import { Shared } from "@common/components";
import DPADialogWrapper from "./DPADialogWrapper";
import { AppState, namespace } from "../../states";
import { StateToProps, DispatchToProps } from "./DPADialogWrapper.Props";

const mapStateToProps = (state: AppState): StateToProps => {
  const customer = Object.assign(
    new CustomerDetailModel(),
    state[namespace].customer.customer
  );
  const dob = Shared.getFormattedDate(customer.dateOfBirth, "Do MMMM, YYYY");
  return {
    pin: customer.pin,
    postCode: customer.primaryAddress.postcode ?? "",
    dateOfBirth: dob,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchToProps => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DPADialogWrapper);
