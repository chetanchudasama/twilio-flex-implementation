import React, { useState, ChangeEvent, useMemo } from "react";
import { Manager } from "@twilio/flex-ui";
import { BankDetailModel, Shared, CustomInput } from "@common/components";
import { Grid, Button, CardContent, CardActions } from "@material-ui/core";
import { BankDetailStyles } from "./BankDetail.Styles";
import { useApplicationService } from "../../../services/application.service";
import { AppState } from "../../../states";
import { StateToProps, DispatchToProps } from "./BankDetail.Props";
import { preparePatchData } from "../../../helpers/commonFunctions";
import {
  showMessage,
  showErrorMessage,
  CustomNotificationType,
} from "../../../Notifications/index";
import Loading from "../../LoadingComponent/Loading.Container";
import { UpdateDetailRequestModel } from "../../../models/UpdateDetailRequestModel";

interface BankDetailProps {
  backToWizardStepper: () => void;
}

export type ComponentProps = StateToProps & DispatchToProps & BankDetailProps;

export const BankDetail: React.FC<ComponentProps> = ({
  applicationId,
  bankDetail,
  setCustomerDetails,
  backToWizardStepper,
}) => {
  const state: AppState = Manager.getInstance().store.getState();
  const applicationService = useApplicationService(
    state.flex.session.ssoTokenPayload.token
  );
  const [bankDetailModel, setBankDetail] =
    useState<BankDetailModel>(bankDetail);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [highlightRequiredDetail, setHighlightRequiredDetail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const propertyList = [
    "bankName",
    "monthsAtBank",
    "nameOnBankAccount",
    "accountNumber",
    "sortCode",
    "netMonthlyIncome",
  ];

  // format sort code using pattern "DD-DD-DD"
  const formattedSortCode = useMemo(() => {
    const tempSortCodeValue = bankDetailModel.sortCode;
    if (tempSortCodeValue.length === 3 || tempSortCodeValue.length === 4) {
      return `${tempSortCodeValue.substring(
        0,
        2
      )}-${tempSortCodeValue.substring(2)}`;
    }
    if (tempSortCodeValue.length === 5 || tempSortCodeValue.length === 6) {
      return `${tempSortCodeValue.substring(
        0,
        2
      )}-${tempSortCodeValue.substring(2, 4)}-${tempSortCodeValue.substring(
        4
      )}`;
    }
    return tempSortCodeValue;
  }, [bankDetailModel.sortCode]);

  const handleBankDetailChange = (value: string, propertyName: string) => {
    const tempSortCodeValue =
      propertyName === "sortCode" ? value.replaceAll("-", "") : "";
    if (
      (tempSortCodeValue && tempSortCodeValue.length > 6) ||
      (propertyName === "accountNumber" && value && value.length > 8)
    ) {
      // do not update sortCode value, if length of value > 6
      // do not update accountNumber value, if length of value > 8
      return;
    }

    switch (propertyName) {
      case "monthsAtBank":
      case "accountNumber":
      case "sortCode":
      case "netMonthlyIncome":
        if (
          Shared.isNumericValue(
            tempSortCodeValue || value,
            propertyName === "netMonthlyIncome"
          ) ||
          value === ""
        ) {
          if (highlightRequiredDetail) {
            if (propertyName === "accountNumber") {
              errors.accountNumber =
                value && value.length !== 8
                  ? ["The account number field must be 8 digits long."]
                  : [];
            }
            if (propertyName === "sortCode") {
              errors.sortCode =
                tempSortCodeValue && tempSortCodeValue.length !== 6
                  ? ["The sort code field must be valid."]
                  : [];
            }
            if (propertyName === "netMonthlyIncome") {
              errors.netMonthlyIncome =
                value === ""
                  ? ["The Net monthly income field is required."]
                  : [];
            }
            setErrors(errors);
          }
          setBankDetail({
            ...bankDetailModel,
            [propertyName]: tempSortCodeValue || value,
          });
        }
        break;
      default:
        setBankDetail({
          ...bankDetailModel,
          [propertyName]: value,
        });
    }
  };

  const updateBankDetails = async () => {
    setHighlightRequiredDetail(true);
    let hasError = false;

    if (
      bankDetailModel.accountNumber &&
      bankDetailModel.accountNumber.length !== 8
    ) {
      errors.accountNumber = [
        "The account number field must be 8 digits long.",
      ];
      hasError = true;
    }
    if (bankDetailModel.sortCode && bankDetailModel.sortCode.length !== 6) {
      errors.sortCode = ["The sort code field must be valid."];
      hasError = true;
    }
    if (!bankDetailModel.netMonthlyIncome) {
      errors.netMonthlyIncome = ["The Net monthly income field is required."];
      hasError = true;
    }
    setErrors(errors);
    if (!hasError) {
      // prepare patch request data
      const bankInformation = {
        ...bankDetailModel,
        netMonthlyIncome: Number(bankDetailModel.netMonthlyIncome),
        monthsAtBank: Number(bankDetailModel.monthsAtBank),
      };

      const updatedPropertyList = propertyList.filter(
        (property) =>
          JSON.stringify(bankInformation[property as keyof BankDetailModel]) !==
          JSON.stringify(bankDetail[property as keyof BankDetailModel])
      );

      if (!updatedPropertyList.length) {
        // skip api call if detail is not updated
        return;
      }

      // prepare patch request data
      const updateRequestList: UpdateDetailRequestModel[] = [];
      updatedPropertyList.forEach((key) => {
        updateRequestList.push(
          preparePatchData(
            `bankDetails/${key}`,
            bankInformation[key as keyof BankDetailModel]
          )
        );
      });

      try {
        setIsLoading(true);
        await applicationService
          .updateBaseApplicationDetail(applicationId, updateRequestList)
          .then(() => {
            // show success notification
            showMessage(
              CustomNotificationType.SuccessNotification,
              "Customer bank detail updated successfully!"
            );
            // update bank detail in redux
            setCustomerDetails("bankDetails", bankInformation);
            // wait till detail updated in redux
            setTimeout(() => {
              // return to wizard
              backToWizardStepper();
            }, 0);
          });
      } catch (error) {
        setErrors({});
        showErrorMessage(
          "Error in updating bank detail, please try again!",
          "",
          true
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <BankDetailStyles>
      {isLoading && <Loading />}
      <Grid container>
        <CardContent className="card-content">
          <Grid item xs={8} className="bank-detail-header">
            Bank details
          </Grid>
          <Grid item xs={8}>
            <CustomInput
              value={bankDetailModel.bankName}
              label="Bank name"
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                handleBankDetailChange(event.target.value, "bankName")
              }
            />
          </Grid>
          <Grid item xs={8}>
            <CustomInput
              value={bankDetailModel.monthsAtBank}
              label="Months at bank"
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                handleBankDetailChange(event.target.value, "monthsAtBank")
              }
            />
          </Grid>
          <Grid item xs={8}>
            <CustomInput
              value={bankDetailModel.nameOnBankAccount}
              label="Name on bank account"
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                handleBankDetailChange(event.target.value, "nameOnBankAccount")
              }
            />
          </Grid>
          <Grid item xs={8}>
            <CustomInput
              value={bankDetailModel.accountNumber}
              label="Account no."
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                handleBankDetailChange(event.target.value, "accountNumber")
              }
              errors={errors.accountNumber}
            />
          </Grid>
          <Grid item xs={8}>
            <CustomInput
              value={formattedSortCode}
              label="Sort code"
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                handleBankDetailChange(event.target.value, "sortCode")
              }
              errors={errors.sortCode}
            />
          </Grid>
          <Grid item xs={8} className="monthly-income-container">
            <CustomInput
              value={bankDetailModel.netMonthlyIncome}
              label="Net monthly income"
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                handleBankDetailChange(event.target.value, "netMonthlyIncome")
              }
              isRequired
              errors={errors.netMonthlyIncome}
            />
          </Grid>
        </CardContent>
        <CardActions className="card-action">
          <Grid item xs={8}>
            <Button
              variant="contained"
              color="secondary"
              onClick={updateBankDetails}
              className="update-btn"
            >
              Update Details
            </Button>
          </Grid>
        </CardActions>
      </Grid>
    </BankDetailStyles>
  );
};
