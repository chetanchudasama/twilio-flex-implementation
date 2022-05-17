import {
  AddressItemModel,
  CustomSelect,
  ResponsiveDialog,
  Shared,
  BaseAddressModel,
  ResidentialStatusModel,
} from "@common/components";
import {
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import React, { useMemo, useState } from "react";
import { v4 } from "uuid";
import { AddressDialogProps } from "./AddressDialog.Props";
import {
  AddressDialogStyles,
  ResponsiveDialogContentStyles,
} from "./AddressDialog.Styles";
import Loading from "../../../LoadingComponent/Loading";
import { AddressSearch } from "../../../AddressSearch/AddressSearch";

export const AddressDialog: React.FC<AddressDialogProps> = ({
  activeAddress,
  open,
  onClose,
  onDelete,
  onSave,
  loading,
  isEdit,
}) => {
  const [openConfirmation, setOpenConfirmation] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [address, setAddress] = useState<AddressItemModel>(activeAddress);

  const isAddressExist: boolean = useMemo(() => {
    return !!(
      address.postcode ||
      address.buildingName ||
      address.subBuilding ||
      address.buildingNumber ||
      address.streetName ||
      address.town
    );
  }, [address]);

  const onChangeAddressDetail = (event: any, propertyName: string) => {
    const {
      target: { value, checked },
    } = event;

    if (propertyName === "isPrimaryAddress") {
      setAddress({
        ...address,
        [propertyName]: checked,
      });
      return;
    }
    if (propertyName === "residentialStatus") {
      const residentialStatus: ResidentialStatusModel | undefined =
        Shared.residentialStatuses.find(
          (s: ResidentialStatusModel) => s.id === Number(value)
        );
      setAddress({
        ...address,
        addressStatus: {
          ...address.addressStatus,
          addressStatusId: residentialStatus ? residentialStatus.id : -1,
          addressStatusName: residentialStatus ? residentialStatus.name : "",
        },
      });
    } else {
      setAddress({
        ...address,
        addressStatus: {
          ...address.addressStatus,
          [propertyName]: value,
        },
      });
    }
  };

  const onSaveAddressDetail = () => {
    const errorObj: Record<string, string[]> = {};
    if (address.addressStatus.addressStatusId <= 0) {
      errorObj.residentialStatus = ["The residential status is required."];
    }

    if (
      address.addressStatus.yearsAtAddress === 0 &&
      address.addressStatus.monthsAtAddress === 0
    ) {
      errorObj.residentialPeriod = ["Residential period is required."];
    }

    if (!isAddressExist) {
      errorObj.customerAddress = ["Address of customer is required."];
    }

    setErrors(errorObj);

    if (Object.keys(errorObj).length === 0) {
      onSave(address);
    }
  };

  const handleUpdateAddress = (baseAddressModel: BaseAddressModel) => {
    setAddress({
      ...address,
      buildingName: baseAddressModel.buildingName,
      buildingNumber: baseAddressModel.buildingNumber,
      postcode: baseAddressModel.postcode,
      streetName: baseAddressModel.streetName,
      subBuilding: baseAddressModel.subBuilding,
      town: baseAddressModel.town,
    });
  };

  return (
    <AddressDialogStyles item xs={12}>
      {open && (
        <ResponsiveDialog
          title={isEdit ? "Edit Address" : "Add Address"}
          open={open}
          onCancel={onClose}
          onConfirm={onSaveAddressDetail}
          maxWidth="sm"
          showActionButtons
          showDeleteButton={isEdit}
          onDelete={() => {
            setOpenConfirmation(true);
          }}
          okText="Save Address"
          cancelText="Cancel"
          deleteText="Delete Address"
        >
          <ResponsiveDialogContentStyles item xs={12}>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              spacing={8}
            >
              <Grid item xs={12} className="address-container">
                <InputLabel shrink required error={!!errors.customerAddress}>
                  Address
                </InputLabel>
                <AddressSearch
                  updateAddress={handleUpdateAddress}
                  address={isAddressExist ? activeAddress : undefined}
                />
                {!!errors.customerAddress && (
                  <p className="address-error">{errors.customerAddress}</p>
                )}
              </Grid>
              <Grid item xs={12} className="residential-status">
                <CustomSelect
                  label="Residential status"
                  onChange={(event: any) =>
                    onChangeAddressDetail(event, "residentialStatus")
                  }
                  value={address.addressStatus.addressStatusId || -1}
                  isRequired
                  errors={errors.residentialStatus}
                >
                  <MenuItem value={-1}>
                    <em>Select a status</em>
                  </MenuItem>
                  {Shared.residentialStatuses.map(
                    (status: ResidentialStatusModel) => (
                      <MenuItem key={v4()} value={status.id}>
                        {status.name}
                      </MenuItem>
                    )
                  )}
                </CustomSelect>
              </Grid>
              <Grid item xs={6} className="residential-period">
                <CustomSelect
                  label="Years"
                  onChange={(event: any) =>
                    onChangeAddressDetail(event, "yearsAtAddress")
                  }
                  value={address.addressStatus.yearsAtAddress}
                  isRequired
                  errors={errors.residentialPeriod}
                >
                  {Array.from(Array(25).keys()).map((n: number) => (
                    <MenuItem key={v4()} value={n}>
                      {`${n} Years`}
                    </MenuItem>
                  ))}
                </CustomSelect>
              </Grid>
              <Grid item xs={6} className="residential-period">
                <CustomSelect
                  label="Months"
                  onChange={(event: any) =>
                    onChangeAddressDetail(event, "monthsAtAddress")
                  }
                  value={address.addressStatus.monthsAtAddress}
                  isRequired
                  errors={errors.residentialPeriod}
                >
                  {Array.from(Array(12).keys()).map((n: number) => (
                    <MenuItem key={v4()} value={n}>
                      {`${n} Months`}
                    </MenuItem>
                  ))}
                </CustomSelect>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={address.isPrimaryAddress}
                      onChange={(event) =>
                        onChangeAddressDetail(event, "isPrimaryAddress")
                      }
                      value="isPrimaryAddress"
                    />
                  }
                  label="This is their current address"
                />
              </Grid>
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
            Are you sure you want to delete this address?
          </div>
        </ResponsiveDialog>
      )}
    </AddressDialogStyles>
  );
};
