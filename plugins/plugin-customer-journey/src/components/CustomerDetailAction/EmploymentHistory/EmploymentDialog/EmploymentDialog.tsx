import React, { useState, useMemo } from "react";
import { v4 } from "uuid";

import {
  CustomerEmploymentModel,
  CustomInput,
  CustomSelect,
  ResponsiveDialog,
  Shared,
  BaseAddressModel,
  OccupationStatusModel,
} from "@common/components";
import {
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  Typography,
  InputLabel,
} from "@material-ui/core";

import { EmploymentDialogProps } from "./EmploymentDialog.Props";
import {
  EmploymentDialogStyles,
  ResponsiveDialogContentStyles,
} from "./EmploymentDialog.Styles";
import Loading from "../../../LoadingComponent/Loading";
import { AddressSearch } from "../../../AddressSearch/AddressSearch";

export const EmploymentDialog: React.FC<EmploymentDialogProps> = ({
  open,
  isEdit,
  loading,
  activeEmployment,
  onSave,
  onClose,
  onDelete,
}) => {
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [employment, setEmployment] =
    useState<CustomerEmploymentModel>(activeEmployment);
  const [openConfirmation, setOpenConfirmation] = useState<boolean>(false);

  const isEmployed: boolean = useMemo(() => {
    const index = Shared.OccupationStatuses.findIndex(
      (s: OccupationStatusModel) =>
        s.name.toLocaleLowerCase() === "not employed"
    );
    return employment?.occupationStatus?.id !== index + 1;
  }, [employment?.occupationStatus?.id]);

  const isEmployerAddressExist: boolean = useMemo(() => {
    return !!(
      employment?.employerAddress.postcode ||
      employment?.employerAddress.buildingName ||
      employment?.employerAddress.subBuilding ||
      employment?.employerAddress.buildingNumber ||
      employment?.employerAddress.streetName ||
      employment?.employerAddress.town
    );
  }, [employment?.employerAddress]);

  const onConfirm = () => {
    const errorObj: Record<string, string[]> = {};
    if (employment?.occupationStatus?.id <= 0) {
      errorObj.occupationStatus = ["Occupation status is required"];
    }

    if (
      employment.yearsAtEmployment === 0 &&
      employment.monthsAtEmployment === 0
    ) {
      errorObj.employmentTime = ["Experience is required"];
    }
    if (isEmployed) {
      if (employment.occupation === "") {
        errorObj.occupation = ["Occupation is required"];
      }

      if (employment.employerName === "") {
        errorObj.employerName = ["Name of employer is required"];
      }

      if (employment.employerPhoneNumber === "") {
        errorObj.employerPhoneNumber = ["Phone number of employer is required"];
      }

      if (!isEmployerAddressExist) {
        errorObj.employerAddress = ["Address of employer is required"];
      }
    }

    if (!isEmployed && employment.employerAddress.town === "") {
      errorObj.town = ["Town is required"];
    }

    setErrors(errorObj);
    if (Object.keys(errorObj).length > 0) {
      return;
    }

    const employmentDetail = { ...employment };
    // reset fields if occupation status is "Not Employed"
    if (!isEmployed) {
      employmentDetail.occupation = "";
      employmentDetail.employerName = "";
      employmentDetail.employerPhoneNumber = "";
      employmentDetail.employerAddress = new BaseAddressModel();
      employmentDetail.employerAddress.town = employment.employerAddress.town;
    }
    onSave(employmentDetail);
  };

  const onClickDelete = () => {
    setOpenConfirmation(true);
  };

  const onChange =
    (key: keyof CustomerEmploymentModel | keyof BaseAddressModel) =>
    (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
      let updatedValue: any = event.target.value;
      if (key === "occupationStatus") {
        updatedValue = Shared.OccupationStatuses.find(
          (s: OccupationStatusModel) => s.id === Number(updatedValue)
        );
      }
      if (key === "town") {
        setEmployment({
          ...employment,
          employerAddress: {
            ...employment.employerAddress,
            [key]: updatedValue,
          },
        });
        return;
      }
      setEmployment({
        ...employment,
        [key]: updatedValue,
      });
    };

  const onCheck = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
    checked: boolean
  ) => {
    event.stopPropagation();
    setEmployment({
      ...employment,
      isCurrentEmployment: checked,
    });
  };

  const handleUpdateAddress = (baseAddressModel: BaseAddressModel) => {
    setEmployment({
      ...employment,
      employerAddress: {
        ...employment.employerAddress,
        buildingName: baseAddressModel.buildingName,
        buildingNumber: baseAddressModel.buildingNumber,
        postcode: baseAddressModel.postcode,
        streetName: baseAddressModel.streetName,
        subBuilding: baseAddressModel.subBuilding,
        town: baseAddressModel.town,
      },
    });
  };

  return (
    <EmploymentDialogStyles item xs={12}>
      {open && (
        <ResponsiveDialog
          title={isEdit ? "Edit Employment" : "Add Employment"}
          open={open}
          onCancel={onClose}
          onConfirm={onConfirm}
          maxWidth="sm"
          showActionButtons
          showDeleteButton={isEdit}
          onDelete={onClickDelete}
          okText="Save Employment"
          cancelText="Cancel"
          deleteText="Delete Employment"
        >
          <ResponsiveDialogContentStyles item xs={12}>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              spacing={8}
            >
              <Grid item xs={12}>
                <Typography component="p" className="employment-label">
                  Employment Details
                </Typography>
              </Grid>
              <Grid item xs={12} className="occupation-status">
                <CustomSelect
                  label="Occupation Status"
                  onChange={onChange("occupationStatus")}
                  value={employment.occupationStatus?.id ?? -1}
                  isRequired
                  errors={errors.occupationStatus}
                >
                  <MenuItem value={-1}>
                    <em>Select a status</em>
                  </MenuItem>
                  {Shared.OccupationStatuses.map(
                    (occupationStatus: OccupationStatusModel) => (
                      <MenuItem key={v4()} value={occupationStatus.id}>
                        {occupationStatus.name}
                      </MenuItem>
                    )
                  )}
                </CustomSelect>
              </Grid>
              <Grid item xs={6} className="employment-time">
                <CustomSelect
                  label="Years"
                  onChange={onChange("yearsAtEmployment")}
                  value={employment.yearsAtEmployment ?? 0}
                  isRequired
                  errors={errors.employmentTime}
                >
                  {Array.from(Array(25).keys()).map((n) => (
                    <MenuItem key={v4()} value={n}>
                      {`${n} Years`}
                    </MenuItem>
                  ))}
                </CustomSelect>
              </Grid>
              <Grid item xs={6}>
                <CustomSelect
                  label="Months"
                  onChange={onChange("monthsAtEmployment")}
                  value={employment.monthsAtEmployment ?? 0}
                  isRequired
                  errors={errors.employmentTime}
                >
                  {Array.from(Array(12).keys()).map((n) => (
                    <MenuItem key={v4()} value={n}>
                      {`${n} Months`}
                    </MenuItem>
                  ))}
                </CustomSelect>
              </Grid>
              {isEmployed && (
                <Grid item xs={12} className="emp-occupation">
                  <CustomInput
                    label="Occupation"
                    value={employment.occupation ?? ""}
                    onChange={onChange("occupation")}
                    errors={errors.occupation}
                    isRequired
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <FormControlLabel
                  className="form-control-label"
                  control={
                    <Checkbox
                      value="currentEmployment"
                      checked={employment.isCurrentEmployment ?? false}
                      onChange={onCheck}
                    />
                  }
                  label="This is their current employment"
                />
              </Grid>
              {isEmployed && (
                <>
                  <Grid item xs={12}>
                    <Typography component="p" className="employment-label">
                      Employer Details
                    </Typography>
                  </Grid>
                  <Grid item xs={12} className="employer-name">
                    <CustomInput
                      label="Employer name"
                      value={employment.employerName ?? ""}
                      onChange={onChange("employerName")}
                      errors={errors.employerName}
                      isRequired
                    />
                  </Grid>
                  <Grid item xs={12} className="employer-phone-no">
                    <CustomInput
                      label="Employer Phone No"
                      value={employment.employerPhoneNumber ?? ""}
                      onChange={onChange("employerPhoneNumber")}
                      errors={errors.employerPhoneNumber}
                      isRequired
                    />
                  </Grid>
                  <Grid item xs={12} className="employer-address">
                    <InputLabel
                      shrink
                      required
                      error={!!errors.employerAddress}
                    >
                      Employer Address
                    </InputLabel>
                    <AddressSearch
                      updateAddress={handleUpdateAddress}
                      address={
                        isEmployerAddressExist
                          ? employment.employerAddress
                          : undefined
                      }
                    />
                    {!!errors.employerAddress && (
                      <p className="employer-address-error">
                        {errors.employerAddress}
                      </p>
                    )}
                  </Grid>
                </>
              )}
              {!isEmployed && (
                <Grid item xs={12} className="town">
                  <CustomInput
                    label="Town"
                    value={employment.employerAddress.town ?? ""}
                    onChange={onChange("town")}
                    errors={errors.town}
                    isRequired
                  />
                </Grid>
              )}
            </Grid>
            {loading && <Loading />}
          </ResponsiveDialogContentStyles>
        </ResponsiveDialog>
      )}
      {openConfirmation && (
        <ResponsiveDialog
          open={openConfirmation}
          maxWidth="xs"
          onConfirm={onDelete}
          onCancel={() => setOpenConfirmation(false)}
          showActionButtons
          okText="Yes"
          cancelText="No"
          isConfirmationDialog
        >
          <div className="confirmation-message">
            Are you sure you want to delete this employment?
          </div>
        </ResponsiveDialog>
      )}
    </EmploymentDialogStyles>
  );
};
