import React, { useMemo } from "react";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import { Pagination, Shared } from "@common/components";

import { Grid } from "@material-ui/core";
import { v4 } from "uuid";
import { CarRegisteredSnackbar } from "../../../CarRegisteredSnackbar/CarRegisteredSnackbar";
import { SortDropdown } from "../../SortDropdown/SortDropdown";
import {
  VehicleSortingOptions,
  DealerStateType,
} from "../../../../common/enum";
import { StateToProps, DispatchToProps } from "./CarSearchResult.Props";
import CarSearchResultDetailWrapper from "../CarSearchResultDetailWrapper/CarSearchResultDetailWrapper.Container";
import { CarSearchResultStyles } from "./CarSearchResult.Styles";
import { DealerStateSnackbar } from "../../../DealerStateSnackbar/DealerStateSnackbar";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface OwnProps {}

export type ComponentProps = StateToProps & DispatchToProps & OwnProps;

const CarSearchResult: React.FC<ComponentProps> = ({
  filters,
  setFilters,
  vehicles,
  totalVehicles,
  vrmFilters,
}) => {
  const sort = useMemo(
    () => filters.sort ?? VehicleSortingOptions.PriceDescending,
    [filters.sort]
  );

  const offset = useMemo(() => {
    return (
      ((filters.page || Shared.defaultPage) - 1) *
      (filters.pageSize ||
        Number(
          process.env.REACT_APP_CAR_SEARCH_PAGE_SIZE || Shared.defaultPageSize
        ))
    );
  }, [filters.page, filters.pageSize]);

  const onClick = (
    _event: React.MouseEvent<HTMLElement>,
    _newOffset: number,
    page: number
  ) =>
    setFilters({
      ...filters,
      page,
    });

  const onSortChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setFilters({
      ...filters,
      page: Shared.defaultPage,
      sort: Number(event.target.value) ?? null,
    });

  const dealerInfo = useMemo(() => {
    // for specification mode - filters.dealerId indicates searching by a specific dealer
    // for vrm mode - vrmFilters.dealerId indicates searching by a specific dealer
    if (
      (filters.dealerId || vrmFilters.dealerId) &&
      vehicles.length > 0 &&
      vehicles[0].dealer.state &&
      vehicles[0].dealer.state !== DealerStateType.Approved
    ) {
      return vehicles[0].dealer;
    }
    return null;
  }, [filters.dealerId, vehicles, vrmFilters.dealerId]);

  const showCarRegisteredSnackbar = useMemo(() => {
    // show snackbar when search mode is vrm, distance value will always be null in vrm mode
    // don't show car found snackbar if searching by dealer, as the dealer snackbar will be shown instead
    return filters.distance === null && !dealerInfo;
  }, [filters, dealerInfo]);

  const vehiclesComponent = (
    <>
      <Grid item xs={12} className="result-sort-container">
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item className="result-text">
            {`${Shared.getFormattedNumber(totalVehicles)} ${
              totalVehicles > 1 ? "results" : "result"
            }`}
          </Grid>
          <Grid item>
            <SortDropdown sort={sort} onSortChange={onSortChange} />
          </Grid>
        </Grid>
      </Grid>
      {showCarRegisteredSnackbar && (
        <Grid item xs={12} className="result-sort-container">
          <CarRegisteredSnackbar is247Cars={vehicles[0]?.is247Cars} />
        </Grid>
      )}
      {dealerInfo && (
        <DealerStateSnackbar
          dealerState={dealerInfo.state}
          declinedDate={dealerInfo.declinedDate}
          reasonForDeclined={dealerInfo.declinedReason ?? ""}
        />
      )}
      {vehicles.map((vehicle) => (
        <Grid item xs={12} key={v4()}>
          <CarSearchResultDetailWrapper vehicleDetail={vehicle} />
        </Grid>
      ))}
      <Grid item xs={12}>
        <Pagination
          limit={
            filters.pageSize ||
            Number(
              process.env.REACT_APP_CAR_SEARCH_PAGE_SIZE ||
                Shared.defaultPageSize
            )
          }
          offset={offset}
          total={totalVehicles}
          onClick={onClick}
          centerRipple
          otherPageColor="default"
          nextPageLabel={<NavigateNextIcon />}
          previousPageLabel={<NavigateBeforeIcon />}
          innerButtonCount={1}
          css=""
        />
      </Grid>
    </>
  );

  const noVehiclesComponent = (
    <Grid item xs={12} className="no-result">
      No cars found.
    </Grid>
  );

  return (
    <CarSearchResultStyles>
      {vehicles.length ? vehiclesComponent : noVehiclesComponent}
    </CarSearchResultStyles>
  );
};

export default CarSearchResult;
