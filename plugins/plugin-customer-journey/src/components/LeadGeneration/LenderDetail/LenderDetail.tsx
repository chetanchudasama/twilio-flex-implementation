import React from "react";
import { Grid } from "@material-ui/core";
import { secondary, PreferredLenderIcon } from "@common/components";

import { LenderDetailStyles } from "./LenderDetail.Styles";
import { LenderDetailProps } from "./LenderDetail.Props";

export const LenderDetail: React.FC<LenderDetailProps> = ({ lenderName }) => {
  return (
    <LenderDetailStyles>
      <Grid container spacing={16}>
        <Grid item xs={12} className="lender-detail-heading">
          Lender Details
        </Grid>
        <Grid item xs={12} className="preferred-lender">
          <span className="preferred-lender-icon">
            <PreferredLenderIcon color={secondary} opacity="0.4" />
          </span>
          <span className="preferred-lender-name">
            Preferred Lender: {lenderName}
          </span>
        </Grid>
      </Grid>
    </LenderDetailStyles>
  );
};
