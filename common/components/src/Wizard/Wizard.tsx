import React, { PropsWithChildren, useMemo } from "react";

import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import { BaseWizardStepProps } from "../models/BaseWizardStepProps";
import {
  StyledStep,
  StyledStepConnector,
  StyledStepLabel,
  StyledStepper,
  wizardStyles,
} from "./Wizard.Styles";

export interface StepModel {
  component: React.FC;
  componentProps: PropsWithChildren<unknown>;
  completed: boolean;
  defaultStepProps: BaseWizardStepProps;
  error?: boolean;
  index: number;
  title: string;
}

export interface StepperProps {
  progressStep: number;
  steps: StepModel[];
  activeStep: number;
  setActiveStep: (index: number) => void;
}

type Props = WithStyles<typeof wizardStyles> & StepperProps;

const Wizard: React.FC<Props> = (props) => {
  const { classes, steps, activeStep, setActiveStep, progressStep } = props;

  const ActiveComponent: React.ReactNode | null = useMemo(() => {
    const step = steps.find((s) => s.index === activeStep);
    if (step) {
      const Component: React.FC = step.component;
      const activeComponentProps: any = {
        ...step.defaultStepProps,
        ...step.componentProps,
      };
      // eslint-disable-next-line react/jsx-props-no-spreading
      return <Component {...activeComponentProps} />;
    }
    return null;
  }, [activeStep, steps]);

  const isStepClickable = (step: StepModel) => {
    return step.completed || step.index <= progressStep;
  };

  const handleLabelClick = (step: StepModel) => {
    if (!isStepClickable(step)) {
      return;
    }

    setActiveStep(step.index);
  };

  return (
    <Grid item xs={12} className={classes.root}>
      <StyledStepper
        activeStep={activeStep}
        connector={<StyledStepConnector />}
        className="stepper"
      >
        {steps.map((step, loopIndex) => {
          const { index, error } = step;
          const stepClasses: string[] = [];

          if (activeStep === index) {
            stepClasses.push(classes.stepActive);
          }
          if (error) {
            stepClasses.push(classes.stepDanger);
          }
          if (isStepClickable(step)) {
            stepClasses.push(classes.clickableStep);
          }
          const activeClassName = stepClasses.join(" ");
          return (
            <StyledStep
              // eslint-disable-next-line react/no-array-index-key
              key={`step-${index}-${loopIndex}`}
              className={activeClassName}
              completed={step.completed}
              onClick={() => handleLabelClick(step)}
              style={{
                flex: `0 0 ${100 / steps.length}`,
                width: `${100 / steps.length}%`,
              }}
            >
              <StyledStepLabel
                active={step.index === activeStep}
                completed={step.completed}
                error={step.error}
              >
                {step.completed ? (
                  <CheckCircleIcon className={classes.checkIcon} />
                ) : (
                  <span className={classes.stepIndex}>{`${step.index}.`}</span>
                )}
                {step.title}
              </StyledStepLabel>
            </StyledStep>
          );
        })}
      </StyledStepper>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12} className={classes.stepperContent}>
        {ActiveComponent}
      </Grid>
    </Grid>
  );
};

export const WizardComponent = withStyles(wizardStyles)(Wizard);
