import { WithStyles, withStyles } from "@material-ui/core";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import React, { useState, useEffect } from "react";

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { wizardStepComponentStyles } from "./WizardStepWrapper.Styles";

export interface WizardStepWrapperProps {
  onNext: () => void;
  onPrevious: () => void;
  hideActions?: boolean;
  disableNext?: boolean;
  disablePrevious?: boolean;
  nextStep?: string;
  previousStep?: string;
}

type Props = WithStyles<typeof wizardStepComponentStyles> &
  WizardStepWrapperProps;

const WizardStepWrapperContent: React.FC<Props> = ({
  classes,
  children,
  hideActions,
  onPrevious,
  onNext,
  disableNext,
  disablePrevious,
  nextStep,
  previousStep,
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
  }, [height]);

  return (
    <Grid item xs={12} className={classes.root}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={16}
      >
        <Grid item xs={12} className={classes.content} style={{ height }}>
          {children}
        </Grid>
        {!hideActions && (
          <Grid
            item
            xs={12}
            className={`actionContainer ${classes.actionContainer}`}
          >
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              spacing={16}
            >
              <Grid item>
                <Button
                  onClick={onPrevious}
                  color="secondary"
                  type="button"
                  disabled={disablePrevious}
                  className={classes.previousButton}
                >
                  {previousStep && (
                    <ArrowBackIosIcon className={classes.arrowBackBtn} />
                  )}
                  {disablePrevious || !previousStep
                    ? "Previous"
                    : `Previous: ${previousStep}`}
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={onNext}
                  color="secondary"
                  type="button"
                  disabled={disableNext}
                  className={classes.nextButton}
                >
                  {disableNext || !nextStep ? "Next" : `Next: ${nextStep}`}
                  {nextStep && (
                    <ArrowForwardIosIcon className={classes.arrowForwardBtn} />
                  )}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export const WizardStepWrapper = withStyles(wizardStepComponentStyles)(
  WizardStepWrapperContent
);
