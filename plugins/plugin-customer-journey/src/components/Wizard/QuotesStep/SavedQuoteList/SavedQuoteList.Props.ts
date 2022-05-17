import { QuoteSortingOptions } from "../../../../common/enum";
import { QuoteDetailModel } from "../../../../models/QuoteDetailModel";

export interface StateToProps {
  savedQuotes: QuoteDetailModel[];
  totalSavedQuotes: number;
  sort: QuoteSortingOptions;
}

export interface DispatchToProps {
  setSort: (field: QuoteSortingOptions) => void;
}
