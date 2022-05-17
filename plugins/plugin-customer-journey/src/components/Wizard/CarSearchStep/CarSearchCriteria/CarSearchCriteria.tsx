import {
  CustomSelect,
  CustomInput,
  Shared,
  ItemModel,
  VehicleModelData,
  VehicleMakeData,
  CustomMultiSelect,
  CustomSnackbar,
} from "@common/components";
import React, { useState, useEffect, useMemo, ChangeEvent } from "react";
import {
  Grid,
  MenuItem,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Button,
  Icon,
  InputAdornment,
  ListItemText,
  FormHelperText,
  InputLabel,
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import { VehicleVRMSearchRequestModel } from "../../../../models/VehicleVRMSearchRequestModel";
import { DealerSearch } from "../../../DealerSearch/DealerSearch";
import { getTotalAmountForCarSearch } from "../../../../helpers/utility";
import { CarSearchCriteriaStyles } from "./CarSearchCriteria.Styles";
import { StateToProps, DispatchToProps } from "./CarSearchCriteria.Props";
import CarSearchReadonlyView from "../CarSearchReadonlyView/CarSearchReadonlyView";
import { VehicleSearchRequestModel } from "../../../../models/VehicleSearchRequestModel";
import { RangeFilterModel } from "../../../../models/RangeFilterModel";
import { DealerResponseModel } from "../../../../models/DealerResponseModel";

enum BudgetType {
  TotalBudget = 1,
  MonthlyBudget = 2,
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface OwnProps {}

export type CarSearchCriteriaProps = StateToProps & DispatchToProps & OwnProps;

const CarSearchCriteria: React.FC<CarSearchCriteriaProps> = (props) => {
  const {
    vehicleSearchDropdownData,
    setFilters,
    termId,
    maxLendAmount,
    setVRMFilters,
  } = props;

  // set default value for distance dropdown to 1 and multi-select dropdown to -1 to display first option as selected
  const vehicleSearchRequestModel = Object.assign(
    new VehicleSearchRequestModel(),
    {
      makeIds: [-1],
      modelIds: [-1],
      bodyIds: [-1],
      fuelIds: [-1],
      colourIds: [-1],
    }
  );
  const [isAdvanceSearchOpen, setIsAdvanceSearchOpen] = useState(false);
  const [carSearchDetail, setCarSearchDetail] = useState(
    vehicleSearchRequestModel
  );
  const [budgetSearchType, setBudgetSearchType] = useState("1");
  const [term, setTerm] = useState<number | null>(termId);
  const [partExchangeValue, setPartExchangeValue] = useState<number | null>(
    null
  );
  const [partExchangeSettlement, setPartExchangeSettlement] = useState<
    number | null
  >(null);
  const [deposit, setDeposit] = useState<number | null>(null);
  const [modelItems, setModelItems] = useState<VehicleModelData[]>([]);
  const [carSearchFilterData, setCarSearchFilterData] =
    useState<VehicleSearchRequestModel | null>(null);
  const [isSearchByVRM, setIsSearchByVRM] = useState(false);
  const [dealerForSpecification, setDealerForSpecification] =
    useState<DealerResponseModel | null>(null);
  const [dealerForVRM, setDealerForVRM] = useState<DealerResponseModel | null>(
    null
  );
  const [vrm, setVRM] = useState<string>("");

  const handleAdvanceSearchToggle = () => {
    setIsAdvanceSearchOpen(!isAdvanceSearchOpen);
  };

  const handleSearchByToggle = () => {
    setIsSearchByVRM(!isSearchByVRM);
  };

  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateFuelIds = (
    e: ChangeEvent<any>,
    inputCarSearchDetail: any,
    propertyName: string
  ) => {
    const selectedItems: number[] =
      { ...inputCarSearchDetail }[propertyName] ?? [];

    let values: number[] = [];

    const currentValues = e.target.value.filter(
      (v: number) => selectedItems.indexOf(v) === -1
    );

    values =
      currentValues.includes(-1) || !e.target.value.length
        ? [-1]
        : e.target.value.filter((m: any) => m !== -1);

    setCarSearchDetail({
      ...inputCarSearchDetail,
      [propertyName]: values,
    });
  };

  const handleCarSearchDetailChange = (
    event: ChangeEvent<any>,
    propertyName: string
  ) => {
    switch (propertyName) {
      case "budgetSearchType":
        setBudgetSearchType(event.target.value);
        break;
      case "term":
        setTerm(
          Number(event.target.value) === -1 ? null : Number(event.target.value)
        );
        break;
      case "partExchangeValue":
        if (
          Shared.isNumericValue(event.target.value) ||
          event.target.value === ""
        ) {
          setPartExchangeValue(event.target.value);
        }
        break;
      case "partExchangeSettlement":
        if (
          Shared.isNumericValue(event.target.value) ||
          event.target.value === ""
        ) {
          setPartExchangeSettlement(event.target.value);
        }
        break;
      case "deposit":
        if (
          Shared.isNumericValue(event.target.value) ||
          event.target.value === ""
        ) {
          setDeposit(event.target.value);
        }
        break;
      case "isFlexible":
      case "includeDeliveryDealer":
        setCarSearchDetail({
          ...carSearchDetail,
          [propertyName]: event.target.checked,
        });
        break;
      case "ageRange":
      case "mileageRange":
        if (
          Shared.isNumericValue(
            event.target.value,
            propertyName !== "ageRange"
          ) ||
          event.target.value === ""
        ) {
          if (propertyName === "ageRange" || propertyName === "mileageRange") {
            const selectedObject = new RangeFilterModel();
            selectedObject.max = Number(event.target.value);
            setCarSearchDetail({
              ...carSearchDetail,
              [propertyName]: selectedObject,
            });
          } else {
            setCarSearchDetail({
              ...carSearchDetail,
              [propertyName]: Number(event.target.value),
            });
          }
        }
        break;
      case "engineMin":
      case "engineMax":
        setCarSearchDetail({
          ...carSearchDetail,
          [propertyName]:
            Number(event.target.value) === -1
              ? null
              : Number(event.target.value),
        });
        break;
      case "makeIds":
      case "modelIds":
      case "bodyIds":
      case "colourIds":
      case "fuelIds":
        updateFuelIds(event, carSearchDetail, propertyName);
        break;
      case "priceMax":
        if (
          Shared.isNumericValue(event.target.value, false) ||
          event.target.value === ""
        ) {
          setCarSearchDetail({
            ...carSearchDetail,
            priceMonthly: null,
            [propertyName]: Number(event.target.value),
          });
        }
        break;
      case "priceMonthly":
        if (
          Shared.isNumericValue(event.target.value, false) ||
          event.target.value === ""
        ) {
          setCarSearchDetail({
            ...carSearchDetail,
            priceMax: null,
            [propertyName]: Number(event.target.value),
          });
        }
        break;
      case "vrm":
        if (event.target.value.length > 10) {
          return;
        }
        setVRM(event.target.value);
        break;
      default:
        setCarSearchDetail({
          ...carSearchDetail,
          [propertyName]: event.target.value,
        });
    }
  };

  const isEngineSizeValid: boolean = useMemo(() => {
    return !(
      carSearchDetail.engineMax &&
      carSearchDetail.engineMin &&
      Number(carSearchDetail.engineMin) > Number(carSearchDetail.engineMax)
    );
  }, [carSearchDetail.engineMax, carSearchDetail.engineMin]);

  useEffect(() => {
    const modelList: VehicleModelData[] = [];
    vehicleSearchDropdownData.makesModels
      .filter((item) => carSearchDetail.makeIds?.includes(item.id))
      .map((model) => model.models.map((el) => modelList.push(el)));

    setModelItems(modelList);

    // set modelIds value based on makeIds
    const tempModelIdList = modelList.map((s) => s.id);
    const modelIdList: number[] =
      carSearchDetail.modelIds?.includes(-1) ||
      carSearchDetail.makeIds?.includes(-1) ||
      !carSearchDetail.makeIds?.length ||
      !carSearchDetail.modelIds?.length
        ? [-1]
        : carSearchDetail.modelIds?.filter(
            (v: number) => tempModelIdList.indexOf(v) !== -1
          );
    setCarSearchDetail({
      ...carSearchDetail,
      modelIds: modelIdList,
    });

    // don't include carSearchDetail in the below item as that causes
    // our jest tests to re-render one every mount, breaking them
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vehicleSearchDropdownData, carSearchDetail.makeIds]);

  const distanceValue = useMemo(() => {
    return carSearchDetail.distance
      ? carSearchDetail.distance
      : vehicleSearchDropdownData.distance?.[0] ?? -1;
  }, [carSearchDetail.distance, vehicleSearchDropdownData.distance]);

  const handleSearchCar = () => {
    const carSearchModel = { ...carSearchDetail };
    const vrmFilterObj = new VehicleVRMSearchRequestModel();
    if (!isEngineSizeValid) {
      return;
    }
    const errorArray: Record<string, string> = {};

    if (isSearchByVRM) {
      if (vrm) {
        delete errorArray.vrm;
      } else {
        errorArray.vrm = "VRM field is required";
      }
    } else {
      if (budgetSearchType === BudgetType.TotalBudget.toString()) {
        if (carSearchModel.priceMax) {
          delete errorArray.priceMax;
        } else {
          errorArray.priceMax = "Total Price is required";
        }
      }

      if (budgetSearchType === BudgetType.MonthlyBudget.toString()) {
        if (carSearchModel.priceMonthly) {
          delete errorArray.priceMonthly;
        } else {
          errorArray.priceMonthly = "Monthly Budget is required";
        }
      }

      if (term) {
        if (term < 0) {
          errorArray.term = "Term is required";
        } else {
          delete errorArray.term;
        }
      } else {
        errorArray.term = "Term is required";
      }
    }

    setErrors(errorArray);

    if (Object.keys(errorArray).length > 0) {
      return;
    }

    if (!isSearchByVRM) {
      if (budgetSearchType === "1") {
        carSearchModel.isFlexible = false;
        carSearchModel.priceMonthly = null;
      } else {
        carSearchModel.priceMax = null;
      }
      if (carSearchModel.makeIds?.includes(-1)) {
        carSearchModel.makeIds = [];
      }
      if (carSearchModel.modelIds?.includes(-1)) {
        carSearchModel.modelIds = [];
      }
      if (carSearchModel.fuelIds?.includes(-1)) {
        carSearchModel.fuelIds = [];
      }
      if (carSearchModel.bodyIds?.includes(-1)) {
        carSearchModel.bodyIds = [];
      }
      if (carSearchModel.colourIds?.includes(-1)) {
        carSearchModel.colourIds = [];
      }
      carSearchModel.distance = distanceValue;
      carSearchModel.dealerId = dealerForSpecification?.dealerId || null;
    } else {
      vrmFilterObj.dealerId = dealerForVRM?.dealerId || null;
      vrmFilterObj.vrm = vrm;
    }
    setFilters(
      isSearchByVRM ? new VehicleSearchRequestModel() : { ...carSearchModel }
    );
    setCarSearchFilterData(
      isSearchByVRM ? new VehicleSearchRequestModel() : { ...carSearchModel }
    );
    setVRMFilters(vrmFilterObj);
  };

  // remove selected value from dropdown
  const handleDeleteSelectedItem = (
    value: string | number,
    propertyName: string,
    itemList: number[]
  ) => {
    const selectedItems = itemList.filter((item) => item !== value);
    setCarSearchDetail({
      ...carSearchDetail,
      [propertyName]: !selectedItems.length ? [-1] : selectedItems,
    });
    (document.activeElement as HTMLSelectElement).blur();
  };

  const exceededAmount: number = useMemo(() => {
    if (budgetSearchType === BudgetType.TotalBudget.toString()) {
      return carSearchDetail.priceMax &&
        carSearchDetail.priceMax > maxLendAmount
        ? carSearchDetail.priceMax - maxLendAmount
        : 0;
    }
    if (budgetSearchType === BudgetType.MonthlyBudget.toString()) {
      const totalAmount = getTotalAmountForCarSearch(
        Number(carSearchDetail.priceMonthly ?? 0),
        term ?? 0,
        carSearchDetail.isFlexible,
        Number(partExchangeSettlement ?? 0),
        Number(deposit ?? 0)
      );
      return totalAmount > maxLendAmount ? totalAmount - maxLendAmount : 0;
    }
    return 0;
  }, [
    budgetSearchType,
    carSearchDetail.isFlexible,
    carSearchDetail.priceMax,
    carSearchDetail.priceMonthly,
    deposit,
    maxLendAmount,
    partExchangeSettlement,
    term,
  ]);

  const handleDealerChange = (dealer: DealerResponseModel | null) => {
    if (isSearchByVRM) {
      setDealerForVRM(dealer);
    } else {
      setDealerForSpecification(dealer);
      setCarSearchDetail({
        ...carSearchDetail,
        dealerId: dealer ? dealer.dealerId : null,
      });
    }
  };

  const getDealerInfo = (dealer: DealerResponseModel | null) => {
    return dealer ? `${dealer.dealerName}, ${dealer.postcode}` : "";
  };

  const searchByVRMForm = (
    <Grid container className="car-search-container">
      <Grid item xs={4} className="padding-right vrm-container">
        <CustomInput
          value={vrm ?? ""}
          label="VRM"
          isRequired
          onChange={(event) => handleCarSearchDetailChange(event, "vrm")}
          errors={errors.vrm ? [errors.vrm] : undefined}
        />
      </Grid>
      <Grid item xs={4} className="dealer-container padding-left">
        <InputLabel shrink>Dealer</InputLabel>
        <DealerSearch
          handleDealerUpdate={handleDealerChange}
          dealer={dealerForVRM}
        />
      </Grid>
      <Grid item xs={4} />
    </Grid>
  );

  const carSearchReadonlyView = (
    <CarSearchReadonlyView
      filters={carSearchFilterData ?? new VehicleSearchRequestModel()}
      term={term}
      partExchangeValue={
        partExchangeValue && partExchangeValue > 0 ? partExchangeValue : null
      }
      partExchangeSettlement={
        partExchangeSettlement && partExchangeSettlement > 0
          ? partExchangeSettlement
          : null
      }
      deposit={deposit && deposit > 0 ? deposit : null}
      vehicleSearchDropdownData={vehicleSearchDropdownData}
      handleEditSearch={() => setCarSearchFilterData(null)}
      vrm={isSearchByVRM ? vrm : ""}
      dealerInfo={
        isSearchByVRM
          ? getDealerInfo(dealerForVRM)
          : getDealerInfo(dealerForSpecification)
      }
    />
  );

  return (
    <CarSearchCriteriaStyles>
      {!carSearchFilterData ? (
        <>
          {!isSearchByVRM ? (
            <div className="car-search-container">
              <Grid container>
                <Grid item xs={5}>
                  <Grid item xs={12}>
                    <CustomMultiSelect
                      label="Car make"
                      onChange={(event) =>
                        handleCarSearchDetailChange(event, "makeIds")
                      }
                      value={carSearchDetail.makeIds ?? -1}
                      onDelete={(value) =>
                        handleDeleteSelectedItem(
                          value,
                          "makeIds",
                          carSearchDetail.makeIds
                        )
                      }
                      itemList={vehicleSearchDropdownData.makesModels}
                      placeholder="Select a make"
                    >
                      <MenuItem value={-1}>
                        <em>Select a make</em>
                      </MenuItem>
                      {vehicleSearchDropdownData.makesModels.length > 0
                        ? vehicleSearchDropdownData.makesModels.map(
                            (item: VehicleMakeData) => (
                              <MenuItem key={item.name} value={item.id}>
                                <ListItemText primary={item.name} />
                                {carSearchDetail.makeIds.indexOf(item.id) >
                                  -1 && <CheckIcon color="action" />}
                              </MenuItem>
                            )
                          )
                        : null}
                    </CustomMultiSelect>
                  </Grid>
                  <Grid item xs={12}>
                    <CustomMultiSelect
                      label="Car model"
                      onChange={(event) =>
                        handleCarSearchDetailChange(event, "modelIds")
                      }
                      value={carSearchDetail.modelIds ?? -1}
                      onDelete={(value) =>
                        handleDeleteSelectedItem(
                          value,
                          "modelIds",
                          carSearchDetail.modelIds
                        )
                      }
                      itemList={modelItems}
                      placeholder="Select a model"
                      disabled={!!carSearchDetail.makeIds?.includes(-1)}
                    >
                      <MenuItem value={-1}>
                        <em>Select a model</em>
                      </MenuItem>
                      {modelItems.map((item: VehicleModelData) => (
                        <MenuItem key={item.name} value={item.id}>
                          <ListItemText
                            primary={`${item.name} (${item.count})`}
                          />
                          {carSearchDetail.modelIds.indexOf(item.id) > -1 && (
                            <CheckIcon color="action" />
                          )}
                        </MenuItem>
                      ))}
                    </CustomMultiSelect>
                  </Grid>
                  <Grid item xs={12}>
                    <CustomSelect
                      label="Distance"
                      onChange={(event) =>
                        handleCarSearchDetailChange(event, "distance")
                      }
                      value={distanceValue}
                      renderValue={(selected) =>
                        selected === -1
                          ? "Select a distance"
                          : `Within ${selected} miles`
                      }
                    >
                      {vehicleSearchDropdownData.distance.map((item) => {
                        return (
                          <MenuItem key={item} value={item}>
                            {`Within ${item} miles`}
                          </MenuItem>
                        );
                      })}
                    </CustomSelect>
                  </Grid>
                  <Grid item xs={12} className="dealer-container">
                    <InputLabel shrink>Dealer</InputLabel>
                    <DealerSearch
                      handleDealerUpdate={handleDealerChange}
                      dealer={dealerForSpecification}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl>
                      <FormControlLabel
                        control={
                          <Checkbox
                            value="Dealer Includes"
                            checked={carSearchDetail.includeDeliveryDealer}
                            onChange={(event) =>
                              handleCarSearchDetailChange(
                                event,
                                "includeDeliveryDealer"
                              )
                            }
                          />
                        }
                        label="Include dealers who deliver"
                      />
                    </FormControl>
                  </Grid>
                  {isAdvanceSearchOpen && (
                    <>
                      <Grid item xs={12}>
                        <CustomInput
                          placeholder="e.g. leather seats"
                          value={carSearchDetail.keywords ?? ""}
                          label="Keywords"
                          onChange={(event) =>
                            handleCarSearchDetailChange(event, "keywords")
                          }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <CustomMultiSelect
                          label="Body type"
                          onChange={(event) =>
                            handleCarSearchDetailChange(event, "bodyIds")
                          }
                          onDelete={(value) =>
                            handleDeleteSelectedItem(
                              value,
                              "bodyIds",
                              carSearchDetail.bodyIds
                            )
                          }
                          value={carSearchDetail.bodyIds ?? -1}
                          itemList={vehicleSearchDropdownData.body}
                          placeholder="Select body types"
                        >
                          <MenuItem value={-1}>
                            <em>Select body types</em>
                          </MenuItem>
                          {vehicleSearchDropdownData.body.map(
                            (item: ItemModel) => (
                              <MenuItem key={item.name} value={item.id}>
                                <ListItemText primary={item.name} />
                                {carSearchDetail.bodyIds.indexOf(item.id) >
                                  -1 && <CheckIcon color="action" />}
                              </MenuItem>
                            )
                          )}
                        </CustomMultiSelect>
                      </Grid>
                      <Grid item xs={12}>
                        <CustomInput
                          placeholder="Enter maximum mileage"
                          value={carSearchDetail.mileageRange?.max ?? ""}
                          label="Maximum mileage"
                          onChange={(event) =>
                            handleCarSearchDetailChange(event, "mileageRange")
                          }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <CustomSelect
                          label="Transmission"
                          onChange={(event) =>
                            handleCarSearchDetailChange(event, "transId")
                          }
                          value={carSearchDetail.transId ?? -1}
                        >
                          <MenuItem value={-1}>
                            <em>Select transmission type</em>
                          </MenuItem>
                          {vehicleSearchDropdownData.trans.map((item) => {
                            return (
                              <MenuItem key={item.name} value={item.id}>
                                {item.name}
                              </MenuItem>
                            );
                          })}
                        </CustomSelect>
                      </Grid>
                      <Grid item xs={12}>
                        <CustomInput
                          placeholder="Enter maximum age"
                          value={carSearchDetail.ageRange?.max ?? ""}
                          label="Maximum age"
                          onChange={(event) =>
                            handleCarSearchDetailChange(event, "ageRange")
                          }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <CustomMultiSelect
                          label="Fuel type"
                          onChange={(event) =>
                            handleCarSearchDetailChange(event, "fuelIds")
                          }
                          value={carSearchDetail.fuelIds ?? -1}
                          onDelete={(value) =>
                            handleDeleteSelectedItem(
                              value,
                              "fuelIds",
                              carSearchDetail.fuelIds
                            )
                          }
                          itemList={vehicleSearchDropdownData.fuel}
                          placeholder="Select fuel type(s)"
                        >
                          <MenuItem value={-1}>
                            <em>Select fuel type(s)</em>
                          </MenuItem>
                          {vehicleSearchDropdownData.fuel.map(
                            (item: ItemModel) => (
                              <MenuItem key={item.name} value={item.id}>
                                <ListItemText primary={item.name} />
                                {carSearchDetail.fuelIds.indexOf(item.id) >
                                  -1 && <CheckIcon color="action" />}
                              </MenuItem>
                            )
                          )}
                        </CustomMultiSelect>
                      </Grid>
                      <Grid item xs={12}>
                        <CustomMultiSelect
                          label="Colour"
                          onChange={(event) =>
                            handleCarSearchDetailChange(event, "colourIds")
                          }
                          value={carSearchDetail.colourIds ?? -1}
                          onDelete={(value) =>
                            handleDeleteSelectedItem(
                              value,
                              "colourIds",
                              carSearchDetail.colourIds
                            )
                          }
                          itemList={vehicleSearchDropdownData.colour}
                          placeholder="Select colour(s)"
                        >
                          <MenuItem value={-1}>
                            <em>Select colour(s)</em>
                          </MenuItem>
                          {vehicleSearchDropdownData.colour.map(
                            (item: ItemModel) => (
                              <MenuItem key={item.name} value={item.id}>
                                <ListItemText primary={item.name} />
                                {carSearchDetail.colourIds.indexOf(item.id) >
                                  -1 && <CheckIcon color="action" />}
                              </MenuItem>
                            )
                          )}
                        </CustomMultiSelect>
                      </Grid>
                      <Grid item xs={12} container>
                        <Grid item xs={12} className="engine-size-label">
                          <InputLabel shrink>Engine Size</InputLabel>
                        </Grid>
                        <Grid item xs={6} className="padding-right">
                          <CustomSelect
                            onChange={(event) =>
                              handleCarSearchDetailChange(event, "engineMin")
                            }
                            value={carSearchDetail.engineMin ?? -1}
                          >
                            <MenuItem value={-1}>
                              <em>
                                {(carSearchDetail.engineMin ?? -1) === -1
                                  ? "From"
                                  : "None"}
                              </em>
                            </MenuItem>
                            {Shared.EngineSizes.map((e, i) => (
                              // eslint-disable-next-line react/no-array-index-key
                              <MenuItem value={e} key={`engineSizes-min-${i}`}>
                                {e}
                              </MenuItem>
                            ))}
                          </CustomSelect>
                        </Grid>
                        <Grid item xs={6} className="padding-left">
                          <CustomSelect
                            onChange={(event) =>
                              handleCarSearchDetailChange(event, "engineMax")
                            }
                            value={carSearchDetail.engineMax ?? -1}
                          >
                            <MenuItem value={-1}>
                              <em>
                                {(carSearchDetail.engineMax ?? -1) === -1
                                  ? "To"
                                  : "None"}
                              </em>
                            </MenuItem>
                            {Shared.EngineSizes.map((e, i) => (
                              // eslint-disable-next-line react/no-array-index-key
                              <MenuItem value={e} key={`engineSizes-max-${i}`}>
                                {e}
                              </MenuItem>
                            ))}
                          </CustomSelect>
                        </Grid>
                        {!isEngineSizeValid && (
                          <FormHelperText error>
                            Engine minimum size must be less than maximum size.
                          </FormHelperText>
                        )}
                      </Grid>
                    </>
                  )}
                </Grid>
                <Grid item xs={7} className="budget-container">
                  <Grid item xs={12} className="budget-type">
                    <FormControl>
                      <RadioGroup
                        row
                        value={budgetSearchType}
                        onChange={(event) =>
                          handleCarSearchDetailChange(event, "budgetSearchType")
                        }
                      >
                        <FormControlLabel
                          value={BudgetType.TotalBudget.toString()}
                          control={<Radio className="total-budget" />}
                          label="Search by Total Price"
                          labelPlacement="end"
                        />
                        <FormControlLabel
                          className="padding-left monthly-budget"
                          value={BudgetType.MonthlyBudget.toString()}
                          control={<Radio />}
                          label="Search by Monthly Price"
                          labelPlacement="end"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} container>
                    <Grid item xs={6} className="padding-right">
                      <Grid item xs={12} className="price-container">
                        {budgetSearchType ===
                          BudgetType.TotalBudget.toString() && (
                          <CustomInput
                            label="Total Price*"
                            placeholder="0.00"
                            value={carSearchDetail.priceMax ?? ""}
                            startAdornment={
                              <InputAdornment position="start">
                                £
                              </InputAdornment>
                            }
                            onChange={(event) =>
                              handleCarSearchDetailChange(event, "priceMax")
                            }
                            errors={
                              errors.priceMax ? [errors.priceMax] : undefined
                            }
                          />
                        )}
                        {budgetSearchType ===
                          BudgetType.MonthlyBudget.toString() && (
                          <CustomInput
                            label="Monthly Budget*"
                            placeholder="0.00"
                            value={carSearchDetail.priceMonthly ?? ""}
                            startAdornment={
                              <InputAdornment position="start">
                                £
                              </InputAdornment>
                            }
                            onChange={(event) =>
                              handleCarSearchDetailChange(event, "priceMonthly")
                            }
                            errors={
                              errors.priceMonthly
                                ? [errors.priceMonthly]
                                : undefined
                            }
                          />
                        )}
                      </Grid>
                      <Grid item xs={12}>
                        <CustomInput
                          label="Part Ex. Value"
                          placeholder="0.00"
                          value={partExchangeValue ?? ""}
                          startAdornment={
                            <InputAdornment position="start">£</InputAdornment>
                          }
                          onChange={(event) =>
                            handleCarSearchDetailChange(
                              event,
                              "partExchangeValue"
                            )
                          }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <CustomInput
                          label="Deposit"
                          placeholder="0.00"
                          value={deposit ?? ""}
                          startAdornment={
                            <InputAdornment position="start">£</InputAdornment>
                          }
                          onChange={(event) =>
                            handleCarSearchDetailChange(event, "deposit")
                          }
                        />
                      </Grid>
                      {budgetSearchType ===
                        BudgetType.MonthlyBudget.toString() && (
                        <Grid item xs={12}>
                          <FormControl className="flexible-budget-control">
                            <FormControlLabel
                              control={
                                <Checkbox
                                  value="Flexible budget"
                                  checked={carSearchDetail.isFlexible}
                                  onChange={(event) =>
                                    handleCarSearchDetailChange(
                                      event,
                                      "isFlexible"
                                    )
                                  }
                                />
                              }
                              label="Flexible budget (+/- £50)"
                            />
                          </FormControl>
                        </Grid>
                      )}
                    </Grid>
                    <Grid item xs={6} className="padding-left">
                      <Grid item xs={12}>
                        <CustomSelect
                          label="Term*"
                          onChange={(event) =>
                            handleCarSearchDetailChange(event, "term")
                          }
                          value={term ?? -1}
                          errors={errors.term ? [errors.term] : undefined}
                        >
                          <MenuItem value={-1}>
                            <em>Select a term</em>
                          </MenuItem>
                          {Shared.termList.map((item) => {
                            return (
                              <MenuItem key={item.name} value={item.id}>
                                {item.name}
                              </MenuItem>
                            );
                          })}
                        </CustomSelect>
                      </Grid>
                      <Grid item xs={12}>
                        <CustomInput
                          label="Part Ex. Settlement"
                          value={partExchangeSettlement ?? ""}
                          placeholder="0.00"
                          startAdornment={
                            <InputAdornment position="start">£</InputAdornment>
                          }
                          onChange={(event) =>
                            handleCarSearchDetailChange(
                              event,
                              "partExchangeSettlement"
                            )
                          }
                        />
                      </Grid>
                    </Grid>
                    {exceededAmount > 0 && (
                      <div className="custom-snackbar">
                        <CustomSnackbar
                          message={`This exceeds the customer's maximum borrow amount by ${Shared.getFormattedCurrencyValue(
                            exceededAmount
                          )}.`}
                          type="error"
                        />
                      </div>
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <div className="text-align-right">
                <Button
                  className="link"
                  onClick={handleAdvanceSearchToggle}
                  color="inherit"
                  disableRipple
                >
                  {isAdvanceSearchOpen ? "Simple search" : "Advanced search"}
                </Button>
              </div>
            </div>
          ) : (
            searchByVRMForm
          )}
          <Grid container className="margin-top">
            <Grid item xs={6}>
              <Button
                className="link"
                onClick={handleSearchByToggle}
                color="inherit"
                disableRipple
              >
                {isSearchByVRM ? "Search by specification" : "Search by VRM"}
              </Button>
            </Grid>
            <Grid item xs={6} className="text-align-right">
              <Button
                variant="contained"
                size="large"
                color="secondary"
                onClick={handleSearchCar}
                className="search-btn"
              >
                <Icon className="search-icon" fontSize="small">
                  search
                </Icon>
                {`Search${isSearchByVRM ? " by VRM" : ""}`}
              </Button>
            </Grid>
          </Grid>
        </>
      ) : (
        carSearchReadonlyView
      )}
    </CarSearchCriteriaStyles>
  );
};

export default CarSearchCriteria;
