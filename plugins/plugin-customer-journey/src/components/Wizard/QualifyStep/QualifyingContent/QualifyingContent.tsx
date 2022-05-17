import React, { useEffect, useMemo, useState } from "react";
import { v4 } from "uuid";

import {
  CustomInput,
  CustomSelect,
  CustomSnackbar,
  Shared,
  ThreeStateToggle,
  CalculatorIcon,
} from "@common/components";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Grid,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputAdornment from "@material-ui/core/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Typography from "@material-ui/core/Typography";

import { LoanCalculatorType } from "../../../../common/enum";
import {
  calculateCostOfCredit,
  calculateMonthlyFromTotalAmount,
  calculateTotalAmountFromMonthly,
} from "../../../../helpers/utility";
import { QualifyDetailModel } from "../../../../models/QualifyDetailModel";
import { ReasonForCarPurchaseItemModel } from "../../../../models/ReasonForCarPurchaseItemModel";
import { TimeForPurchaseItemModel } from "../../../../models/TimeForPurchaseModel";
import { WhereDidYouHearItemModel } from "../../../../models/WhereDidYouHearItemModel";
import { QualifyingContentProps } from "./QualifyingContent.Props";
import { QualifyingContentStyles } from "./QualifyingContent.Styles";

const QualifyingContent: React.FC<QualifyingContentProps> = (props) => {
  const {
    qualifyingDetail,
    updateQualifyingDetails,
    errors,
    setTerm,
    term,
    amountToFinance,
    monthlyBudget,
    preferredLender,
    reasonForPurchaseItems,
    timeForPurchaseItems,
    whereDidYouHearItems,
    monthlyIncome,
  } = props;

  const [reasonForPurchaseId, setReasonForPurchaseId] = useState<number>(
    qualifyingDetail.reasonForPurchase?.id || -1
  );
  const reasonForPurchase: ReasonForCarPurchaseItemModel | null =
    useMemo(() => {
      return (
        reasonForPurchaseItems.find((r) => r.id === reasonForPurchaseId) ?? null
      );
    }, [reasonForPurchaseItems, reasonForPurchaseId]);
  useEffect(() => {
    setReasonForPurchaseId(qualifyingDetail.reasonForPurchase?.id || -1);
  }, [qualifyingDetail.reasonForPurchase?.id]);
  useEffect(() => {
    updateQualifyingDetails("reasonForPurchase", reasonForPurchase);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reasonForPurchase]);

  const [timeForPurchaseId, setTimeForPurchaseId] = useState<number>(
    qualifyingDetail.timeForPurchase?.id || -1
  );
  const timeForPurchase: TimeForPurchaseItemModel | null = useMemo(() => {
    return timeForPurchaseItems.find((t) => t.id === timeForPurchaseId) ?? null;
  }, [timeForPurchaseItems, timeForPurchaseId]);
  useEffect(() => {
    setTimeForPurchaseId(qualifyingDetail.timeForPurchase?.id || -1);
  }, [qualifyingDetail.timeForPurchase?.id]);
  useEffect(() => {
    updateQualifyingDetails("timeForPurchase", timeForPurchase);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeForPurchase]);

  const [whereDidYouHearId, setWhereDidYouHearId] = useState<number>(
    qualifyingDetail.whereDidYouHear?.id || -1
  );
  const whereDidYouHear: WhereDidYouHearItemModel | null = useMemo(() => {
    return whereDidYouHearItems.find((w) => w.id === whereDidYouHearId) ?? null;
  }, [whereDidYouHearItems, whereDidYouHearId]);
  useEffect(() => {
    setWhereDidYouHearId(qualifyingDetail.whereDidYouHear?.id || -1);
  }, [qualifyingDetail.whereDidYouHear?.id]);
  useEffect(() => {
    updateQualifyingDetails("whereDidYouHear", whereDidYouHear);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [whereDidYouHear]);
  const [isLoanCalculatorExpanded, setIsLoanCalculatorExpanded] =
    useState<boolean>(false);

  const onDropDownChange =
    (key: keyof QualifyDetailModel) =>
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      if (key === "reasonForPurchase") {
        setReasonForPurchaseId(Number(event.target.value) || -1);
      }
      if (key === "timeForPurchase") {
        setTimeForPurchaseId(Number(event.target.value) || -1);
      }
      if (key === "whereDidYouHear") {
        setWhereDidYouHearId(Number(event.target.value) || -1);
      }
    };
  const [selectOptionForLoanCalculator, setSelectOptionForLoanCalculator] =
    useState<string>(LoanCalculatorType[LoanCalculatorType.MonthlyRepayment]);
  const handleSelectOptionForLoanCalculator = (
    // eslint-disable-next-line @typescript-eslint/ban-types
    event: React.ChangeEvent<{}>,
    value: string
  ) => {
    setSelectOptionForLoanCalculator(value);
  };

  const onThreeWaySwitchChange =
    (key: keyof QualifyDetailModel) => (value: boolean | null) => {
      updateQualifyingDetails(key, value);
    };

  const onTermChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTerm(Number(event.target.value) || -1);
  };

  const [monthlyRepayment, setMonthlyRepayment] = useState(
    (monthlyBudget || 0).toString()
  );
  const onMonthlyRepaymentChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMonthlyRepayment(event.target.value);
  };

  const [amount, setAmount] = useState<string>(
    (amountToFinance || 0).toString()
  );

  useEffect(() => {
    setAmount((monthlyBudget || 0).toString());
  }, [monthlyBudget]);

  const onAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };
  useEffect(() => {
    setAmount((amountToFinance || 0).toString());
  }, [amountToFinance]);

  const [apr, setApr] = useState((preferredLender?.apr || 0).toString());
  const onAPRChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApr(event.target.value);
  };
  useEffect(() => {
    setApr((preferredLender?.apr || 0).toString());
  }, [preferredLender?.apr]);

  const totalLoanAmount = useMemo(() => {
    if (Number(monthlyRepayment) > 0 && (term || 0) > 0 && Number(apr) > 0) {
      return calculateTotalAmountFromMonthly(
        Number(monthlyRepayment),
        term || 0,
        Number(apr)
      );
    }
    return 0;
  }, [monthlyRepayment, term, apr]);

  const totalMonthlyRepayment = useMemo(() => {
    if (Number(amount) > 0 && (term || 0) > 0 && Number(apr) > 0) {
      return calculateMonthlyFromTotalAmount(
        Number(amount),
        term || 0,
        Number(apr)
      );
    }
    return 0;
  }, [amount, term, apr]);

  const maxLendAmount = useMemo(() => {
    return preferredLender?.maxLendAmount || null;
  }, [preferredLender?.maxLendAmount]);

  const costOfCredit = useMemo(() => {
    if ((term || 0) > 0 && Number(apr) > 0) {
      if (
        selectOptionForLoanCalculator ===
        LoanCalculatorType[LoanCalculatorType.MonthlyRepayment]
      ) {
        return calculateCostOfCredit(totalLoanAmount, term || 0, Number(apr));
      }
      return calculateCostOfCredit(Number(amount), term || 0, Number(apr));
    }
    return 0;
  }, [totalLoanAmount, amount, term, apr, selectOptionForLoanCalculator]);

  const totalAmountRepayable = useMemo(() => {
    if (
      selectOptionForLoanCalculator ===
      LoanCalculatorType[LoanCalculatorType.MonthlyRepayment]
    ) {
      return totalLoanAmount + costOfCredit;
    }
    return Number(amount) + costOfCredit;
  }, [costOfCredit, amount, totalLoanAmount, selectOptionForLoanCalculator]);

  return (
    <QualifyingContentStyles>
      <Grid item xs={12}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={8}
        >
          <Grid item xs={12}>
            <Typography
              component="h6"
              variant="h6"
              className="headers"
              id="please-confirm-header"
            >
              Please confirm below details
            </Typography>
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
                  Does the customer have a valid full UK driving license?
                </Typography>
                {errors.drivingLicenseConfirmed?.map((e) => (
                  <FormHelperText error key={v4()}>
                    {e}
                  </FormHelperText>
                ))}
              </Grid>
              <Grid item>
                <ThreeStateToggle
                  checked={qualifyingDetail.drivingLicenseConfirmed}
                  onChange={onThreeWaySwitchChange("drivingLicenseConfirmed")}
                />
              </Grid>
              {process.env.REACT_APP_AGENT_GUIDE_FOR_LICENSE &&
                qualifyingDetail.drivingLicenseConfirmed === false && (
                  <Grid item xs={12}>
                    <CustomSnackbar
                      message={process.env.REACT_APP_AGENT_GUIDE_FOR_LICENSE}
                      type="default"
                    />
                  </Grid>
                )}
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
                <Typography component="p" variant="caption">
                  Is the address on the customer&apos;s driving licence on this
                  application?
                </Typography>
                {errors.addressConfirmed?.map((e) => (
                  <FormHelperText error key={v4()}>
                    {e}
                  </FormHelperText>
                ))}
              </Grid>
              <Grid item>
                <ThreeStateToggle
                  checked={qualifyingDetail.addressConfirmed}
                  onChange={onThreeWaySwitchChange("addressConfirmed")}
                />
              </Grid>
              {process.env.REACT_APP_AGENT_GUIDE_FOR_ADDRESS &&
                qualifyingDetail.addressConfirmed === false && (
                  <Grid item xs={12}>
                    <CustomSnackbar
                      message={process.env.REACT_APP_AGENT_GUIDE_FOR_ADDRESS}
                      type="default"
                    />
                  </Grid>
                )}
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
                  className="income-text"
                >
                  {`Is the customer's monthly net income ${Shared.getFormattedCurrencyValue(
                    monthlyIncome
                  )}?`}
                </Typography>
                {errors.incomeConfirmed?.map((e) => (
                  <FormHelperText error key={v4()}>
                    {e}
                  </FormHelperText>
                ))}
              </Grid>
              <Grid item>
                <ThreeStateToggle
                  checked={qualifyingDetail.incomeConfirmed}
                  onChange={onThreeWaySwitchChange("incomeConfirmed")}
                />
              </Grid>
              {process.env.REACT_APP_AGENT_GUIDE_FOR_INCOME &&
                qualifyingDetail.incomeConfirmed === false && (
                  <Grid item xs={12}>
                    <CustomSnackbar
                      message={process.env.REACT_APP_AGENT_GUIDE_FOR_INCOME}
                      type="default"
                    />
                  </Grid>
                )}
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
                <Typography component="p" variant="caption">
                  Is the customer employed full-time?
                </Typography>
                {errors.placeOfWorkConfirmed?.map((e) => (
                  <FormHelperText error key={v4()}>
                    {e}
                  </FormHelperText>
                ))}
              </Grid>
              <Grid item>
                <ThreeStateToggle
                  checked={qualifyingDetail.placeOfWorkConfirmed}
                  onChange={onThreeWaySwitchChange("placeOfWorkConfirmed")}
                />
              </Grid>
              {process.env.REACT_APP_AGENT_GUIDE_FOR_EMPLOYMENT &&
                qualifyingDetail.placeOfWorkConfirmed === false && (
                  <Grid item xs={12}>
                    <CustomSnackbar
                      message={process.env.REACT_APP_AGENT_GUIDE_FOR_EMPLOYMENT}
                      type="default"
                    />
                  </Grid>
                )}
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
                <Typography component="p" variant="caption">
                  Reason for car purchase?
                </Typography>
              </Grid>
              <Grid item>
                <CustomSelect
                  onChange={onDropDownChange("reasonForPurchase")}
                  value={reasonForPurchaseId}
                  errors={errors.reasonForPurchase}
                  classes={{
                    formControl: "custom-width-select",
                    label: "input-label",
                  }}
                >
                  <MenuItem value={-1}>
                    <em>Select reason</em>
                  </MenuItem>
                  {reasonForPurchaseItems.map((item) => (
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
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              spacing={8}
            >
              <Grid item>
                <Typography component="p" variant="caption">
                  Time for purchase?
                </Typography>
              </Grid>
              <Grid item>
                <CustomSelect
                  onChange={onDropDownChange("timeForPurchase")}
                  value={timeForPurchaseId}
                  errors={errors.timeForPurchase}
                  classes={{
                    formControl: "custom-width-select",
                    label: "input-label",
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
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              spacing={8}
            >
              <Grid item>
                <Typography component="p" variant="caption">
                  How did they hear about us?
                </Typography>
              </Grid>
              <Grid item>
                <CustomSelect
                  onChange={onDropDownChange("whereDidYouHear")}
                  value={whereDidYouHearId}
                  errors={errors.whereDidYouHear}
                  classes={{
                    formControl: "custom-width-select",
                    label: "input-label",
                  }}
                >
                  <MenuItem value={-1}>
                    <em>Select option</em>
                  </MenuItem>
                  {whereDidYouHearItems.map((item) => (
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
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              spacing={8}
            >
              <Grid item>
                <Typography component="p" variant="caption">
                  Has the customer already found a car?
                </Typography>
                {errors.hasCustomerAlreadyFoundCar?.map((e) => (
                  <FormHelperText error key={v4()}>
                    {e}
                  </FormHelperText>
                ))}
              </Grid>
              <Grid item>
                <ThreeStateToggle
                  checked={qualifyingDetail.hasCustomerAlreadyFoundCar}
                  onChange={onThreeWaySwitchChange(
                    "hasCustomerAlreadyFoundCar"
                  )}
                />
              </Grid>
              {process.env.REACT_APP_AGENT_GUIDE_FOR_ALREADY_FOUND_CAR &&
                qualifyingDetail.hasCustomerAlreadyFoundCar && (
                  <Grid item xs={12}>
                    <CustomSnackbar
                      message={
                        process.env.REACT_APP_AGENT_GUIDE_FOR_ALREADY_FOUND_CAR
                      }
                      type="info"
                    />
                  </Grid>
                )}
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
              <Grid item xs={12} className="loan-calculator-container">
                <ExpansionPanel
                  expanded={isLoanCalculatorExpanded}
                  onChange={() =>
                    setIsLoanCalculatorExpanded(!isLoanCalculatorExpanded)
                  }
                >
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    className="expansion-panel-summary"
                  >
                    <Typography component="h6" variant="h6">
                      <CalculatorIcon opacity="0.8" />
                      <span>Loan Calculator</span>
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className="expansion-panel-details">
                    <Grid item xs={6}>
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <RadioGroup
                            value={selectOptionForLoanCalculator}
                            onChange={handleSelectOptionForLoanCalculator}
                            className="radio-group"
                            row
                          >
                            <FormControlLabel
                              value={
                                LoanCalculatorType[
                                  LoanCalculatorType.MonthlyRepayment
                                ]
                              }
                              control={
                                <Radio
                                  color="secondary"
                                  className="radio-btn"
                                />
                              }
                              label="Monthly repayment"
                              labelPlacement="end"
                            />
                            <FormControlLabel
                              value={
                                LoanCalculatorType[
                                  LoanCalculatorType.LoanAmount
                                ]
                              }
                              control={
                                <Radio
                                  color="secondary"
                                  className="radio-btn"
                                />
                              }
                              label="Loan amount"
                              labelPlacement="end"
                            />
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} className="amount-grid">
                        {selectOptionForLoanCalculator ===
                        LoanCalculatorType[
                          LoanCalculatorType.MonthlyRepayment
                        ] ? (
                          <CustomInput
                            label="Monthly Repayment"
                            value={monthlyRepayment}
                            onChange={onMonthlyRepaymentChange}
                            startAdornment={
                              <InputAdornment position="start">
                                &pound;
                              </InputAdornment>
                            }
                            errors={errors.monthlyBudgetAmount}
                            classes={{
                              formControl: "custom-input",
                              label: "input-label",
                            }}
                          />
                        ) : (
                          <CustomInput
                            label="Loan Amount"
                            value={amount}
                            onChange={onAmountChange}
                            startAdornment={
                              <InputAdornment position="start">
                                &pound;
                              </InputAdornment>
                            }
                            classes={{
                              formControl: "custom-input",
                              label: "input-label",
                            }}
                          />
                        )}
                        <CustomSelect
                          label="Term"
                          onChange={onTermChange}
                          value={term || -1}
                          errors={errors.term}
                          classes={{
                            formControl: "custom-input",
                            label: "input-label",
                          }}
                        >
                          <MenuItem value={-1}>Select a term</MenuItem>
                          {Shared.termList.map((item) => (
                            <MenuItem key={v4()} value={item.id}>
                              {item.name}
                            </MenuItem>
                          ))}
                        </CustomSelect>
                        <CustomInput
                          label="APR"
                          value={apr}
                          onChange={onAPRChange}
                          endAdornment={
                            <InputAdornment position="end">%</InputAdornment>
                          }
                          errors={errors.apr}
                          classes={{
                            formControl: "custom-input",
                            label: "input-label",
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Grid
                          container
                          direction="row"
                          justify="space-between"
                          alignItems="center"
                          spacing={8}
                        >
                          <Grid item xs={6}>
                            {selectOptionForLoanCalculator ===
                            LoanCalculatorType[
                              LoanCalculatorType.MonthlyRepayment
                            ] ? (
                              <>
                                <Typography
                                  component="p"
                                  className="result-label"
                                >
                                  Loan amount
                                </Typography>
                                <Typography
                                  component="p"
                                  className="result-value"
                                  color={
                                    maxLendAmount &&
                                    totalLoanAmount > maxLendAmount
                                      ? "error"
                                      : "default"
                                  }
                                >
                                  {totalLoanAmount > 0
                                    ? Shared.getFormattedCurrencyValue(
                                        totalLoanAmount
                                      )
                                    : "--"}
                                </Typography>
                              </>
                            ) : (
                              <>
                                <Typography
                                  component="p"
                                  className="result-label"
                                >
                                  Monthly repayment
                                </Typography>
                                <Typography
                                  component="p"
                                  className="result-value"
                                >
                                  {totalMonthlyRepayment > 0
                                    ? Shared.getFormattedCurrencyValue(
                                        totalMonthlyRepayment
                                      )
                                    : "--"}
                                </Typography>
                              </>
                            )}
                          </Grid>
                          <Grid item xs={6}>
                            <Typography component="p" className="result-label">
                              Total cost of credit
                            </Typography>
                            <Typography component="p" className="result-value">
                              {costOfCredit > 0
                                ? Shared.getFormattedCurrencyValue(costOfCredit)
                                : "--"}
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography component="p" className="result-label">
                              Total amount repayable
                            </Typography>
                            <Typography component="p" className="result-value">
                              {totalAmountRepayable > 0
                                ? Shared.getFormattedCurrencyValue(
                                    totalAmountRepayable
                                  )
                                : "--"}
                            </Typography>
                          </Grid>
                          {selectOptionForLoanCalculator ===
                            LoanCalculatorType[
                              LoanCalculatorType.MonthlyRepayment
                            ] &&
                          maxLendAmount &&
                          totalLoanAmount > maxLendAmount ? (
                            <Grid
                              item
                              xs={12}
                              className="custom-snackbar-container"
                            >
                              <CustomSnackbar
                                message={`This exceeds customer's maximum borrow amount by ${Shared.getFormattedCurrencyValue(
                                  totalLoanAmount - maxLendAmount
                                )}`}
                                type="error"
                                classes={{
                                  error: "loan-calculator-error",
                                }}
                              />
                            </Grid>
                          ) : null}

                          {selectOptionForLoanCalculator ===
                            LoanCalculatorType[LoanCalculatorType.LoanAmount] &&
                          maxLendAmount &&
                          Number(amount) > maxLendAmount ? (
                            <Grid
                              item
                              xs={12}
                              className="custom-snackbar-container"
                            >
                              <CustomSnackbar
                                message={`This exceeds customer's maximum borrow amount by ${Shared.getFormattedCurrencyValue(
                                  Number(amount) - maxLendAmount
                                )}`}
                                type="error"
                                classes={{
                                  error: "loan-calculator-error",
                                }}
                              />
                            </Grid>
                          ) : null}
                        </Grid>
                      </Grid>
                    </Grid>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </QualifyingContentStyles>
  );
};

export default QualifyingContent;
