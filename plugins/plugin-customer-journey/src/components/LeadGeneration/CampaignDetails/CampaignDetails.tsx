import React from "react";
import { Grid } from "@material-ui/core";
import { CampaignDetailsStyles } from "./CampaignDetails.Styles";

export const CampaignDetails: React.FC = () => {
  return (
    <CampaignDetailsStyles>
      <Grid container spacing={16}>
        <Grid item xs={12} className="campaign-details-heading">
          Campaign Details
        </Grid>
        <Grid item xs={12} container className="border-bottom detail-row">
          <Grid item xs={6} className="title">
            Campaign name
          </Grid>
          <Grid item xs={6} className="detail-value">
            -
          </Grid>
        </Grid>
        <Grid item xs={12} container className="border-bottom detail-row">
          <Grid item xs={6} className="title">
            Contact attempts
          </Grid>
          <Grid item xs={6} className="detail-value">
            -
          </Grid>
        </Grid>
        <Grid item xs={12} container className="detail-row">
          <Grid item xs={6} className="title">
            Action
          </Grid>
          <Grid item xs={6} className="detail-value">
            -
          </Grid>
        </Grid>
      </Grid>
    </CampaignDetailsStyles>
  );
};
