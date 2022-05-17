import { OfferInformationModel } from "models/OfferInformationModel";
import React, { useMemo, useState } from "react";

import { secondary, Shared, WhatsAppIcon } from "@common/components";
import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";

import { ChannelType, DealerStateType } from "../../../../common/enum";
import { QuoteDetailModel } from "../../../../models/QuoteDetailModel";
import { VehicleDetailModel } from "../../../../models/VehicleDetailModel";
import { VehicleSummaryDetailModel } from "../../../../models/VehicleSummaryDetailModel";
import CarDealerInformation from "../../../CarDealerInformation/CarDealerInformation.Container";
import CarDetailViewDialog from "../../../CarDetailViewDialog/CarDetailViewDialog.Container";
import { VehicleImage } from "../../../VehicleImage/VehicleImage";
import QuoteDialog from "../../QuotesStep/QuoteDialog/QuoteDialog.Container";
import { CarSearchResultDetailStyles } from "./CarSearchResultDetail.Styles";

export interface CarSearchResultDetailProp {
  vehicleDetail: VehicleSummaryDetailModel | VehicleDetailModel;
  isCarSaved: boolean;
  sendCarDetail: (channelType: ChannelType) => void;
  saveCarDetail: () => void;
}

const CarSearchResultDetail: React.FC<CarSearchResultDetailProp> = ({
  vehicleDetail,
  isCarSaved,
  sendCarDetail,
  saveCarDetail,
}) => {
  const getCarMakeModel = () => {
    return Shared.getFormattedText(
      [vehicleDetail.make, vehicleDetail.model],
      " | "
    );
  };
  const [selectedOfferTerm, setSelectedOfferTerm] = useState(36);
  const [openCarDetailDialog, setOpenCarDetailDialog] =
    useState<boolean>(false);
  const [openCreateQuoteDialog, setOpenCreateQuoteDialog] = useState(false);
  const [quoteDetail, setQuoteDetail] = useState(new QuoteDetailModel());

  // TODO: remove once fetched from API
  const offerInformation: OfferInformationModel[] = [
    {
      term: 36,
      monthlyAmount: 2000,
      bestMatch: true,
      available: true,
    },
    {
      term: 48,
      monthlyAmount: 5000,
      bestMatch: false,
      available: false,
    },
    {
      term: 60,
      monthlyAmount: 8000,
      bestMatch: false,
      available: true,
    },
  ];

  const getOfferClassName = (offer: OfferInformationModel) => {
    if (offer.term === selectedOfferTerm) {
      return "offer-selected";
    }

    if (offer.bestMatch) {
      return "offer-best-match";
    }

    if (!offer.available) {
      return "offer-unavailable";
    }

    return "offer-detail";
  };

  const openQuoteDialog = () => {
    // assign vehicle detail to quote detail
    const newQuoteDetail = new QuoteDetailModel(vehicleDetail);
    newQuoteDetail.term =
      Shared.termList.find((t) => t.id === selectedOfferTerm)?.id ||
      Shared.termList[0].id;
    setQuoteDetail(newQuoteDetail);
    // open quote dialog
    setOpenCreateQuoteDialog(true);
  };

  const image = useMemo(() => {
    if (vehicleDetail instanceof VehicleSummaryDetailModel) {
      return vehicleDetail.image;
    }
    return vehicleDetail.images.length > 0 ? vehicleDetail.images[0] : "";
  }, [vehicleDetail]);

  const imagesCount = useMemo(() => {
    if (vehicleDetail instanceof VehicleSummaryDetailModel) {
      return vehicleDetail.imagesCount;
    }
    return vehicleDetail.images.length;
  }, [vehicleDetail]);

  const dealerAdminFee = useMemo(() => {
    if (vehicleDetail instanceof VehicleSummaryDetailModel) {
      return vehicleDetail.dealerAdminFee || 0;
    }
    return 0;
  }, [vehicleDetail]);

  const offerTermFunction = (offer: OfferInformationModel) => {
    if (offer.available) {
      setSelectedOfferTerm(offer.term);
    }
  };

  const disableSendMessageButton = useMemo(() => {
    return (
      !vehicleDetail.is247Cars ||
      vehicleDetail.dealer.state !== DealerStateType.Approved
    );
  }, [vehicleDetail.dealer.state, vehicleDetail.is247Cars]);

  return (
    <>
      <CarSearchResultDetailStyles>
        <Grid container>
          <Grid item xs={4} className="vehicle-img-container">
            <VehicleImage
              image={image}
              imageList={vehicleDetail.images}
              imagesCount={imagesCount}
              showImageCount
            />
          </Grid>
          <Grid item xs={8}>
            <Grid container className="car-search-detail">
              <Grid item xs={8}>
                <Grid container spacing={8} className="car-carousel">
                  <Grid item xs={12}>
                    <div className="car-price">
                      {Shared.getFormattedCurrencyValue(vehicleDetail.price)}
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <div className="car-model">{getCarMakeModel()}</div>
                  </Grid>
                  <Grid item xs={12}>
                    <ul className="car-specification">
                      <li>
                        {`${Shared.getFormattedNumber(
                          vehicleDetail.mileage
                        )} miles`}
                      </li>
                      <li>{vehicleDetail.regNumber}</li>
                      <li>{vehicleDetail.regYear}</li>
                      <li>{vehicleDetail.trans}</li>
                      <li>{vehicleDetail.fuel}</li>
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
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      onClick={openQuoteDialog}
                      className="quote-btn"
                    >
                      Quote
                    </Button>
                    <Button
                      variant="outlined"
                      className="secondary-button"
                      onClick={saveCarDetail}
                    >
                      {isCarSaved ? (
                        <FavoriteIcon className="icon" />
                      ) : (
                        <FavoriteBorderRoundedIcon className="icon" />
                      )}
                    </Button>
                    <Button
                      variant="outlined"
                      className="secondary-button whatsapp-icon-button"
                      onClick={() => sendCarDetail(ChannelType.Whatsapp)}
                      disabled={disableSendMessageButton}
                    >
                      <WhatsAppIcon
                        color={!disableSendMessageButton ? secondary : ""}
                        opacity={disableSendMessageButton ? "0.26" : ""}
                      />
                    </Button>
                    <Button
                      variant="outlined"
                      className="secondary-button sms-icon-button"
                      onClick={() => sendCarDetail(ChannelType.SMS)}
                      disabled={disableSendMessageButton}
                    >
                      <ChatBubbleOutlineIcon className="icon" />
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                {offerInformation.map((offer) => (
                  <React.Fragment key={offer.term}>
                    <div
                      className={getOfferClassName(offer)}
                      onClick={() => offerTermFunction(offer)}
                      onKeyDown={() => offerTermFunction(offer)}
                      role="button"
                      tabIndex={0}
                    >
                      {offer.bestMatch && (
                        <div
                          className={
                            offer.term === selectedOfferTerm
                              ? "offer-best-match-selected"
                              : "offer-best-match-heading"
                          }
                        >
                          Best Match
                        </div>
                      )}
                      <div className="offer-detail-content">
                        <div className="offer-term">
                          {offer.term} months from
                        </div>
                        <div className="offer-price">
                          {!offer.available ? (
                            <div className="offer-amount">Unavailable</div>
                          ) : (
                            <>
                              <div className="offer-amount">
                                {Shared.getFormattedCurrencyValue(
                                  offer.monthlyAmount
                                )}
                              </div>
                              <div className="offer-pm">/pm</div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
                <div className="dealer-fee">
                  {`Excl. ${Shared.getFormattedCurrencyValue(
                    dealerAdminFee
                  )} dealer fee`}
                </div>
              </Grid>
            </Grid>
            {/* <Grid container className="dealer-detail">
              <Grid item xs={12}>
                <CarDealerInformation
                  dealerInfo={vehicleDetail.dealer}
                  distance={vehicleDetail.distance!}
                />
              </Grid>
            </Grid> */}
          </Grid>
        </Grid>
      </CarSearchResultDetailStyles>
      {openCarDetailDialog && (
        <CarDetailViewDialog
          open={openCarDetailDialog}
          vehicleId={vehicleDetail.vehicleId}
          handleCloseDialog={() => setOpenCarDetailDialog(false)}
        />
      )}
      {openCreateQuoteDialog && (
        <QuoteDialog
          open={openCreateQuoteDialog}
          quoteDetail={quoteDetail}
          handleCloseDialog={() => setOpenCreateQuoteDialog(false)}
        />
      )}
    </>
  );
};

export default CarSearchResultDetail;
