import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { AppState, namespace } from "../../../../states";
import { Actions } from "../../../../states/quote";
import { StateToProps, DispatchToProps } from "./QuoteDialog.Props";
import { Actions as StaticItemsActions } from "../../../../states/staticItems";
import QuoteDialog from "./QuoteDialog";

const mapStateToProps = (state: AppState): StateToProps => {
  return {
    applicationId: state[namespace].customer.customer?.applicationId ?? 0,
    lenderId:
      state[namespace].customer.customer?.preferredLender?.lenderId ?? 0,
    apr: state[namespace].customer.customer?.preferredLender?.apr ?? 0,
    maxLendAmount:
      state[namespace].customer.customer?.preferredLender?.maxLendAmount ?? 0,
    lenderName:
      state[namespace].customer.customer?.preferredLender?.lenderName ?? "",
    vehicleExtraItemList: state[namespace].staticItems.vehicleExtraItemList,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchToProps => ({
  saveQuote: bindActionCreators(Actions.saveQuote, dispatch),
  setVehicleExtraItemList: bindActionCreators(
    StaticItemsActions.setVehicleExtraItemList,
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuoteDialog);
