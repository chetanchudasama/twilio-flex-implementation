import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";

import { AppState, namespace } from "../../../../states";
import { Actions as VehicleActions } from "../../../../states/vehicle";
import { StateToProps, DispatchToProps } from "./SavedCarsList.Props";
import SavedCarsList from "./SavedCarsList";

const mapStateToProps = (state: AppState): StateToProps => ({
  savedVehicles: state[namespace].vehicle.savedVehicles,
  totalSavedVehicles: state[namespace].vehicle.savedVehicles.length,
  sort: state[namespace].vehicle.savedVehicleSort,
});

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchToProps => ({
  setSort: bindActionCreators(VehicleActions.setSavedCarsSort, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SavedCarsList);
