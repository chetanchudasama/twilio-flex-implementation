import { connect } from "react-redux";
import { Dispatch } from "redux";

import { FactFind } from "./FactFind";
import { AppState, namespace } from "../../../states";
import { StateToProps, DispatchToProps } from "./FactFind.Props";

const mapStateToProps = (state: AppState): StateToProps => {
  return {
    vehicleSearchDropdownData:
      state[namespace].staticItems.vehicleSearchDropdownData,
    timeForPurchaseItems: state[namespace].staticItems.timeForPurchaseItems,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchToProps => ({});

export default connect(mapStateToProps, mapDispatchToProps)(FactFind);
