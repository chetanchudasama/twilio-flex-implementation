import { connect } from "react-redux";
import { Dispatch } from "redux";
import { CustomerDetailModel } from "@common/components";
import { AppState, namespace } from "../../../../states/index";
import { StateToProps, DispatchToProps } from "./CustomerProfile.Props";
import { CustomerProfile } from "./CustomerProfile";

const mapStateToProps = (state: AppState): StateToProps => ({
  customer: state[namespace].customer.customer ?? new CustomerDetailModel(),
});

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchToProps => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerProfile);
