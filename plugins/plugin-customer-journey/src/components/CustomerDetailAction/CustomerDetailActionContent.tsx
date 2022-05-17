import React, { useMemo } from "react";
import {
  CustomerDetailActionWrapper,
  CustomerDetailType,
} from "@common/components";
import AddressHistory from "./AddressHistory/AddressHistory.Container";
import CustomerDetailWrapper from "./CustomerDetail/CustomerDetailWrapper/CustomerDetailWrapper.Container";
import BankDetail from "./BankDetail/BankDetail.Container";
import EmploymentHistory from "./EmploymentHistory/EmploymentHistory.Container";
import {
  StateToProps,
  DispatchToProps,
} from "./CustomerDetailActionContent.Props";

interface CustomerDetailActionContentProps {
  backToWizardStepper: () => void;
  customerDetailType: CustomerDetailType;
  isFromLeadGenerationScreen?: boolean;
}

export type ComponentProps = StateToProps &
  DispatchToProps &
  CustomerDetailActionContentProps;

export const CustomerDetailActionContent: React.FC<ComponentProps> = ({
  currentProgressStatus,
  customerDetailType,
  backToWizardStepper,
  isFromLeadGenerationScreen,
}) => {
  // eslint-disable-next-line consistent-return
  const ActiveComponent: React.ReactNode = useMemo(() => {
    switch (customerDetailType) {
      case CustomerDetailType.CustomerDetail:
        return (
          <CustomerDetailWrapper backToWizardStepper={backToWizardStepper} />
        );
      case CustomerDetailType.AddressHistory:
        return <AddressHistory />;
      case CustomerDetailType.EmploymentHistory:
        return <EmploymentHistory />;
      case CustomerDetailType.BankDetails:
        return <BankDetail backToWizardStepper={backToWizardStepper} />;
      default:
        break;
    }
  }, [backToWizardStepper, customerDetailType]);

  return (
    <CustomerDetailActionWrapper
      onPrevious={backToWizardStepper}
      activeStep={currentProgressStatus}
      isFromLeadGenerationScreen={isFromLeadGenerationScreen}
    >
      {ActiveComponent}
    </CustomerDetailActionWrapper>
  );
};
