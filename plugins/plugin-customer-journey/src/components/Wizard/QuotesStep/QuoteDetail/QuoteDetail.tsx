import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { Shared } from "@common/components";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import * as Flex from "@twilio/flex-ui";
import { QuoteDetailModel } from "../../../../models/QuoteDetailModel";
import { VehicleImage } from "../../../VehicleImage/VehicleImage";
import CarDetailViewDialog from "../../../CarDetailViewDialog/CarDetailViewDialog.Container";
import CarDealerInformation from "../../../CarDealerInformation/CarDealerInformation.Container";
import { QuoteDetailStyles } from "./QuoteDetail.Styles";
import QuoteDialog from "../QuoteDialog/QuoteDialog.Container";

export interface QuoteDetailProp {
  quoteDetail: QuoteDetailModel;
}

const QuoteDetail: React.FC<QuoteDetailProp> = ({ quoteDetail }) => {
  const [openCarDetailDialog, setOpenCarDetailDialog] =
    useState<boolean>(false);

  const [openCreateQuoteDialog, setOpenCreateQuoteDialog] =
    useState<boolean>(false);

  const viewDealSheet = () => {
    Flex.Actions.invokeAction("MoveToDealSheetStep", {});
  };

  return (
    <>
      <QuoteDetailStyles>
        <Grid
          container
          className={
            quoteDetail.isAccepted ? "secondary-border" : "grey-border"
          }
        >
          <Grid
            xs={12}
            className={
              quoteDetail.isAccepted
                ? "secondary-background"
                : "grey-background"
            }
            item
          >
            <span className="quote-saved-date">
              {`Saved ${Shared.getFormattedDate(
                quoteDetail.created,
                "DD/MM/YYYY HH:mm"
              )}`}
            </span>
            {quoteDetail.isAccepted && quoteDetail.acceptedDateTime && (
              <span className="customer-accepted-date">
                {`Accepted By Customer ${Shared.getFormattedDate(
                  quoteDetail.acceptedDateTime,
                  "DD/MM/YYYY HH:mm"
                )}`}
              </span>
            )}
            <span className="quote-accepted-msg">
              {quoteDetail.isAccepted && (
                <CheckCircleIcon className="check-icon" />
              )}
              {quoteDetail.isAccepted ? " Approved by 247 Money" : " 247 Money"}
            </span>
          </Grid>
          <Grid item xs={5} className="car-detail-container">
            <Grid container>
              <Grid item xs={12} className="vehicle-img-container">
                <VehicleImage
                  image={quoteDetail.images[0]}
                  imageList={quoteDetail.images}
                  showImageCount={false}
                />
              </Grid>
              <Grid item xs={12} className="car-model">
                {quoteDetail.make}
              </Grid>
              <Grid item xs={12}>
                <ul className="car-specification car-detail">
                  <li>{quoteDetail.model}</li>
                  <li>{quoteDetail.colour}</li>
                  <li>{quoteDetail.doorsCount}dr</li>
                </ul>
              </Grid>
              <Grid item xs={12}>
                <ul className="car-specification">
                  <li>
                    {`${Shared.getFormattedNumber(quoteDetail.mileage)} miles`}
                  </li>
                  <li>{quoteDetail.regNumber}</li>
                  <li>{quoteDetail.regYear}</li>
                  <li>{quoteDetail.trans}</li>
                  <li>{quoteDetail.fuel}</li>
                </ul>
              </Grid>
              <Grid item xs={12} className="view-more-detail">
                <Button
                  className="view-more-detail-link"
                  onClick={() => setOpenCarDetailDialog(true)}
                  disableRipple
                >
                  View More Detail
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3} className="spec-container">
            <Grid container>
              <Grid item xs={12} className="spec-title">
                Car Value
              </Grid>
              <Grid item xs={12} className="spec-value">
                {Shared.getFormattedCurrencyValue(quoteDetail.price)}
              </Grid>
              <Grid item xs={12} className="spec-title">
                Deposit
              </Grid>
              <Grid item xs={12} className="spec-value">
                {Shared.getFormattedCurrencyValue(quoteDetail.deposit)}
              </Grid>
              <Grid item xs={12} className="spec-title">
                Part Exchange
              </Grid>
              <Grid item xs={12} className="spec-value">
                {Shared.getFormattedCurrencyValue(
                  quoteDetail.partExchangeValue!
                )}
              </Grid>
              <Grid item xs={12} className="spec-title">
                Dealer Fee
              </Grid>
              <Grid item xs={12} className="spec-value">
                -
              </Grid>
              <Grid item xs={12} className="spec-title">
                Paint Protection
              </Grid>
              <Grid item xs={12} className="spec-value">
                {Shared.getFormattedCurrencyValue(
                  quoteDetail.vehicleExtras?.price || 0
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4} className="finance-section">
            <Grid container className="finance-container">
              <Grid item xs={12} className="offer-term">
                {quoteDetail.term} months
              </Grid>
              <Grid item xs={12} className="offer-price">
                <div className="offer-amount">
                  {Shared.getFormattedCurrencyValue(quoteDetail.priceMonthly)}
                </div>
                <div className="offer-pm"> /pm</div>
              </Grid>
              <Grid item xs={12} className="apr-percentage">
                {quoteDetail.apr}% APR
              </Grid>
              <Grid item xs={12} className="finance-balance">
                {`Balance to finance ${Shared.getFormattedCurrencyValue(
                  quoteDetail.amountToFinance
                )}`}
              </Grid>
              <Grid item xs={12} className="payable-amount">
                {`Total payable ${Shared.getFormattedCurrencyValue(
                  quoteDetail.totalAmountPayable
                )}`}
              </Grid>
              {quoteDetail.isAccepted && (
                <Grid xs={12} item>
                  <Button
                    variant="contained"
                    onClick={viewDealSheet}
                    className="view-deal-sheet-btn"
                  >
                    View deal sheet
                  </Button>
                </Grid>
              )}
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  className="edit-quote-btn"
                  onClick={() => setOpenCreateQuoteDialog(true)}
                >
                  <EditIcon className="edit-icon" /> Edit quote
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} className="car-dealer-info">
            <Grid container>
              <Grid xs={8} item>
                <CarDealerInformation
                  dealerInfo={quoteDetail.dealer}
                  distance={quoteDetail.distance!}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </QuoteDetailStyles>
      {openCarDetailDialog && (
        <CarDetailViewDialog
          open={openCarDetailDialog}
          vehicleId={quoteDetail.vehicleId}
          handleCloseDialog={() => setOpenCarDetailDialog(false)}
        />
      )}
      {openCreateQuoteDialog && (
        <QuoteDialog
          open={openCreateQuoteDialog}
          handleCloseDialog={() => setOpenCreateQuoteDialog(false)}
          quoteDetail={quoteDetail}
        />
      )}
    </>
  );
};

export default QuoteDetail;
