import { BaseWizardStepProps, WizardStepWrapper } from "@common/components";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DealSheetProps {}

export type DealSheetWrapperProps = BaseWizardStepProps & DealSheetProps;

export const DealSheetWrapper: React.FC<DealSheetWrapperProps> = (props) => {
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
