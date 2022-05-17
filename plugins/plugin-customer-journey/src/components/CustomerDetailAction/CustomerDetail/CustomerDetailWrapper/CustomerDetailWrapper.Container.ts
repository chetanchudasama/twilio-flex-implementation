import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { Actions } from "../../../../states/customer";
import { AppState, namespace } from "../../../../states/index";
import { StateToProps, DispatchToProps } from "./CustomerDetailWrapper.Props";
import { CustomerDetailWrapper } from "./CustomerDetailWrapper";

const mapStateToProps = (state: AppState): StateToProps => ({
  applicationId: state[namespace].customer.customer?.applicationId ?? 0,
});

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchToProps => ({
  setCustomerDetails: bindActionCreators(Actions.setCustomerDetails, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerDetailWrapper);
