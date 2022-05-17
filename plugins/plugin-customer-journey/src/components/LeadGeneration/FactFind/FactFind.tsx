import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import {
  Grid,
  Typography,
  Divider,
  MenuItem,
  TextField,
} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import {
  ThreeStateToggle,
  CustomInput,
  CustomSelect,
  ItemModel,
  VehicleMakeData,
  VehicleModelData,
  Shared,
} from "@common/components";

import { TimeForPurchaseItemModel } from "../../../models/TimeForPurchaseModel";
import { FactFindStyles } from "./FactFind.Styles";
import { FactFindProps } from "./FactFind.Props";

const vehicleTypes: ItemModel[] = [
  { id: 1, name: "Car" },
  { id: 5, name: "Motorbike" },
  { id: 9, name: "Van" },
];

export const FactFind: React.FC<FactFindProps> = ({
  vehicleSearchDropdownData,
  timeForPurchaseItems,
  factFindDetail,
  updateFactFindDetail,
}) => {
  const [modelItems, setModelItems] = useState<VehicleModelData[]>([]);

  const onThreeWaySwitchChange = (key: string) => (value: boolean | null) => {
    updateFactFindDetail(key, value);
  };

  const handleFactFindDetailChange = (
    key: string,
    value:
      | string
      | number
      | boolean
      | TimeForPurchaseItemModel
      | ItemModel
      | null
  ) => {
    if (key === "borrowAmount") {
      if (Shared.isNumericValue(value as string) || value === "") {
        updateFactFindDetail(key, Number(value));
      }
    } else {
      updateFactFindDetail(key, value);
    }
  };

  const handleTimeForPurchaseChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const timeForPurchaseItem =
      timeForPurchaseItems.find((t) => t.id === Number(event.target.value)) ??
      null;
    updateFactFindDetail("timeForPurchase", timeForPurchaseItem);
  };

  const handleVehicleTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const vehicleType =
      vehicleTypes.find((v) => v.id === Number(event.target.value)) ??
      new ItemModel();
    updateFactFindDetail("vehicleType", vehicleType);
  };

  useEffect(() => {
    const modelList: VehicleModelData[] = [];
    vehicleSearchDropdownData.makesModels
      .filter((item) => factFindDetail.makeId === item.id)
      .map((model) => model.models.map((el) => modelList.push(el)));

    setModelItems(modelList);
    updateFactFindDetail("modelId", -1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [factFindDetail.makeId, vehicleSearchDropdownData]);

  return (
    <FactFindStyles>
      <Grid container spacing={16}>
        <Grid item xs={12} className="heading">
          Fact Find
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            spacing={8}
          >
            <Grid item>
              <Typography component="p" variant="caption">
                How much is the customer looking to borrow?
              </Typography>
            </Grid>
            <Grid item className="borrowAmount">
              <CustomInput
                label=""
                value={factFindDetail.borrowAmount}
                onChange={(event) =>
                  handleFactFindDetailChange("borrowAmount", event.target.value)
                }
                startAdornment={
                  <InputAdornment position="start">&pound;</InputAdornment>
                }
                classes={{
                  formControl: "custom-input",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} className="top-spacing">
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            spacing={8}
          >
            <Grid item>
              <Typography component="p" variant="caption">
                Has the customer found a vehicle yet?
              </Typography>
            </Grid>
            <Grid item>
              <ThreeStateToggle
                checked={factFindDetail.hasCustomerAlreadyFoundCar}
                onChange={onThreeWaySwitchChange("hasCustomerAlreadyFoundCar")}
              />
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            {factFindDetail.hasCustomerAlreadyFoundCar && (
              <>
                <Grid item xs={12}>
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                    spacing={8}
                  >
                    <Grid item>
                      <Typography
                        component="p"
                        variant="caption"
                        className="spacing-left"
                      >
                        What is the car make?
                      </Typography>
                    </Grid>
                    <Grid item>
                      <CustomSelect
                        onChange={(event) =>
                          handleFactFindDetailChange(
                            "makeId",
                            event.target.value
                          )
                        }
                        value={factFindDetail.makeId ?? -1}
                        classes={{
                          formControl: "custom-width-select",
                        }}
                      >
                        <MenuItem value={-1}>
                          <em>Select a make</em>
                        </MenuItem>
                        {vehicleSearchDropdownData.makesModels.length > 0
                          ? vehicleSearchDropdownData.makesModels.map(
                              (item: VehicleMakeData) => (
                                <MenuItem key={item.name} value={item.id}>
                                  {item.name}
                                </MenuItem>
                              )
                            )
                          : null}
                      </CustomSelect>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                    spacing={8}
                  >
                    <Grid item>
                      <Typography
                        component="p"
                        variant="caption"
                        className="spacing-left"
                      >
                        What is the car model?
                      </Typography>
                    </Grid>
                    <Grid item>
                      <CustomSelect
                        onChange={(event) =>
                          handleFactFindDetailChange(
                            "modelId",
                            event.target.value
                          )
                        }
                        value={factFindDetail.modelId ?? -1}
                        disabled={factFindDetail.makeId === -1}
                        classes={{
                          formControl: "custom-width-select",
                        }}
                      >
                        <MenuItem value={-1}>
                          <em>Select a model</em>
                        </MenuItem>
                        {modelItems.map((item: VehicleModelData) => (
                          <MenuItem key={item.name} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </CustomSelect>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                    spacing={8}
                  >
                    <Grid item>
                      <Typography
                        component="p"
                        variant="caption"
                        className="spacing-left"
                      >
                        Does the customer know the VRM?
                        <span className="optional-text">&nbsp;(Optional)</span>
                      </Typography>
                    </Grid>
                    <Grid item className="vrm">
                      <CustomInput
                        label=""
                        placeholder="Enter VRM"
                        value={factFindDetail.vrm}
                        onChange={(event) =>
                          handleFactFindDetailChange("vrm", event.target.value)
                        }
                        classes={{
                          formControl: "custom-input",
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} className="top-spacing">
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            spacing={8}
          >
            <Grid item>
              <Typography component="p" variant="caption">
                What type of vehicle are they looking for?
              </Typography>
            </Grid>
            <Grid item>
              <CustomSelect
                onChange={handleVehicleTypeChange}
                value={factFindDetail.vehicleType?.id || 0}
                classes={{
                  formControl: "custom-width-select",
                }}
              >
                <MenuItem value={0}>
                  <em>Select vehicle type</em>
                </MenuItem>
                {vehicleTypes.map((item) => (
                  <MenuItem key={v4()} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </CustomSelect>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} className="top-spacing">
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            spacing={8}
          >
            <Grid item>
              <Typography component="p" variant="caption">
                When are they hoping to be driving their new vehicle?
              </Typography>
            </Grid>
            <Grid item>
              <CustomSelect
                onChange={handleTimeForPurchaseChange}
                value={factFindDetail.timeForPurchase?.id || -1}
                classes={{
                  formControl: "custom-width-select",
                }}
              >
                <MenuItem value={-1}>
                  <em>Select time</em>
                </MenuItem>
                {timeForPurchaseItems.map((item) => (
                  <MenuItem key={v4()} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </CustomSelect>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography component="p" variant="caption">
            Any additional notes?
            <span className="optional-text">&nbsp;(Optional)</span>
          </Typography>
        </Grid>
        <Grid item xs={12} className="notes">
          <TextField
            className="add-note-text-field"
            onChange={(event) =>
              handleFactFindDetailChange("note", event.target.value)
            }
            multiline
            rows={5}
            InputProps={{
              placeholder: "Enter notes here",
            }}
            variant="outlined"
            value={factFindDetail.note}
            fullWidth
          />
        </Grid>
      </Grid>
    </FactFindStyles>
  );
};
