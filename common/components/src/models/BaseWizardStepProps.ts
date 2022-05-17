export interface BaseWizardStepProps {
  moveForward?: () => void;
  moveBackward?: () => void;
  nextStep?: string;
  previousStep?: string;
}
