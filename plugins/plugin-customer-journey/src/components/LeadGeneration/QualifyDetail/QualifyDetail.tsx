import React from "react";
import { Divider, Grid, Typography } from "@material-ui/core";
import { CustomSnackbar, Shared, ThreeStateToggle } from "@common/components";
import { QualifyDetailModel } from "../../../models/QualifyDetailModel";
import { QualifyDetailStyles } from "./QualifyDetail.Styles";
import { QualifyDetailProps } from "./QualifyDetail.Props";

export const QualifyDetail: React.FC<QualifyDetailProps> = ({
  monthlyIncome,
  qualifyingDetail,
  updateQualifyingDetails,
}) => {
  const onThreeWaySwitchChange =
    (key: keyof QualifyDetailModel) => (value: boolean | null) => {
      updateQualifyingDetails(key, value);
    };

  return (
    <QualifyDetailStyles>
      <Grid container spacing={16}>
        <Grid item xs={12} className="qualify-detail-heading">
          Qualify
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
          </Grid>
        </Grid>
      </Grid>
    </QualifyDetailStyles>
  );
};
