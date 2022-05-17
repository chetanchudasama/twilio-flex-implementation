import { BaseWizardStepProps, WizardStepWrapper } from "@common/components";
import React from "react";

export type DealWrapperProps = BaseWizardStepProps;

export const DealWrapper: React.FC<DealWrapperProps> = (props) => {
  const { nextStep, previousStep } = props;
  const onNext = () => {
    if (props.moveForward) {
      props.moveForward();
    }
  };
  const onPrevious = () => {
    if (props.moveBackward) {
      props.moveBackward();
    }
  };

  return (
    <WizardStepWrapper
      onNext={onNext}
      onPrevious={onPrevious}
      nextStep={nextStep}
      previousStep={previousStep}
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis alias
      omnis temporibus modi expedita totam consequuntur ad perspiciatis illum
      veniam tempore officia maiores dicta odit maxime et, placeat officiis.
      Obcaecati?
    </WizardStepWrapper>
  );
};
