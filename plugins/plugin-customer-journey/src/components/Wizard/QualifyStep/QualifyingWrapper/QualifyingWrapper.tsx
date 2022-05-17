import React, { useEffect, useMemo, useState } from "react";

import { WizardStepWrapper, BaseWizardStepProps } from "@common/components";
import { Manager } from "@twilio/flex-ui";

import { preparePatchData } from "../../../../helpers/commonFunctions";
import { QualifyDetailModel } from "../../../../models/QualifyDetailModel";
import { useApplicationService } from "../../../../services/application.service";
import { useStaticService } from "../../../../services/static.service";
import { AppState } from "../../../../states";
import Loading from "../../../LoadingComponent/Loading";
import QualifyingContent from "../QualifyingContent/QualifyingContent.Container";
import { StateToProps, DispatchToProps } from "./QualifyingWrapper.Props";

export type ComponentProps = StateToProps &
  DispatchToProps &
  BaseWizardStepProps;

const QualifyingWrapper: React.FC<ComponentProps> = (props: ComponentProps) => {
  const { applicationId, nextStep } = props;
  const state: AppState = Manager.getInstance().store.getState();
  const token: string = useMemo(() => {
    return state.flex.session.ssoTokenPayload.token ?? "";
  }, [state.flex.session.ssoTokenPayload]);
  const phoenixToken: string = useMemo(() => {
    return state.crm?.crmState?.phoenixToken ?? "";
  }, [state.crm?.crmState?.phoenixToken]);

  const applicationService = useApplicationService(token);
  const staticService = useStaticService(token, phoenixToken);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [qualifyingDetail, setQualifyingDetail] = useState<QualifyDetailModel>(
    new QualifyDetailModel()
  );
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>();

  useEffect(() => {
    if (props.isStaticItemsFetched) {
      return;
    }

    staticService
      .getDropdownData()
      .then((response) => {
        props.setReasonForPurchaseItems(response.reasonForPurchaseItems);
        props.setTimeForPurchaseItems(response.timeForPurchaseItems);
        props.setWhereDidYouHearItems(response.whereDidYouHearItems);
        props.setStaticFetched(true);
      })
      .catch((error) => {
        console.error(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onNext = async () => {
    const errorObject: Record<string, string[]> = {};
    let hasErrors = false;

    console.warn("CHECKING NEXT BUTTON ERRORS");

    if (qualifyingDetail.drivingLicenseConfirmed === null) {
      errorObject.drivingLicenseConfirmed = [
        "Driving License is not confirmed",
      ];
      hasErrors = true;
    }
    if (qualifyingDetail.addressConfirmed === null) {
      errorObject.addressConfirmed = ["Address is not confirmed"];
      hasErrors = true;
    }
    if (qualifyingDetail.incomeConfirmed === null) {
      errorObject.incomeConfirmed = ["Income is not confirmed"];
      hasErrors = true;
    }
    if (qualifyingDetail.placeOfWorkConfirmed === null) {
      errorObject.placeOfWorkConfirmed = ["Place of work is not confirmed"];
      hasErrors = true;
    }
    if (qualifyingDetail.reasonForPurchase === null) {
      errorObject.reasonForPurchase = ["Reason for purchase is not selected"];
      hasErrors = true;
    }
    if (qualifyingDetail.timeForPurchase === null) {
      errorObject.timeForPurchase = ["Time for purchase is not selected"];
      hasErrors = true;
    }
    if (qualifyingDetail.whereDidYouHear === null) {
      errorObject.whereDidYouHear = ["This field is required"];
      hasErrors = true;
    }
    if (qualifyingDetail.hasCustomerAlreadyFoundCar === null) {
      errorObject.hasCustomerAlreadyFoundCar = [
        "Car already found is not confirmed",
      ];
      hasErrors = true;
    }

    // if (!qualifyingDetail.budgetInformation) {
    //   errorObject.maximumBorrowAmount = ["This field is required"];
    //   errorObject.monthlyBudgetAmount = ["This field is required"];
    //   hasErrors = true;
    // } else {
    //   const { budgetInformation } = qualifyingDetail;
    //   if (
    //     !budgetInformation.maximumBorrowAmount ||
    //     budgetInformation.maximumBorrowAmount <= 0
    //   ) {
    //     errorObject.maximumBorrowAmount = [
    //       "Amount should be greater than zero",
    //     ];
    //     hasErrors = true;
    //   }
    //   if (
    //     !budgetInformation.monthlyBudgetAmount ||
    //     budgetInformation.monthlyBudgetAmount <= 0
    //   ) {
    //     errorObject.monthlyBudgetAmount = [
    //       "Amount should be greater than zero",
    //     ];
    //     hasErrors = true;
    //   }
    // }
    setErrors(errorObject);

    console.warn("ERRORS", errorObject);

    if (hasErrors) {
      document.getElementById("please-confirm-header")?.scrollIntoView();
      return;
    }

    if (props.moveForward) {
      props.moveForward();
    }
  };

  const onPrevious = () => {
    if (props.moveBackward) {
      props.moveBackward();
    }
  };

  const fetchQualifyingDetails = () => {
    setIsLoading(true);
    setIsDataLoaded(false);
    applicationService
      .getQualifyingDetails(applicationId)
      .then((response) => {
        setQualifyingDetail(response);
      })
      .catch((error) => {
        console.error(error);
        setQualifyingDetail(new QualifyDetailModel());
      })
      .finally(() => {
        setIsLoading(false);
        setIsDataLoaded(true);
      });
  };

  useEffect(() => {
    if (applicationId > 0) {
      fetchQualifyingDetails();
    } else {
      setQualifyingDetail(new QualifyDetailModel());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applicationId]);

  const updateQualifyingDetails = (
    key: keyof QualifyDetailModel,
    value: string | boolean | any | null
  ) => {
    if (!applicationId) {
      return;
    }
    let condition = qualifyingDetail[key] !== value;

    if (typeof value === "object") {
      condition =
        JSON.stringify(qualifyingDetail[key]) !== JSON.stringify(value);
    }

    if (!condition) {
      return;
    }

    setIsLoading(true);

    console.log("UPDATE QUALIFYING DETAILS APP ID", applicationId);

    applicationService
      .updateQualifyingDetails(applicationId, [preparePatchData(key, value)])
      .then(() => {
        setQualifyingDetail({
          ...qualifyingDetail,
          [key]: value,
        });

        // reset validations for that key
        setErrors({
          ...errors,
          [key]: [],
        });
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <WizardStepWrapper
      onNext={onNext}
      onPrevious={onPrevious}
      disablePrevious
      nextStep={nextStep}
    >
      {isLoading && <Loading />}
      {isDataLoaded && (
        <QualifyingContent
          qualifyingDetail={qualifyingDetail}
          updateQualifyingDetails={updateQualifyingDetails}
          errors={errors}
        />
      )}
    </WizardStepWrapper>
  );
};

export default QualifyingWrapper;
