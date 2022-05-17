import React from "react";
import { Shared, CustomSelect } from "@common/components";
import { Button, Grid, MenuItem } from "@material-ui/core";
import { v4 } from "uuid";
import { StateToProps, DispatchToProps } from "./SavedQuoteList.Props";
import { QuoteSortingOptions } from "../../../../common/enum";
import { QuoteListStyles } from "./SavedQuoteList.Styles";
import QuoteDetail from "../QuoteDetail/QuoteDetail";
import { QuoteDetailModel } from "../../../../models/QuoteDetailModel";

interface OwnProps {
  backToCarSearch: () => void;
}

export type ComponentProps = StateToProps & DispatchToProps & OwnProps;

const SavedQuoteList: React.FC<ComponentProps> = ({
  sort,
  setSort,
  totalSavedQuotes,
  savedQuotes,
  backToCarSearch,
}) => {
  const onSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(Number(event.target.value) ?? QuoteSortingOptions.Mileage);
  };

  return (
    <QuoteListStyles>
      <>
        <Grid item xs={12} className="result-sort-container">
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item className="result-text">
              {`${Shared.getFormattedNumber(totalSavedQuotes)} saved ${
                totalSavedQuotes > 1 ? "quotes" : "quote"
              }`}
            </Grid>
            <Grid item>
              <CustomSelect onChange={onSortChange} value={sort}>
                <MenuItem value={QuoteSortingOptions.Price}>
                  Sort by: Price
                </MenuItem>
                <MenuItem value={QuoteSortingOptions.Distance}>
                  Sort by: Distance
                </MenuItem>
                <MenuItem value={QuoteSortingOptions.AddedDate}>
                  Sort by: Added Date
                </MenuItem>
                <MenuItem value={QuoteSortingOptions.Mileage}>
                  Sort by: Mileage
                </MenuItem>
              </CustomSelect>
            </Grid>
          </Grid>
        </Grid>
        {savedQuotes.length ? (
          savedQuotes.map((quote: QuoteDetailModel) => (
            <Grid item xs={12} key={v4()}>
              <QuoteDetail quoteDetail={quote} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12} className="no-result">
            <div className="no-result-text">
              You haven&apos;t saved any quotes
            </div>
            <Button
              onClick={backToCarSearch}
              color="secondary"
              className="back-to-search"
            >
              Back to car search
            </Button>
          </Grid>
        )}
      </>
    </QuoteListStyles>
  );
};

export default SavedQuoteList;
