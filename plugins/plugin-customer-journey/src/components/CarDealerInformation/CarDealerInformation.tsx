import { Grid } from "@material-ui/core";
import LanguageIcon from "@material-ui/icons/Language";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import StarIcon from "@material-ui/icons/Star";
import { Actions, IconButton } from "@twilio/flex-ui";
import React from "react";
import { DealerResponseModel } from "../../models/DealerResponseModel";
import { StateToProps, DispatchToProps } from "./CarDealerInformation.Props";
import { CarDealerInformationStyles } from "./CarDealerInformation.Styles";

export interface CarDealerInformationProp {
  dealerInfo: DealerResponseModel;
  distance?: number;
}

export type Props = StateToProps & DispatchToProps & CarDealerInformationProp;

const CarDealerInformation: React.FC<Props> = ({
  dealerInfo,
  distance,
  canMakeCall,
}) => {
  const triggerOutboundCall = () => {
    if (canMakeCall && dealerInfo.phone) {
      const payload = {
        destination: dealerInfo.phone,
      };
      Actions.invokeAction("StartOutboundCall", payload);
    }
  };

  return (
    <CarDealerInformationStyles>
      <Grid container>
        <Grid item xs={12} className="dealer-name">
          {dealerInfo.dealerName}
        </Grid>
        <Grid item container>
          <Grid item xs={4}>
            <Grid container>
              <Grid item xs={1}>
                <LocationOnIcon fontSize="small" className="info-icon" />
              </Grid>
              <Grid item xs={11} className="dealer-info dealer-address">
                {dealerInfo.town + (distance ? ` (${distance} miles)` : "")}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <Grid container>
              <Grid item xs={2}>
                <StarIcon fontSize="small" className="info-icon" />
              </Grid>
              <Grid item xs={10} className="dealer-info dealer-rating">
                {dealerInfo.rating ?? " -"}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container>
              <Grid item xs={1}>
                <IconButton
                  icon="Call"
                  className="info-icon"
                  disabled={!canMakeCall}
                  onClick={() => triggerOutboundCall()}
                />
              </Grid>
              <Grid item xs={11} className="dealer-info dealer-phone">
                {dealerInfo.phone}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <Grid container>
              <Grid item xs={2}>
                <LanguageIcon fontSize="small" className="info-icon" />
              </Grid>
              <Grid item xs={10} className="dealer-info-url">
                <a href={dealerInfo.url} target="blank">
                  Website
                </a>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </CarDealerInformationStyles>
  );
};

export default CarDealerInformation;
