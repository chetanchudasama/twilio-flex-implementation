import { WithStyles, withStyles } from "@material-ui/core";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import React, { useState, useEffect } from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import { wizardComponentStyles } from "./CustomerDetailActionWrapper.Styles";
import { paddingUnit } from "../shared/AppTheme";

export interface CustomerDetailActionWrapperProps {
  activeStep: string;
  onPrevious: () => void;
  isFromLeadGenerationScreen?: boolean;
}

type Props = WithStyles<typeof wizardComponentStyles> &
  CustomerDetailActionWrapperProps;

const CustomerDetailActionWrapperContent: React.FC<Props> = ({
  classes,
  children,
  activeStep,
  onPrevious,
  isFromLeadGenerationScreen,
}) => {
  const [height, setHeight] = useState("fit-content");

  useEffect(() => {
    let timeout: any = null;
    const calculateHeight = () => {
      // get twilio header height
      const twilioHeading =
        document.getElementsByClassName("Twilio-MainHeader");
      let twilioHeadingHeight = 0;
      if (twilioHeading && twilioHeading.length) {
        twilioHeadingHeight = (twilioHeading[0] as HTMLElement).offsetHeight;
      }
      const customerBanner = document.getElementsByClassName("customer-banner");
      let customerBannerHeight = 0;
      if (customerBanner && customerBanner.length) {
        customerBannerHeight = (customerBanner[0] as HTMLElement).offsetHeight;
      }

      const leadGenCustomerName =
        document.getElementsByClassName("customer-name-lg");
      let leadGenCustomerNameHeight = 0;
      if (leadGenCustomerName && leadGenCustomerName.length) {
        leadGenCustomerNameHeight = (leadGenCustomerName[0] as HTMLElement)
          .offsetHeight;
      }

      const actionContainer =
        document.getElementsByClassName("actionContainer");
      let actionContainerHeight = 0;
      if (actionContainer && actionContainer.length) {
        actionContainerHeight = (actionContainer[0] as HTMLElement)
          .offsetHeight;
      }

      const stepper = document.getElementsByClassName("stepper");
      let stepperHeight = 0;
      if (stepper && stepper.length) {
        stepperHeight = (stepper[0] as HTMLElement).offsetHeight;
      }

      const leadGenWrapperSpacing = isFromLeadGenerationScreen
        ? paddingUnit * 8
        : 0;

      timeout = setTimeout(() => {
        let h = "fit-content";
        if (
          twilioHeadingHeight > 0 ||
          customerBannerHeight > 0 ||
          actionContainerHeight > 0 ||
          stepperHeight > 0
        ) {
          h = `${
            window.innerHeight -
            twilioHeadingHeight -
            customerBannerHeight -
            actionContainerHeight -
            stepperHeight -
            leadGenCustomerNameHeight -
            leadGenWrapperSpacing -
            5
          }px`;
        }
        if (h !== height) {
          setHeight(h);
        }
      }, 0);
    };
    // update height on window resize
    document.addEventListener("pointermove", calculateHeight);
    calculateHeight();
    return () => {
      clearTimeout(timeout);
      document.removeEventListener("pointermove", calculateHeight);
    };
  }, [height, isFromLeadGenerationScreen]);

  return (
    <Grid
      item
      xs={12}
      className={`${
        isFromLeadGenerationScreen ? classes.leadGenScreen : classes.root
      }`}
    >
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={16}
      >
        <Grid
          item
          xs={12}
          className={`actionContainer ${classes.actionContainer}`}
        >
          <Button
            onClick={onPrevious}
            color="secondary"
            className={classes.previousButton}
          >
            <ArrowBackIosIcon className={classes.arrowBackBtn} />
            {`Back: ${
              !isFromLeadGenerationScreen ? activeStep : "Lead Gen Screen"
            }`}
          </Button>
        </Grid>
        <Grid item xs={12} className={classes.content} style={{ height }}>
          {children}
        </Grid>
      </Grid>
    </Grid>
  );
};

export const CustomerDetailActionWrapper = withStyles(wizardComponentStyles)(
  CustomerDetailActionWrapperContent
);
