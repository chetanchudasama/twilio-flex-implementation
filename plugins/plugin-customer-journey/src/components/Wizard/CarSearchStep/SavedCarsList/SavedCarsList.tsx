import React from "react";
import { Shared } from "@common/components";
import { Grid } from "@material-ui/core";
import { v4 } from "uuid";
import CarSearchResultDetailWrapper from "../CarSearchResultDetailWrapper/CarSearchResultDetailWrapper.Container";
import { VehicleSortingOptions } from "../../../../common/enum";
import { StateToProps, DispatchToProps } from "./SavedCarsList.Props";
import { CarSearchResultStyles } from "./SavedCarsList.Styles";
import { SortDropdown } from "../../SortDropdown/SortDropdown";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface OwnProps {}

export type ComponentProps = StateToProps & DispatchToProps & OwnProps;

const SavedCarsList: React.FC<ComponentProps> = ({
  sort,
  setSort,
  savedVehicles,
  totalSavedVehicles,
}) => {
  const onSortChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setSort(
      Number(event.target.value) ?? VehicleSortingOptions.PriceDescending
    );

  const noSavedVehiclesComponent = (
    <Grid item xs={12} className="no-result">
      No cars saved.
    </Grid>
  );

  const savedVehiclesComponent = (
    <>
      <Grid item xs={12} className="result-sort-container">
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item className="result-text">
            {`${Shared.getFormattedNumber(totalSavedVehicles)} ${
              totalSavedVehicles > 1 ? "results" : "result"
            }`}
          </Grid>
          <Grid item>
            <SortDropdown sort={sort} onSortChange={onSortChange} />
          </Grid>
        </Grid>
      </Grid>
      {savedVehicles.map((vehicle) => (
        <Grid item xs={12} key={v4()}>
          <CarSearchResultDetailWrapper vehicleDetail={vehicle} />
        </Grid>
      ))}
    </>
  );

  return (
    <CarSearchResultStyles>
      {savedVehicles.length ? savedVehiclesComponent : noSavedVehiclesComponent}
    </CarSearchResultStyles>
  );
};

export default SavedCarsList;
