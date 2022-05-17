import { QuoteDetailModel } from "models/QuoteDetailModel";
import { QuoteSortingOptions } from "../common/enum";
import { Action } from "./actionTypes";

const SET_SAVED_QUOTES = "SET_SAVED_QUOTES";
const SAVE_QUOTE = "SAVE_QUOTE";
const SET_SAVED_QUOTES_SORT = "SET_SAVED_QUOTES_SORT";

export interface QuoteState {
  savedQuotes: QuoteDetailModel[];
  savedQuoteSort: QuoteSortingOptions;
}

const initialState: QuoteState = {
  savedQuotes: [],
  savedQuoteSort: QuoteSortingOptions.Mileage,
};

export class Actions {
  public static setSavedQuotes = (quotes: QuoteDetailModel[]): Action => ({
    type: SET_SAVED_QUOTES,
    payload: { quotes },
  });

  public static saveQuote = (quote: QuoteDetailModel): Action => ({
    type: SAVE_QUOTE,
    payload: { quote },
  });

  public static setSavedQuotesSort = (field: QuoteSortingOptions): Action => ({
    type: SET_SAVED_QUOTES_SORT,
    payload: { field },
  });
}

const sortQuotes = (quotes: QuoteDetailModel[], type: QuoteSortingOptions) => {
  switch (type) {
    case QuoteSortingOptions.AddedDate:
      return quotes.sort((a, b) => {
        const aDate = new Date(a.date).getTime();
        const bDate = new Date(b.date).getTime();
        return aDate - bDate;
      });
    case QuoteSortingOptions.Distance:
      return quotes.sort((a, b) => a.distance! - b.distance!);
    case QuoteSortingOptions.Mileage:
      return quotes.sort((a, b) => a.mileage - b.mileage);
    case QuoteSortingOptions.Price:
      return quotes.sort((a, b) => a.price - b.price);
    default:
      return quotes;
  }
};

export function reduce(state: QuoteState = initialState, action: Action) {
  switch (action.type) {
    case SET_SAVED_QUOTES: {
      return {
        ...state,
        savedQuotes: sortQuotes(
          action.payload?.quotes || [],
          state.savedQuoteSort
        ),
      };
    }
    case SAVE_QUOTE: {
      const { savedQuotes } = state;
      if (
        !savedQuotes.some((q) => q.quoteId === action.payload.quote.quoteId)
      ) {
        savedQuotes.push(action.payload.quote);
      }
      return {
        ...state,
        savedQuotes: sortQuotes(savedQuotes, state.savedQuoteSort),
      };
    }
    case SET_SAVED_QUOTES_SORT: {
      return {
        ...state,
        savedQuoteSort: action.payload?.field || QuoteSortingOptions.Mileage,
        savedQuotes: sortQuotes(
          state.savedQuotes,
          action.payload?.field || QuoteSortingOptions.Mileage
        ),
      };
    }
    default:
      return state;
  }
}
