import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";

import { AppState, namespace } from "../../../../states";
import { Actions as VehicleActions } from "../../../../states/vehicle";

import { StateToProps, DispatchToProps } from "./CarSearchResult.Props";
import CarSearchResult from "./CarSearchResult";

const mapStateToProps = (state: AppState): StateToProps => ({
  vehicles: state[namespace].vehicle.vehicles,
  filters: state[namespace].vehicle.filters,
  totalVehicles: state[namespace].vehicle.totalVehicles,
  vrmFilters: state[namespace].vehicle.vrmFilters,
});

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchToProps => ({
  setFilters: bindActionCreators(VehicleActions.setFilters, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CarSearchResult);
