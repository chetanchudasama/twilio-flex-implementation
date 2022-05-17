import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";

import { AppState, namespace } from "../../../../states";
import { Actions as QuoteActions } from "../../../../states/quote";
import { DispatchToProps, StateToProps } from "./SavedQuoteList.Props";
import SavedQuoteList from "./SavedQuoteList";

const mapStateToProps = (state: AppState): StateToProps => ({
  savedQuotes: state[namespace].quote.savedQuotes,
  totalSavedQuotes: state[namespace].quote.savedQuotes.length,
  sort: state[namespace].quote.savedQuoteSort,
});

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchToProps => ({
  setSort: bindActionCreators(QuoteActions.setSavedQuotesSort, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SavedQuoteList);
