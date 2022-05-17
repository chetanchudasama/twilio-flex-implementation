import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";

import { AppState, namespace } from "../../../../states";
import { Actions as QuoteActions } from "../../../../states/quote";
import { StateToProps, DispatchToProps } from "./QuoteWrapper.Props";
import { QuoteWrapper } from "./QuoteWrapper";

const mapStateToProps = (state: AppState): StateToProps => ({
  applicationId: state[namespace].customer.customer?.applicationId ?? 0,
});

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchToProps => ({
  setSavedQuotes: bindActionCreators(QuoteActions.setSavedQuotes, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuoteWrapper);
