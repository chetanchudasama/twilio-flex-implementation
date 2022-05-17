import {
  CustomerDetailModel,
  CustomInput,
  CustomSelect,
  MuiDatePicker,
  Shared,
  TitleModel,
  MaritalStatusModel,
  DrivingLicenceTypeModel,
} from "@common/components";
import React, { ChangeEvent, useState } from "react";
import { Button, Grid, MenuItem } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

import { CustomerProfileStyles } from "./CustomerProfile.Styles";
import { StateToProps, DispatchToProps } from "./CustomerProfile.Props";

export interface CustomerProfileProps {
  errorList: Record<string, string[]>;
  updateProfile: (customerDetail: CustomerDetailModel) => void;
}

export type ComponentProps = StateToProps &
  DispatchToProps &
  CustomerProfileProps;

export const CustomerProfile: React.FC<ComponentProps> = ({
  customer,
  errorList,
  updateProfile,
}) => {
  const [customerProfile, setCustomerProfile] =
    useState<CustomerDetailModel>(customer);
  const [errors, setErrors] = useState<Record<string, string[]>>(errorList);
  const [highlightRequiredDetail, setHighlightRequiredDetail] = useState(false);

  const emailRegex = /\S+@\S+\.\S+/;

  const handleCustomerProfileChange = (
    value: string | Date | number | null,
    property: string
  ) => {
    if (highlightRequiredDetail) {
      if (property === "firstName") {
        errors.firstName = value ? [] : ["The first name field is required."];
      }
      if (property === "lastName") {
        errors.lastName = value ? [] : ["The last name field is required."];
      }
      if (property === "maritalStatus") {
        errors.maritalStatus =
          value !== -1 ? [] : ["The marital status field is required."];
      }
      if (property === "drivingLicenceType") {
        errors.drivingLicenceType =
          value !== -1 ? [] : ["The driving license type field is required."];
      }
      if (property === "emailAddress") {
        if (value) {
          errors.emailAddress = !emailRegex.test(value.toString())
            ? ["The email field must be a valid email."]
            : [];
        } else {
          errors.emailAddress = ["The email field is required."];
        }
      }
      setErrors(errors);
    }
    let updatedValue:
      | string
      | Date
      | number
      | null
      | TitleModel
      | MaritalStatusModel
      | DrivingLicenceTypeModel;

    if (property === "title") {
      const selectedTitle = Shared.titles.find(
        (title) => title.id === Number(value)
      );
      updatedValue = {
        titleId: selectedTitle?.id ?? -1,
        titleName: selectedTitle?.description ?? "",
      };
    } else if (property === "maritalStatus") {
      const maritalStatus = Shared.maritalStatuses.find(
        (status) => status.id === Number(value)
      );
      updatedValue = {
        maritalStatusId: maritalStatus?.id ?? -1,
        maritalStatusName: maritalStatus?.description ?? "",
      };
    } else if (property === "drivingLicenceType") {
      const licenceType = Shared.licenceTypes.find(
        (drivingLicenceType) => drivingLicenceType.id === Number(value)
      );
      updatedValue = {
        drivingLicenceTypeId: licenceType?.id ?? -1,
        drivingLicenceTypeName: licenceType?.description ?? "",
      };
    } else {
      updatedValue = value;
    }

    setCustomerProfile({
      ...customerProfile,
      fullName: customerProfile.fullName,
      primaryAddress: customerProfile.primaryAddress,
      address: customerProfile.address,
      [property]: updatedValue,
    });
  };

  return (
    <CustomerProfileStyles>
      <Card>
        <Grid container>
          <CardContent className="card-content">
            <Grid item xs={8} className="customer-detail-title">
              Customer Details
            </Grid>
            <Grid item xs={8}>
              <CustomSelect
                value={customerProfile.title.titleId ?? -1}
                onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                  handleCustomerProfileChange(
                    event.target.value as unknown as number,
                    "title"
                  )
                }
                label="Title"
              >
                <MenuItem value={-1}>
                  <em>Select title</em>
                </MenuItem>
                {Shared.titles.map((title) => {
                  return (
                    <MenuItem key={title.description} value={title.id}>
                      {title.description}
                    </MenuItem>
                  );
                })}
              </CustomSelect>
            </Grid>
            <Grid item xs={8}>
              <CustomInput
                label="First name"
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleCustomerProfileChange(event.target.value, "firstName")
                }
                value={customerProfile.firstName}
                errors={errors.firstName}
                isRequired
              />
            </Grid>
            <Grid item xs={8}>
              <CustomInput
                label="Middle name(s)"
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleCustomerProfileChange(event.target.value, "middleName")
                }
                value={customerProfile.middleName}
              />
            </Grid>
            <Grid item xs={8}>
              <CustomInput
                label="Last name"
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleCustomerProfileChange(event.target.value, "lastName")
                }
                value={customerProfile.lastName}
                errors={errors.lastName}
                isRequired
              />
            </Grid>
            <Grid item xs={8} className="birthDate">
              <MuiDatePicker
                value={customerProfile.dateOfBirth}
                label="D.O.B"
                handleDateChange={(value: Date | null) =>
                  handleCustomerProfileChange(value, "dateOfBirth")
                }
                disableFutureDates
                isRequired
                error={!customerProfile.dateOfBirth && highlightRequiredDetail}
                isOutlinedVariant
              />
            </Grid>
            <Grid item xs={8}>
              <CustomSelect
                value={customerProfile.maritalStatus?.maritalStatusId ?? -1}
                onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                  handleCustomerProfileChange(
                    event.target.value as unknown as number,
                    "maritalStatus"
                  )
                }
                label="Marital Status"
                errors={errors.maritalStatus}
                isRequired
              >
                <MenuItem value={-1}>
                  <em>Select marital status</em>
                </MenuItem>
                {Shared.maritalStatuses.map((status) => {
                  return (
                    <MenuItem key={status.description} value={status.id}>
                      {status.description}
                    </MenuItem>
                  );
                })}
              </CustomSelect>
            </Grid>
            <Grid item xs={8}>
              <CustomSelect
                value={
                  customerProfile.drivingLicenceType?.drivingLicenceTypeId ?? -1
                }
                onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                  handleCustomerProfileChange(
                    event.target.value as unknown as number,
                    "drivingLicenceType"
                  )
                }
                label="Driving License Type"
                errors={errors.drivingLicenceType}
                isRequired
              >
                <MenuItem value={-1}>
                  <em>Select type</em>
                </MenuItem>
                {Shared.licenceTypes.map((licence) => {
                  return (
                    <MenuItem key={licence.description} value={licence.id}>
                      {licence.description}
                    </MenuItem>
                  );
                })}
              </CustomSelect>
            </Grid>
            <Grid item xs={8}>
              <CustomInput
                label="Email address"
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleCustomerProfileChange(
                    event.target.value,
                    "emailAddress"
                  )
                }
                value={customerProfile.emailAddress}
                errors={errors.emailAddress}
                isRequired
              />
            </Grid>
            <Grid item xs={8}>
              <CustomInput
                label="Mobile No"
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleCustomerProfileChange(
                    event.target.value,
                    "mobileNumber"
                  )
                }
                value={customerProfile.mobileNumber}
              />
            </Grid>
            <Grid item xs={8}>
              <CustomInput
                label="Daytime Phone"
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleCustomerProfileChange(event.target.value, "workNumber")
                }
                value={customerProfile.workNumber}
              />
            </Grid>
            <Grid item xs={8}>
              <CustomInput
                label="Evening Phone"
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleCustomerProfileChange(event.target.value, "homeNumber")
                }
                value={customerProfile.homeNumber}
              />
            </Grid>
          </CardContent>
          <CardActions className="card-action">
            <Grid item xs={8}>
              <Button
                variant="contained"
                color="secondary"
                className="update-detail-btn"
                onClick={() => {
                  setHighlightRequiredDetail(true);
                  updateProfile(customerProfile);
                }}
              >
                Update Details
              </Button>
            </Grid>
          </CardActions>
        </Grid>
      </Card>
    </CustomerProfileStyles>
  );
};
