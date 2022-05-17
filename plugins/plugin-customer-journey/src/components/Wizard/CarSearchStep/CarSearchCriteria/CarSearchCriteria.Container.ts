import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { AppState, namespace } from "../../../../states";
import { Actions as VehicleActions } from "../../../../states/vehicle";
import { StateToProps, DispatchToProps } from "./CarSearchCriteria.Props";
import CarSearchCriteria from "./CarSearchCriteria";

const mapStateToProps = (state: AppState): StateToProps => ({
  vehicleSearchDropdownData:
    state[namespace].staticItems.vehicleSearchDropdownData,
  termId: state[namespace].customer.term,
  maxLendAmount:
    state[namespace].customer.customer?.preferredLender?.maxLendAmount ?? 0,
});

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchToProps => ({
  setFilters: bindActionCreators(VehicleActions.setFilters, dispatch),
  setVRMFilters: bindActionCreators(VehicleActions.setVRMFilters, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CarSearchCriteria);
