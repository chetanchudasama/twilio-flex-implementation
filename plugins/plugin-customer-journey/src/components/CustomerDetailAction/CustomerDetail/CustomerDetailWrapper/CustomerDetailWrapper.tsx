/* eslint-disable no-param-reassign */
import React, { useState } from "react";
import { Manager } from "@twilio/flex-ui";
import { CustomerDetailModel } from "@common/components";
import { preparePatchData } from "../../../../helpers/commonFunctions";
import {
  showMessage,
  showErrorMessage,
  CustomNotificationType,
} from "../../../../Notifications/index";
import { DispatchToProps, StateToProps } from "./CustomerDetailWrapper.Props";
import Loading from "../../../LoadingComponent/Loading.Container";
import CustomerProfile from "../CustomerProfile/CustomerProfile.Container";
import { AppState } from "../../../../states";
import { useApplicationService } from "../../../../services/application.service";
import { CustomerDetailWrapperStyles } from "./CustomerDetailWrapper.Styles";
import { UpdateDetailRequestModel } from "../../../../models/UpdateDetailRequestModel";

interface CustomerDetailProps {
  backToWizardStepper: () => void;
}

export type ComponentProps = StateToProps &
  DispatchToProps &
  CustomerDetailProps;

export const CustomerDetailWrapper: React.FC<ComponentProps> = ({
  applicationId,
  setCustomerDetails,
  backToWizardStepper,
}) => {
  const state: AppState = Manager.getInstance().store.getState();
  const applicationService = useApplicationService(
    state.flex.session.ssoTokenPayload.token
  );
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [isLoading, setIsLoading] = useState(false);
  const propertyList = [
    "title",
    "firstName",
    "middleName",
    "lastName",
    "dateOfBirth",
    "maritalStatus",
    "drivingLicenceType",
    "mobileNumber",
    "workNumber",
    "homeNumber",
    "emailAddress",
  ];

  const emailRegex = /\S+@\S+\.\S+/;

  const updateProfile = async (customerProfileModel: CustomerDetailModel) => {
    let hasError = false;
    if (!customerProfileModel.firstName) {
      errors.firstName = ["The first name field is required."];
      hasError = true;
    }
    if (!customerProfileModel.lastName) {
      errors.lastName = ["The last name field is required."];
      hasError = true;
    }
    if (customerProfileModel.maritalStatus?.maritalStatusId === -1) {
      errors.maritalStatus = ["The marital status field is required."];
      hasError = true;
    }
    if (customerProfileModel.drivingLicenceType?.drivingLicenceTypeId === -1) {
      errors.drivingLicenceType = [
        "The driving license type field is required.",
      ];
      hasError = true;
    }
    if (!customerProfileModel.emailAddress) {
      errors.emailAddress = ["The email field is required."];
      hasError = true;
    }
    if (
      customerProfileModel.emailAddress &&
      !emailRegex.test(customerProfileModel.emailAddress)
    ) {
      errors.emailAddress = ["The email field must be a valid email."];
      hasError = true;
    }
    if (!customerProfileModel.dateOfBirth) {
      hasError = true;
    }
    setErrors(errors);

    if (!hasError) {
      // filter properties to be updated
      const customerDetail = Object.keys(customerProfileModel)
        .filter((key) => propertyList.includes(key))
        .reduce((object, key) => {
          return {
            ...object,
            [key]: (customerProfileModel as any)[key],
          };
        }, {});

      try {
        setIsLoading(true);

        // prepare patch request data
        const updateRequestList: UpdateDetailRequestModel[] = [];
        Object.keys(customerDetail).forEach((key: string, index: number) => {
          updateRequestList.push(
            preparePatchData(key, Object.values(customerDetail)[index])
          );
        });

        await applicationService
          .updateBaseApplicationDetail(applicationId, updateRequestList)
          .then(() => {
            // show success notification
            showMessage(
              CustomNotificationType.SuccessNotification,
              "Customer detail updated successfully!"
            );
            // update customer detail in redux
            Object.keys(customerDetail).forEach((key, index) =>
              setCustomerDetails(
                key as any,
                Object.values(customerDetail)[index]
              )
            );
            // wait till detail updated in redux
            setTimeout(() => {
              // return to wizard
              backToWizardStepper();
            }, 0);
          });
      } catch (error) {
        setErrors({});
        showErrorMessage(
          "Error in updating customer detail, please try again!",
          "",
          true
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <CustomerDetailWrapperStyles>
      {isLoading && <Loading />}
      <CustomerProfile errorList={errors} updateProfile={updateProfile} />
    </CustomerDetailWrapperStyles>
  );
};
