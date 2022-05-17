import React from "react";
import { Grid } from "@material-ui/core";
import CakeIcon from "@material-ui/icons/Cake";
import HomeIcon from "@material-ui/icons/Home";

import { DPAFCAStyles } from "./DPAFCA.Styles";
import { DPAFCAProps } from "./DPAFCA.Props";

export const DPAFCA: React.FC<DPAFCAProps> = ({ address, dateOfBirth }) => {
  return (
    <DPAFCAStyles>
      <Grid container spacing={16}>
        <Grid item xs={12} className="heading">
          DPA & FCA
        </Grid>
        <Grid item xs={12} className="dpafca-title">
          DPA
        </Grid>
        <Grid item xs={12} className="address">
          <span className="icon">
            <HomeIcon />
          </span>
          <span>{address}</span>
        </Grid>
        <Grid item xs={12} className="date-of-birth">
          <span className="icon">
            <CakeIcon />
          </span>
          <span className="dob-value">{dateOfBirth}</span>
        </Grid>
        <Grid item xs={12} className="dpafca-title">
          FCA Statement
        </Grid>
        <Grid item xs={12} className="fca-note">
          Just to make you aware that all our calls are recorded for training
          and quality purposes and we are authorised and regulated by the
          Financial Conduct Authority.
        </Grid>
      </Grid>
    </DPAFCAStyles>
  );
};
