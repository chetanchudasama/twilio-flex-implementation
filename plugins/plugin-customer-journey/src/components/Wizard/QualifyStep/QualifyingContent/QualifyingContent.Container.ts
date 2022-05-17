import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import { AppState, namespace } from "../../../../states";
import { Actions as CustomerActions } from "../../../../states/customer";
import QualifyingContent from "./QualifyingContent";
import { DispatchToProps, StateToProps } from "./QualifyingContent.Props";

const mapStateToProps = (state: AppState): StateToProps => ({
  reasonForPurchaseItems: state[namespace].staticItems.reasonForPurchaseItems,
  timeForPurchaseItems: state[namespace].staticItems.timeForPurchaseItems,
  whereDidYouHearItems: state[namespace].staticItems.whereDidYouHearItems,
  amountToFinance: state[namespace].customer.customer?.amountToFinance,
  monthlyBudget: state[namespace].customer.customer?.monthlyBudget,
  preferredLender: state[namespace].customer.customer?.preferredLender,
  term: state[namespace].customer.term,
  monthlyIncome:
    state[namespace].customer.customer?.bankDetails?.netMonthlyIncome ?? 0,
});

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchToProps => ({
  setTerm: bindActionCreators(CustomerActions.setTerm, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(QualifyingContent);
