import { connect } from "react-redux";
import { Dispatch } from "redux";
import { getWorkerIsAvailableForOutboundCall } from "../../states/selectors";
import { AppState } from "../../states";
import { DispatchToProps, StateToProps } from "./CarDealerInformation.Props";
import CarDealerInformation from "./CarDealerInformation";

const mapStateToProps = (state: AppState): StateToProps => {
  return {
    canMakeCall: getWorkerIsAvailableForOutboundCall(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchToProps => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CarDealerInformation);
