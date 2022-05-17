import { QuoteDetailModel } from "../../../../models/QuoteDetailModel";

export interface StateToProps {
  applicationId: number;
}

export interface DispatchToProps {
  setSavedQuotes: (quotes: QuoteDetailModel[]) => void;
}
