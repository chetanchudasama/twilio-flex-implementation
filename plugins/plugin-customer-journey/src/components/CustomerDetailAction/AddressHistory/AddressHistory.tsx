import React, { useState } from "react";
import { Grid, Button, Paper, Typography } from "@material-ui/core";
import { AddressItemModel } from "@common/components";
import { AppState } from "states";
import { Manager } from "@twilio/flex-ui";
import AddIcon from "@material-ui/icons/Add";
import { v4 } from "uuid";
import { preparePatchData } from "../../../helpers/commonFunctions";
import {
  CustomNotificationType,
  showErrorMessage,
  showMessage,
} from "../../../Notifications";
import { StateToProps, DispatchToProps } from "./AddressHistory.Props";
import { AddressDetail } from "./AddressDetail/AddressDetail";
import { AddressHistoryStyles } from "./AddressHistory.Styles";
import { AddressDialog } from "./AddressDialog/AddressDialog";
import { useApplicationService } from "../../../services/application.service";

export type AddressHistoryProps = StateToProps & DispatchToProps;

export const AddressHistory: React.FC<AddressHistoryProps> = ({
  applicationId,
  currentAddress,
  previousAddressList,
  setCustomerDetails,
}) => {
  const state: AppState = Manager.getInstance().store.getState();
  const applicationService = useApplicationService(
    state.flex.session.ssoTokenPayload.token
  );
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [activeAddress, setActiveAddress] = useState<AddressItemModel>(
    new AddressItemModel()
  );
  const [loading, setLoading] = useState<boolean>(false);

  const deleteAddress = () => {
    const addressList: AddressItemModel[] = currentAddress
      ? [...previousAddressList, currentAddress]
      : [...previousAddressList];

    const tempAddressList = addressList.filter(
      (addressItem) =>
        JSON.stringify(addressItem) !== JSON.stringify(activeAddress)
    );

    applicationService
      .updateBaseApplicationDetail(applicationId, [
        preparePatchData("addresses", tempAddressList),
      ])
      .then(() => {
        setCustomerDetails("addresses", tempAddressList);
        showMessage(
          CustomNotificationType.SuccessNotification,
          "Address detail deleted successfully!"
        );
      })
      .catch(() => {
        showErrorMessage("Something went wrong, please try again!", "", true);
      })
      .finally(() => {
        setOpenDialog(false);
      });
  };

  const updateAddress = (address: AddressItemModel) => {
    setLoading(true);

    let addressList: AddressItemModel[] = currentAddress
      ? [...previousAddressList, currentAddress]
      : [...previousAddressList];

    const index = addressList.findIndex(
      (addressItem) =>
        JSON.stringify(addressItem) === JSON.stringify(activeAddress)
    );

    // if currentAddress has isPrimaryAddress flag true, set false for remaining in list
    if (address.isPrimaryAddress && currentAddress) {
      const tempAddress = { ...currentAddress, isPrimaryAddress: false };
      addressList = [...previousAddressList, tempAddress];
    }

    if (index > -1) {
      addressList.splice(index, 1, address);
    } else {
      addressList.push(address);
    }

    applicationService
      .updateBaseApplicationDetail(applicationId, [
        preparePatchData("addresses", addressList),
      ])
      .then(() => {
        setCustomerDetails("addresses", addressList);
        showMessage(
          CustomNotificationType.SuccessNotification,
          "Address detail updated successfully!"
        );
      })
      .catch(() => {
        showErrorMessage("Something went wrong, please try again!", "", true);
      })
      .finally(() => {
        setOpenDialog(false);
        setLoading(false);
      });
  };

  const onSetActiveAddress = (address: AddressItemModel) => {
    setActiveAddress({ ...address });
    setOpenDialog(true);
  };

  return (
    <>
      <AddressHistoryStyles item xs={12}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={16}
        >
          <Grid item xs={12} className="address-history-header">
            Address History
          </Grid>
          <Grid item xs={12} className="paper-container">
            {currentAddress && (
              <Paper className="paper" elevation={1}>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={12}>
                    <Typography component="p" className="address-header">
                      Current Address
                    </Typography>
                  </Grid>
                  <AddressDetail
                    addressItem={currentAddress}
                    key={v4()}
                    onEdit={() => onSetActiveAddress(currentAddress)}
                  />
                </Grid>
              </Paper>
            )}
            {previousAddressList.length > 0 && (
              <Paper className="paper" elevation={1}>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={12}>
                    <Typography component="p" className="address-header">
                      Previous Addresses
                    </Typography>
                  </Grid>
                  {previousAddressList.map((address) => (
                    <AddressDetail
                      addressItem={address}
                      key={v4()}
                      onEdit={() => onSetActiveAddress(address)}
                    />
                  ))}
                </Grid>
              </Paper>
            )}
            {!currentAddress && previousAddressList.length === 0 && (
              <Typography component="p" className="address-header">
                No Address found.
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} className="add-btn-container">
            <Button
              variant="contained"
              color="secondary"
              className="add-address-btn"
              onClick={() => onSetActiveAddress(new AddressItemModel())}
            >
              <AddIcon color="inherit" fontSize="small" className="add-icon" />
              Add Address
            </Button>
          </Grid>
        </Grid>
      </AddressHistoryStyles>
      {openDialog && (
        <AddressDialog
          isEdit={activeAddress.addressStatus.addressStatusId > -1}
          open={openDialog}
          activeAddress={activeAddress}
          loading={loading}
          onClose={() => setOpenDialog(false)}
          onDelete={deleteAddress}
          onSave={updateAddress}
        />
      )}
    </>
  );
};
