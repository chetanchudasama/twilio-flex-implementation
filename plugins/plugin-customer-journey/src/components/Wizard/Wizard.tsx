import React, { useEffect, useMemo, useState } from "react";

import {
  ApplicationStatusId,
  ApplicationStatusModel,
  ApplicationStatusName,
  StepModel,
  WizardComponent,
} from "@common/components";
import * as Flex from "@twilio/flex-ui";

import { preparePatchData } from "../../helpers/commonFunctions";
import { showErrorMessage } from "../../Notifications";
import { useApplicationService } from "../../services/application.service";
import { AppState } from "../../states";
import Loading from "../LoadingComponent/Loading";
import CarSearchWrapper from "./CarSearchStep/CarSearchWrapper/CarSearchWrapper.Container";
import { DealSheetWrapper } from "./DealSheetStep/DealSheetWrapper/DealSheetWrapper";
import { DealWrapper } from "./DealStep/DealWrapper/DealWrapper";
import QualifyingWrapper from "./QualifyStep/QualifyingWrapper/QualifyingWrapper.Container";
import QuoteWrapper from "./QuotesStep/QuoteWrapper/QuoteWrapper.Container";
import { ValCallWrapper } from "./ValCallStep/ValCallWrapper/ValCallWrapper";
import { DispatchToProps, StateToProps } from "./Wizard.Props";
import { WizardComponentStyles } from "./Wizard.Styles";

interface OwnProps {
  applicationId: number;
}

type WizardContentProps = StateToProps & DispatchToProps & OwnProps;

const WizardContent: React.FC<WizardContentProps> = ({
  customer,
  setCustomerDetails,
}) => {
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [loading, setLoading] = useState<boolean>(false);

  const state: AppState = Flex.Manager.getInstance().store.getState();
  const token: string = useMemo(() => {
    return state.flex.session.ssoTokenPayload.token ?? "";
  }, [state.flex.session.ssoTokenPayload]);
  const applicationService = useApplicationService(token);

  const applicationId: number = useMemo(
    () => (customer ? customer.applicationId : 0),
    [customer]
  );

  const applicationStatus: ApplicationStatusModel = useMemo(() => {
    // set applicationStatus object using currentProgressStatus value
    switch (customer?.currentProgressStatus) {
      case ApplicationStatusName.Qualify:
        return {
          applicationStatusId: ApplicationStatusId.Qualify,
          applicationStatusName: ApplicationStatusName.Qualify,
        };
      case ApplicationStatusName.CarSearch:
        return {
          applicationStatusId: ApplicationStatusId.CarSearch,
          applicationStatusName: ApplicationStatusName.CarSearch,
        };
      case ApplicationStatusName.Quotes:
        return {
          applicationStatusId: ApplicationStatusId.Quotes,
          applicationStatusName: ApplicationStatusName.Quotes,
        };
      case ApplicationStatusName.DealSheet:
        return {
          applicationStatusId: ApplicationStatusId.DealSheet,
          applicationStatusName: ApplicationStatusName.DealSheet,
        };
      case ApplicationStatusName.Deal:
        return {
          applicationStatusId: ApplicationStatusId.Deal,
          applicationStatusName: ApplicationStatusName.Deal,
        };
      case ApplicationStatusName.ValCall:
        return {
          applicationStatusId: ApplicationStatusId.ValCall,
          applicationStatusName: ApplicationStatusName.ValCall,
        };
      default:
        return {
          applicationStatusId: ApplicationStatusId.Qualify,
          applicationStatusName: ApplicationStatusName.Qualify,
        };
    }
  }, [customer?.currentProgressStatus]);

  useEffect(() => {
    if (applicationStatus.applicationStatusId !== activeStep) {
      setActiveStep(applicationStatus.applicationStatusId || 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applicationStatus]);

  const moveForward =
    (
      currentId: ApplicationStatusId,
      nextId: ApplicationStatusId,
      nextName: ApplicationStatusName,
      onlyClientSide?: boolean
    ) =>
    async () => {
      if (applicationId <= 0) {
        return;
      }

      if (
        applicationStatus &&
        currentId < applicationStatus?.applicationStatusId
      ) {
        setActiveStep(nextId);
        return;
      }

      let hasError = false;
      setLoading(true);

      if (!onlyClientSide) {
        try {
          await applicationService.updateBaseApplicationDetail(applicationId, [
            preparePatchData("currentProgressStatus", nextName),
          ]);
        } catch (error) {
          showErrorMessage("Something went wrong, please try again", "", true);
          hasError = true;
        }
      }

      if (!hasError) {
        setActiveStep(nextId);
        setCustomerDetails("currentProgressStatus", nextName);
      }
      setLoading(false);
    };
  const moveBackward = () => {
    setActiveStep((prevState) => prevState - 1);
  };

  useEffect(() => {
    Flex.Actions.registerAction("MoveToQuoteStep", async () => {
      setActiveStep(ApplicationStatusId.Quotes);
      setCustomerDetails("currentProgressStatus", ApplicationStatusName.Quotes);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const steps: StepModel[] = useMemo((): StepModel[] => {
    return [
      {
        index: ApplicationStatusId.Qualify,
        title: ApplicationStatusName.Qualify,
        component: QualifyingWrapper,
        componentProps: {},
        defaultStepProps: {
          moveForward: moveForward(
            ApplicationStatusId.Qualify,
            ApplicationStatusId.CarSearch,
            ApplicationStatusName.CarSearch
          ),
          moveBackward,
          nextStep: ApplicationStatusName.CarSearch,
          previousStep: "",
        },
        completed: applicationStatus
          ? applicationStatus.applicationStatusId > ApplicationStatusId.Qualify
          : false,
      },
      {
        index: ApplicationStatusId.CarSearch,
        title: ApplicationStatusName.CarSearch,
        component: CarSearchWrapper,
        componentProps: {},
        defaultStepProps: {
          moveForward: moveForward(
            ApplicationStatusId.CarSearch,
            ApplicationStatusId.Quotes,
            ApplicationStatusName.Quotes,
            true
          ),
          moveBackward,
          nextStep: ApplicationStatusName.Quotes,
          previousStep: ApplicationStatusName.Qualify,
        },
        completed: applicationStatus
          ? applicationStatus.applicationStatusId >
            ApplicationStatusId.CarSearch
          : false,
      },
      {
        index: ApplicationStatusId.Quotes,
        title: ApplicationStatusName.Quotes,
        component: QuoteWrapper,
        componentProps: {},
        defaultStepProps: {
          moveForward: moveForward(
            ApplicationStatusId.Quotes,
            ApplicationStatusId.DealSheet,
            ApplicationStatusName.DealSheet
          ),
          moveBackward,
          nextStep: ApplicationStatusName.DealSheet,
          previousStep: ApplicationStatusName.CarSearch,
        },
        completed: applicationStatus
          ? applicationStatus.applicationStatusId > ApplicationStatusId.Quotes
          : false,
      },
      {
        index: ApplicationStatusId.DealSheet,
        title: ApplicationStatusName.DealSheet,
        component: DealSheetWrapper,
        componentProps: {},
        defaultStepProps: {
          moveForward: moveForward(
            ApplicationStatusId.DealSheet,
            ApplicationStatusId.Deal,
            ApplicationStatusName.Deal
          ),
          moveBackward,
          nextStep: ApplicationStatusName.Deal,
          previousStep: ApplicationStatusName.Quotes,
        },
        completed: applicationStatus
          ? applicationStatus.applicationStatusId >
            ApplicationStatusId.DealSheet
          : false,
      },
      {
        index: ApplicationStatusId.Deal,
        title: ApplicationStatusName.Deal,
        component: DealWrapper,
        componentProps: {},
        defaultStepProps: {
          moveForward: moveForward(
            ApplicationStatusId.Deal,
            ApplicationStatusId.ValCall,
            ApplicationStatusName.ValCall
          ),
          moveBackward,
          nextStep: ApplicationStatusName.ValCall,
          previousStep: ApplicationStatusName.DealSheet,
        },
        completed: applicationStatus
          ? applicationStatus.applicationStatusId > ApplicationStatusId.Deal
          : false,
      },
      {
        index: ApplicationStatusId.ValCall,
        title: ApplicationStatusName.ValCall,
        component: ValCallWrapper,
        componentProps: {},
        defaultStepProps: {
          moveBackward,
          previousStep: ApplicationStatusName.Deal,
        },
        completed: applicationStatus
          ? applicationStatus.applicationStatusId > ApplicationStatusId.ValCall
          : false,
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applicationStatus, customer]);

  return (
    <WizardComponentStyles>
      {loading && <Loading />}
      <WizardComponent
        progressStep={applicationStatus.applicationStatusId || 1}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        steps={steps}
      />
    </WizardComponentStyles>
  );
};

export default WizardContent;
