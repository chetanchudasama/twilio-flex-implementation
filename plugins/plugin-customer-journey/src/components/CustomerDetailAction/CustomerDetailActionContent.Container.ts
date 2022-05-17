import { connect } from "react-redux";
import { Dispatch } from "redux";
import { CustomerDetailActionContent } from "./CustomerDetailActionContent";
import { AppState, namespace } from "../../states";
import {
  StateToProps,
  DispatchToProps,
} from "./CustomerDetailActionContent.Props";

const mapStateToProps = (state: AppState): StateToProps => {
  return {
    currentProgressStatus:
      state[namespace].customer.customer?.currentProgressStatus ?? "",
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchToProps => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerDetailActionContent);
