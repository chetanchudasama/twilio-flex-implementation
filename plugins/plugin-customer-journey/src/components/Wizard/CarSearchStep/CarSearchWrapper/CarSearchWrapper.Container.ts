import { CustomerDetailModel } from "@common/components";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";

import { AppState, namespace } from "../../../../states";
import { Actions as QuoteActions } from "../../../../states/quote";
import { Actions as StaticItemsActions } from "../../../../states/staticItems";
import { Actions as VehicleActions } from "../../../../states/vehicle";
import CarSearchWrapper from "./CarSearchWrapper";
import { DispatchToProps, StateToProps } from "./CarSearchWrapper.Props";

const mapStateToProps = (state: AppState): StateToProps => {
  const customer: CustomerDetailModel = Object.assign(
    new CustomerDetailModel(),
    state[namespace].customer.customer
  );
  return {
    applicationId: state[namespace].customer.customer?.applicationId ?? 0,
    filters: state[namespace].vehicle.filters,
    postCode: customer.primaryAddress.postcode ?? "",
    isVehicleStaticDataFetched:
      state[namespace].staticItems.isVehicleStaticDataFetched,
    hasSavedQuotes: state[namespace].quote.savedQuotes.length > 0,
    savedVehicleCount: state[namespace].vehicle.savedVehicles.length,
    vrmFilters: state[namespace].vehicle.vrmFilters,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchToProps => ({
  setVehicles: bindActionCreators(VehicleActions.setVehicles, dispatch),
  setSavedVehicles: bindActionCreators(
    VehicleActions.setSavedVehicles,
    dispatch
  ),
  setVehicleStaticDataFetched: bindActionCreators(
    StaticItemsActions.setVehicleStaticDataFetched,
    dispatch
  ),
  setVehicleSearchDropdownData: bindActionCreators(
    StaticItemsActions.setVehicleSearchDropdownData,
    dispatch
  ),
  setSavedQuotes: bindActionCreators(QuoteActions.setSavedQuotes, dispatch),
  setTotalVehicles: bindActionCreators(
    VehicleActions.setTotalVehicles,
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(CarSearchWrapper);
