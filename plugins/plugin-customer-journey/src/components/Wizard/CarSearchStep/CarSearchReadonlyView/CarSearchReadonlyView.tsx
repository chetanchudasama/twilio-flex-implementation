import React from "react";
import { Grid, InputLabel, Button, Icon } from "@material-ui/core";
import { Shared, ItemModel, VehicleModelData } from "@common/components";
import { v4 } from "uuid";
import { CarSearchReadonlyViewStyles } from "./CarSearchReadonlyView.Styles";
import { VehicleSearchDropdownData } from "../../../../models/VehicleSearchDropdownData";
import { VehicleSearchRequestModel } from "../../../../models/VehicleSearchRequestModel";

export interface CarSearchReadonlyViewProps {
  vehicleSearchDropdownData: VehicleSearchDropdownData;
  filters: VehicleSearchRequestModel;
  term: number | null;
  partExchangeValue: number | null;
  partExchangeSettlement: number | null;
  deposit: number | null;
  handleEditSearch: () => void;
  vrm: string;
  dealerInfo: string;
}

const CarSearchReadonlyView: React.FC<CarSearchReadonlyViewProps> = ({
  vehicleSearchDropdownData,
  filters,
  term,
  partExchangeValue,
  partExchangeSettlement,
  deposit,
  handleEditSearch,
  vrm,
  dealerInfo,
}) => {
  const getSelectedItems = (
    itemList: VehicleModelData[] | ItemModel[],
    selectedItems: string | number | (string | number)[] | undefined
  ) => {
    const list: string[] = [];
    (selectedItems as number[]).map((value) =>
      list.push(itemList.find((item) => item.id === value)?.name ?? "")
    );
    return list.join(", ");
  };

  const modelItems = () => {
    const modelList: VehicleModelData[] = [];
    vehicleSearchDropdownData.makesModels
      .filter((item) => filters.makeIds?.includes(item.id))
      .map((model) => model.models.map((el) => modelList.push(el)));
    return modelList;
  };

  const filterValue = (): string => {
    if (filters?.engineMax && filters?.engineMin) {
      return `${filters?.engineMin} - ${filters?.engineMax}`;
    }

    if (filters?.engineMin && !filters?.engineMax) {
      return `greater than ${filters?.engineMin}`;
    }

    if (!filters?.engineMin && filters?.engineMax) {
      return `less than ${filters?.engineMax}`;
    }

    return "";
  };

  const searchItems = [
    {
      label: "Car make",
      value: getSelectedItems(
        vehicleSearchDropdownData.makesModels,
        filters?.makeIds
      ),
      hasValue: filters?.makeIds?.length > 0,
    },
    {
      label: "Car model",
      value: getSelectedItems(modelItems(), filters?.modelIds),
      hasValue: filters?.modelIds?.length > 0,
    },
    {
      label: "Distance",
      value: `Within ${filters?.distance} miles`,
      hasValue: !!(filters?.distance && filters?.distance !== -1),
    },
    {
      label: "Dealer",
      value: dealerInfo,
      hasValue: !!(!vrm && dealerInfo),
    },
    {
      label: "Keywords",
      value: filters?.keywords,
      hasValue: !!filters?.keywords,
    },
    {
      label: "Include dealers who deliver",
      value: "Yes",
      hasValue: filters?.includeDeliveryDealer === true,
    },
    {
      label: "Body type",
      value: getSelectedItems(vehicleSearchDropdownData.body, filters?.bodyIds),
      hasValue: filters?.bodyIds.length > 0,
    },
    {
      label: "Maximum mileage",
      value: filters?.mileageRange?.max,
      hasValue: !!filters?.mileageRange?.max,
    },
    {
      label: "Transmission",
      value: vehicleSearchDropdownData.trans
        .filter((item) => item.id === filters?.transId)
        .map((transmission) => transmission.name),
      hasValue: !!(filters?.transId && filters?.transId !== -1),
    },
    {
      label: "Maximum age",
      value: filters?.ageRange?.max,
      hasValue: !!filters?.ageRange?.max,
    },
    {
      label: "Fuel type",
      value: getSelectedItems(vehicleSearchDropdownData.fuel, filters?.fuelIds),
      hasValue: filters?.fuelIds.length > 0,
    },
    {
      label: "Colour",
      value: getSelectedItems(
        vehicleSearchDropdownData.colour,
        filters?.colourIds
      ),
      hasValue: filters?.colourIds.length > 0,
    },
    {
      label: "Engine size",
      value: filterValue(),
      hasValue: !!(filters?.engineMin || filters?.engineMax),
    },
  ];

  return (
    <CarSearchReadonlyViewStyles>
      <Grid container>
        {filters && !vrm && (
          <>
            <Grid item xs={5}>
              {searchItems
                .filter((item) => item.hasValue)
                .map((searchItem) => (
                  <Grid item xs={12} className="item-container" key={v4()}>
                    <InputLabel>{searchItem.label}</InputLabel>
                    <div className="item-value">{searchItem.value}</div>
                  </Grid>
                ))}
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={6}>
              <Grid container item xs={12}>
                <Grid item xs={6}>
                  {filters?.priceMax && filters?.priceMax > 0 ? (
                    <Grid item xs={12} className="item-container">
                      <InputLabel>Total Price</InputLabel>
                      <div className="item-value">
                        {Shared.getFormattedCurrencyValue(filters.priceMax)}
                      </div>
                    </Grid>
                  ) : null}
                  {filters?.priceMonthly && filters?.priceMonthly > 0 ? (
                    <Grid item xs={12} className="item-container">
                      <InputLabel>Monthly Budget</InputLabel>
                      <div className="item-value">
                        {Shared.getFormattedCurrencyValue(filters.priceMonthly)}
                      </div>
                    </Grid>
                  ) : null}
                  {partExchangeValue && (
                    <Grid item xs={12} className="item-container">
                      <InputLabel>Part Ex. Value</InputLabel>
                      <div className="item-value">
                        {Shared.getFormattedCurrencyValue(partExchangeValue)}
                      </div>
                    </Grid>
                  )}
                  {deposit && (
                    <Grid item xs={12} className="item-container">
                      <InputLabel>Deposit</InputLabel>
                      <div className="item-value">
                        {Shared.getFormattedCurrencyValue(deposit)}
                      </div>
                    </Grid>
                  )}
                </Grid>
                <Grid item xs={6}>
                  {term && (
                    <Grid item xs={12} className="item-container">
                      <InputLabel>Term</InputLabel>
                      <div className="item-value">
                        {Shared.termList
                          .filter((item) => item.id === term)
                          .map((termItem) => termItem.name)}
                      </div>
                    </Grid>
                  )}
                  {filters.isFlexible === true && (
                    <Grid item xs={12} className="item-container">
                      <InputLabel>Flexible budget (+/-&pound;50)</InputLabel>
                      <div className="item-value">Yes</div>
                    </Grid>
                  )}
                  {partExchangeSettlement && (
                    <Grid item xs={12} className="item-container">
                      <InputLabel>Part Ex. Settlement</InputLabel>
                      <div className="item-value">
                        {Shared.getFormattedCurrencyValue(
                          partExchangeSettlement
                        )}
                      </div>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </>
        )}
        <Grid item xs={5}>
          {vrm && (
            <Grid item xs={12} className="item-container">
              <InputLabel>VRM</InputLabel>
              <div className="item-value">{vrm}</div>
            </Grid>
          )}
        </Grid>
        <Grid item xs={4}>
          {dealerInfo && vrm && (
            <Grid item xs={12} className="item-container">
              <InputLabel>Dealer</InputLabel>
              <div className="item-value">{dealerInfo}</div>
            </Grid>
          )}
        </Grid>
        <Grid item xs={3} className="edit-search-container">
          <Button onClick={handleEditSearch} size="large">
            <Icon className="edit-icon" fontSize="small">
              edit
            </Icon>
            Edit Search
          </Button>
        </Grid>
      </Grid>
    </CarSearchReadonlyViewStyles>
  );
};

export default CarSearchReadonlyView;
