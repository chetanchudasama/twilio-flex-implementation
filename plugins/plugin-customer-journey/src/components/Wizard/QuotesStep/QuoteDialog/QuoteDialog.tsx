import {
  CustomInput,
  CustomSelect,
  ResponsiveDialog,
  Shared,
  CustomSnackbar,
} from "@common/components";
import {
  Checkbox,
  Grid,
  Icon,
  InputAdornment,
  MenuItem,
  Tooltip,
} from "@material-ui/core";
import { Manager } from "@twilio/flex-ui";
import React, { useMemo, useState, useEffect } from "react";
import { VehicleExtraModel } from "models/VehicleExtraModel";
import { QuoteRequestModel } from "../../../../models/QuoteRequestModel";
import { showErrorMessage } from "../../../../Notifications";
import { useApplicationService } from "../../../../services/application.service";
import { AppState } from "../../../../states";
import CarDealerInformation from "../../../CarDealerInformation/CarDealerInformation.Container";
import { PartExchangeConcertina } from "../../../PartExchangeConcertina/PartExchangeConcertina";
import { VehicleImage } from "../../../VehicleImage/VehicleImage";
import { DispatchToProps, StateToProps } from "./QuoteDialog.Props";
import QuoteSavedDialog from "../QuoteSavedDialog/QuoteSavedDialog";
import { QuoteDialogStyles } from "./QuoteDialog.Styles";
import { QuoteDetailModel } from "../../../../models/QuoteDetailModel";
import { useVehicleService } from "../../../../services/vehicle.service";

import {
  getTotalAmountForQuote,
  getMonthlyPaymentForQuote,
  getTotalCreditAmountForQuote,
} from "../../../../helpers/utility";
import { DealerStateType } from "../../../../common/enum";
import { CarRegisteredSnackbar } from "../../../CarRegisteredSnackbar/CarRegisteredSnackbar";
import { DealerStateSnackbar } from "../../../DealerStateSnackbar/DealerStateSnackbar";

interface OwnProps {
  open: boolean;
  quoteDetail: QuoteDetailModel;
  handleCloseDialog: () => void;
}

export type QuoteDialogProps = OwnProps & StateToProps & DispatchToProps;

const QuoteDialog: React.FC<QuoteDialogProps> = ({
  open,
  quoteDetail,
  applicationId,
  handleCloseDialog,
  saveQuote,
  lenderId,
  apr,
  maxLendAmount,
  lenderName,
  setVehicleExtraItemList,
  vehicleExtraItemList,
}) => {
  const state: AppState = Manager.getInstance().store.getState();

  const token: string = useMemo(() => {
    return state.flex.session.ssoTokenPayload.token ?? "";
  }, [state.flex.session.ssoTokenPayload]);

  const phoenixToken: string = useMemo(() => {
    return state.crm?.crmState?.phoenixToken ?? "";
  }, [state.crm?.crmState?.phoenixToken]);

  const applicationService = useApplicationService(token);
  const vehicleService = useVehicleService(token, phoenixToken);

  const [showSavedQuoteDialog, setShowSavedQuoteDialog] = useState(false);
  const [quoteRequestModel, setQuoteRequestModel] = React.useState(
    new QuoteRequestModel()
  );
  const [aprValue, setAPRValue] = useState(apr);
  const [paintProtectionValue, setPaintProtectionValue] =
    useState<VehicleExtraModel | null>(quoteDetail.vehicleExtras);
  const [includePaintProtection, setIncludePaintProtection] = useState<boolean>(
    !!quoteDetail.vehicleExtras
  );

  useEffect(() => {
    // get vehicle extra item list
    if (vehicleExtraItemList.length === 0) {
      vehicleService
        .getVehicleExtraItemList()
        .then((response) => {
          setVehicleExtraItemList(response);
        })
        .catch(() => {
          showErrorMessage(
            "Error loading vehicle extra items, please try again!",
            "",
            true
          );
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setVehicleExtraItemList, vehicleExtraItemList.length]);

  useEffect(() => {
    // assign quote detail to quote request detail
    const newQuoteRequestModel = new QuoteRequestModel(quoteDetail);
    if (!quoteDetail.quoteId) {
      newQuoteRequestModel.applicationId = applicationId;
      newQuoteRequestModel.lenderId = lenderId;
    }
    setQuoteRequestModel(newQuoteRequestModel);
  }, [applicationId, lenderId, quoteDetail]);

  const carMakeModel = Shared.getFormattedText(
    [quoteDetail.make, quoteDetail.model],
    " | "
  );

  const handleQuoteDetailChange = (event: any, propertyName: string) => {
    const { value } = event.target;
    if (
      propertyName === "deposit" ||
      propertyName === "partExchangeValue" ||
      propertyName === "partExchangeSettlement"
    ) {
      if (Shared.isNumericValue(value) || value === "") {
        setQuoteRequestModel({
          ...quoteRequestModel,
          [propertyName]: value,
        });
      }
    } else if (propertyName === "aprValue") {
      if (value === "" || Shared.validatePercentageValue(value)) {
        setAPRValue(value);
      }
    } else {
      setQuoteRequestModel({
        ...quoteRequestModel,
        [propertyName]: value,
      });
    }
  };

  const totalAmount = useMemo(() => {
    const amount = getTotalAmountForQuote(
      quoteDetail.price,
      Number(quoteRequestModel.deposit) ?? 0,
      Number(quoteRequestModel.partExchangeSettlement) ?? 0,
      includePaintProtection ? Number(paintProtectionValue?.price) : 0
    );
    return amount > 0 ? amount : 0;
  }, [
    includePaintProtection,
    quoteDetail.price,
    quoteRequestModel.deposit,
    quoteRequestModel.partExchangeSettlement,
    paintProtectionValue?.price,
  ]);

  const totalPayableAmount = useMemo(() => {
    const amount = getTotalCreditAmountForQuote(
      totalAmount,
      Number(quoteRequestModel.term),
      Number(aprValue) ?? 0
    );
    return amount > 0 ? amount + totalAmount : 0;
  }, [aprValue, totalAmount, quoteRequestModel.term]);

  const monthlyPaymentAmount = useMemo(() => {
    const amount = getMonthlyPaymentForQuote(
      totalAmount,
      Number(quoteRequestModel.term),
      Number(aprValue) ?? 0
    );
    return amount > 0 ? amount : 0;
  }, [aprValue, totalAmount, quoteRequestModel.term]);

  const handleVehicleExtraItemChange = (value: number) => {
    const vehicleExtraItem = vehicleExtraItemList.find(
      (item: VehicleExtraModel) => item.vehicleExtraOptionId === value
    );
    setPaintProtectionValue(vehicleExtraItem || null);
  };

  const handleCreateQuote = async () => {
    // type cast to number
    const quoteRequestDetail = {
      ...quoteRequestModel,
      deposit: Number(quoteRequestModel.deposit),
      partExchangeValue: Number(quoteRequestModel.partExchangeValue),
      partExchangeSettlement: Number(quoteRequestModel.partExchangeSettlement),
      amountToFinance: totalAmount,
      monthlyPayment: monthlyPaymentAmount,
      totalAmountPayable: totalPayableAmount,
      vehicleExtras: includePaintProtection ? paintProtectionValue : null,
    };
    await applicationService
      .createQuote(quoteRequestDetail)
      .then((response) => {
        // save quote in redux store
        saveQuote(response);
        setShowSavedQuoteDialog(true);
      })
      .catch((error) => {
        showErrorMessage("Something went wrong, please try again!", "", true);
      });
  };

  const dealerInfo = useMemo(() => {
    if (
      quoteDetail.dealer.state &&
      quoteDetail.dealer.state !== DealerStateType.Approved
    ) {
      return quoteDetail.dealer;
    }
    return null;
  }, [quoteDetail.dealer]);

  return (
    <>
      <ResponsiveDialog
        title={quoteDetail.quoteId ? "Edit Quote" : "Create Quote"}
        open={open}
        onCancel={handleCloseDialog}
        onConfirm={handleCreateQuote}
        maxWidth="md"
        showActionButtons
        cancelText="Cancel"
        okText="Save Quote"
      >
        <QuoteDialogStyles>
          <>
            <Grid container>
              <Grid item xs={5} className="quote-image-container">
                <VehicleImage
                  image={quoteDetail.images[0]}
                  imageList={quoteDetail.images}
                  showImageCount={false}
                />
              </Grid>
              <Grid item xs={7} className="quote-description-container">
                <Grid item xs={12}>
                  <div className="price-field">
                    {Shared.getFormattedCurrencyValue(quoteDetail.price)}
                  </div>
                </Grid>
                <Grid item xs={12} className="car-model">
                  {carMakeModel}
                </Grid>
                <Grid item xs={12}>
                  <ul className="car-specification">
                    <li>
                      {`${Shared.getFormattedNumber(
                        quoteDetail.mileage
                      )} miles`}
                    </li>
                    <li>{quoteDetail.regNumber}</li>
                    <li>{quoteDetail.regYear}</li>
                    <li>{quoteDetail.trans}</li>
                    <li>{quoteDetail.fuel}</li>
                  </ul>
                </Grid>
                <CarDealerInformation
                  dealerInfo={quoteDetail.dealer!}
                  distance={quoteDetail.distance!}
                />
              </Grid>
            </Grid>
            <Grid container className="quote-configuration">
              <Grid item xs={12} className="bold-text">
                Vehicle details
              </Grid>
              <Grid container item xs={12} className="item-container">
                <Grid item xs={8} className="padding-top">
                  Confirm vehicle mileage
                </Grid>
                <Grid item xs={4} className="text-align-right">
                  <Grid item xs={12} className="text-input">
                    <CustomInput
                      label=""
                      onChange={() => {}}
                      disabled
                      endAdornment={
                        <InputAdornment position="end">km</InputAdornment>
                      }
                      value={Shared.getFormattedNumber(quoteDetail.mileage)}
                      placeholder="0"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid container className="padding-bottom">
                <Grid item xs={8} className="padding-top">
                  Vehicle price
                </Grid>
                <Grid item xs={4} className="text-align-right">
                  <Grid item xs={12} className="text-input">
                    <CustomInput
                      label=""
                      onChange={() => {}}
                      disabled
                      startAdornment={
                        <InputAdornment position="start">
                          &pound;
                        </InputAdornment>
                      }
                      value={Shared.getFormattedNumber(quoteDetail.price)}
                      placeholder="0"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} className="bold-text">
                Dealer details
              </Grid>
              <Grid container className="dealer-container">
                <Grid item xs={8}>
                  Dealer name
                </Grid>
                <Grid item xs={4} className="text-align-right">
                  {quoteDetail.dealer.dealerName}
                </Grid>
              </Grid>
              {(quoteDetail.is247Cars
                ? quoteDetail.dealer.state === DealerStateType.Approved
                : true) && (
                <Grid item xs={12} className="warning-container">
                  <CarRegisteredSnackbar is247Cars={quoteDetail.is247Cars} />
                </Grid>
              )}
              {dealerInfo && (
                <Grid container className="warning-container">
                  <DealerStateSnackbar
                    dealerState={dealerInfo.state}
                    declinedDate={dealerInfo.declinedDate}
                    reasonForDeclined={dealerInfo.declinedReason ?? ""}
                  />
                </Grid>
              )}
              <Grid container item xs={12} className="item-container">
                <Grid item xs={12} className="bold-text padding-top">
                  Finance and P/Ex
                </Grid>
                <Grid item xs={8} className="padding-top">
                  Deposit
                </Grid>
                <Grid item xs={4} className="text-align-right">
                  <Grid item xs={12} className="text-input">
                    <CustomInput
                      label=""
                      onChange={(event) =>
                        handleQuoteDetailChange(event, "deposit")
                      }
                      startAdornment={
                        <InputAdornment position="start">
                          &pound;
                        </InputAdornment>
                      }
                      value={quoteRequestModel.deposit}
                      placeholder="0"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid container item xs={12} className="item-container">
                <Grid item xs={8} className="padding-top">
                  PX value
                </Grid>
                <Grid item xs={4} className="text-align-right">
                  <Grid item xs={12} className="text-input">
                    <CustomInput
                      label=""
                      onChange={(event) =>
                        handleQuoteDetailChange(event, "partExchangeValue")
                      }
                      startAdornment={
                        <InputAdornment position="start">
                          &pound;
                        </InputAdornment>
                      }
                      value={quoteRequestModel.partExchangeValue ?? ""}
                      placeholder="0"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid container item xs={12}>
                <Grid item xs={8} className="padding-top">
                  PX settlement
                </Grid>
                <Grid item xs={4} className="text-align-right">
                  <Grid item xs={12} className="text-input">
                    <CustomInput
                      label=""
                      onChange={(event) =>
                        handleQuoteDetailChange(event, "partExchangeSettlement")
                      }
                      startAdornment={
                        <InputAdornment position="start">
                          &pound;
                        </InputAdornment>
                      }
                      value={quoteRequestModel.partExchangeSettlement ?? ""}
                      placeholder="0"
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} className="panel-container">
                  <PartExchangeConcertina
                    partExchangeRegistration={
                      quoteRequestModel.partExchangeRegistration
                    }
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} className="bold-text padding-top">
                Paint Protection
              </Grid>
              <Grid container item xs={12} className="item-container">
                <Grid item xs={8} className="padding-top">
                  Paint protection?
                  <Tooltip title="This is paint protection" placement="right">
                    <Icon className="info-icon-position">info</Icon>
                  </Tooltip>
                </Grid>
                <Grid item xs={4} className="text-align-right">
                  <Grid item xs={12} className="custom-select">
                    <CustomSelect
                      value={paintProtectionValue?.vehicleExtraOptionId || -1}
                      onChange={(event) =>
                        handleVehicleExtraItemChange(Number(event.target.value))
                      }
                    >
                      <MenuItem value={-1}>
                        <em>Select Value</em>
                      </MenuItem>
                      {vehicleExtraItemList.map((item: VehicleExtraModel) => {
                        return (
                          <MenuItem
                            key={item.vehicleExtraTypeName}
                            value={item.vehicleExtraOptionId}
                          >
                            {`${
                              item.vehicleExtraTypeName
                            } (${Shared.getFormattedCurrencyValue(
                              item.price
                            )})`}
                          </MenuItem>
                        );
                      })}
                    </CustomSelect>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container item xs={12} className="quote-item-container">
                <Grid item xs={8}>
                  Include in monthly payments
                </Grid>
                <Grid item xs={4} className="text-align-right">
                  (+
                  {Shared.getFormattedCurrencyValue(
                    (paintProtectionValue?.price ?? 0) / quoteRequestModel.term
                  )}
                  /mo)
                  <Checkbox
                    checked={includePaintProtection}
                    className="checkbox"
                    disabled={
                      !(paintProtectionValue && paintProtectionValue.price > 0)
                    }
                    onChange={(event) => {
                      setIncludePaintProtection(event.target.checked);
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} container className="balance-to-finance">
                <Grid container item xs={12} className="quote-item-container">
                  <Grid item xs={8} className="bold-text">
                    Balance to finance
                  </Grid>
                  <Grid item xs={4} className="text-align-right bold-text">
                    {Shared.getFormattedCurrencyValue(totalAmount)}
                  </Grid>
                </Grid>
                <Grid container item xs={12} className="item-container">
                  <Grid item xs={8} className="padding-top">
                    Term
                  </Grid>
                  <Grid item xs={4} className="text-align-right">
                    <Grid item xs={12} className="custom-select">
                      <CustomSelect
                        value={quoteRequestModel.term || 36}
                        onChange={(event) =>
                          handleQuoteDetailChange(event, "term")
                        }
                        label=""
                      >
                        {Shared.termList.map((item) => {
                          return (
                            <MenuItem key={item.name} value={item.id}>
                              {item.name}
                            </MenuItem>
                          );
                        })}
                      </CustomSelect>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container item xs={12} className="item-container">
                  <Grid item xs={8} className="padding-top">
                    APR
                  </Grid>
                  <Grid item xs={4} className="text-align-right">
                    <Grid item xs={12} className="text-input">
                      <CustomInput
                        label=""
                        onChange={(event) =>
                          handleQuoteDetailChange(event, "aprValue")
                        }
                        value={aprValue}
                        endAdornment={
                          <InputAdornment position="start">%</InputAdornment>
                        }
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container item xs={12} className="quote-static-item">
                  <Grid item xs={8}>
                    Lender
                  </Grid>
                  <Grid item xs={4} className="text-align-right">
                    {lenderName}
                  </Grid>
                </Grid>
                <Grid container item xs={12} className="quote-static-item">
                  <Grid item xs={8}>
                    Total payable
                  </Grid>
                  <Grid item xs={4} className="text-align-right">
                    {Shared.getFormattedCurrencyValue(totalPayableAmount)}
                  </Grid>
                </Grid>
                <Grid container item xs={12} className="quote-static-item">
                  <Grid item xs={8}>
                    Paint protection
                  </Grid>
                  <Grid item xs={4} className="text-align-right">
                    +
                    {Shared.getFormattedCurrencyValue(
                      includePaintProtection
                        ? (paintProtectionValue?.price ?? 0) /
                            quoteRequestModel.term
                        : 0
                    )}
                    /pm
                  </Grid>
                </Grid>
                <Grid container item xs={12}>
                  <Grid item xs={8} className="padding-top bold-text">
                    Total monthly payment
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    className="final-amount text-align-right padding-top bold-text"
                  >
                    {Shared.getFormattedCurrencyValue(monthlyPaymentAmount)}
                  </Grid>
                </Grid>
                {totalPayableAmount > maxLendAmount && (
                  <Grid item xs={12} className="padding-top">
                    <CustomSnackbar
                      message={`This exceeds the customer's maximum borrow amount by ${Shared.getFormattedCurrencyValue(
                        totalPayableAmount - maxLendAmount
                      )}.`}
                      type="error"
                    />
                  </Grid>
                )}
              </Grid>
            </Grid>
          </>
        </QuoteDialogStyles>
      </ResponsiveDialog>
      {showSavedQuoteDialog && (
        <QuoteSavedDialog
          open={showSavedQuoteDialog}
          handleQuoteSavedDialogClose={() => {
            setShowSavedQuoteDialog(false);
            handleCloseDialog();
          }}
        />
      )}
    </>
  );
};
export default QuoteDialog;
