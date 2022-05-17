import React, { useState, ChangeEvent } from "react";
import {
  Grid,
  TextField,
  InputLabel,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
} from "@material-ui/core";
import { ResponsiveDialog } from "../ResponsiveDialog/index";
import { MuiDatePicker } from "../MuiDatePicker/MuiDatePicker";
import { ThirdPartyAuthorizationDialogStyles } from "./ThirdPartyAuthorizationDialog.Styles";
import { ThirdPartyAuthorizationDetail } from "../models/ThirdPartyAuthorizationDetailModel";
import { ThirdPartyRemovalAuthor } from "../shared/enum";

export interface ThirdPartyAuthorizationDialogProps {
  open: boolean;
  thirdPartyAuthorizationInformation: ThirdPartyAuthorizationDetail;
  handleDialogClose: () => void;
  handleSaveThirdPartyDetail: (
    thirdPartyAuthorizationInfo: ThirdPartyAuthorizationDetail | null
  ) => void;
}

type ThirdPartyAuthorizationType =
  | "thirdPartyName"
  | "thirdPartyAddress"
  | "thirdPartyPostcode"
  | "thirdPartyDoNotDiscuss"
  | "thirdPartyRemovalAuthor"
  | "thirdPartyRemovalNotes";
type ThirdPartyAuthorizationDateType =
  | "thirdPartyDateOfBirth"
  | "thirdPartyExpiryDate";

export const ThirdPartyAuthorizationDialog: React.FC<ThirdPartyAuthorizationDialogProps> =
  ({
    open,
    thirdPartyAuthorizationInformation,
    handleDialogClose,
    handleSaveThirdPartyDetail,
  }) => {
    const [thirdPartyAuthorizationDetail, setThirdPartyAuthorizationDetail] =
      useState(thirdPartyAuthorizationInformation);
    const [highlighRequiredDetail, setHighlighRequiredDetail] = useState(false);
    const [openConfirmationPopup, setOpenConfirmationPopup] = useState(false);

    const updateThirdPartyAuthorizationDetail = (
      value: string,
      propertyName: ThirdPartyAuthorizationType
    ) => {
      const thirdPartyAuthorizationDetailTemp = {
        ...thirdPartyAuthorizationDetail,
      };
      thirdPartyAuthorizationDetailTemp[propertyName] = value;
      setThirdPartyAuthorizationDetail(thirdPartyAuthorizationDetailTemp);
    };

    const dateChangeHandler = (
      value: Date | null,
      propertyName: ThirdPartyAuthorizationDateType
    ) => {
      const thirdPartyAuthorizationDetailTemp = {
        ...thirdPartyAuthorizationDetail,
      };
      thirdPartyAuthorizationDetailTemp[propertyName] = value;
      setThirdPartyAuthorizationDetail(thirdPartyAuthorizationDetailTemp);
    };

    const isThirdPartyInfoSaved = () => {
      return !!thirdPartyAuthorizationInformation.thirdPartyName;
    };

    const submitThirdPartyAuthorizationDetail = () => {
      setHighlighRequiredDetail(true);
      if (
        !isThirdPartyInfoSaved()
          ? thirdPartyAuthorizationDetail.thirdPartyName &&
            thirdPartyAuthorizationDetail.thirdPartyAddress &&
            thirdPartyAuthorizationDetail.thirdPartyPostcode &&
            thirdPartyAuthorizationDetail.thirdPartyDoNotDiscuss &&
            thirdPartyAuthorizationDetail.thirdPartyDateOfBirth &&
            thirdPartyAuthorizationDetail.thirdPartyRemovalAuthor &&
            thirdPartyAuthorizationDetail.thirdPartyExpiryDate
          : thirdPartyAuthorizationDetail.thirdPartyRemovalNotes &&
            thirdPartyAuthorizationDetail.thirdPartyExpiryDate
      ) {
        handleSaveThirdPartyDetail(thirdPartyAuthorizationDetail);
      }
    };

    return (
      <div>
        <ResponsiveDialog
          title="Third-party permission"
          open={open}
          onCancel={handleDialogClose}
          onConfirm={submitThirdPartyAuthorizationDetail}
          maxWidth="sm"
          showActionButtons
          cancelText="Cancel"
          okText={isThirdPartyInfoSaved() ? "Renew" : "Save"}
          showDeleteButton={!!isThirdPartyInfoSaved()}
          onDelete={() => {
            setOpenConfirmationPopup(true);
          }}
        >
          <ThirdPartyAuthorizationDialogStyles>
            <Grid
              container
              spacing={0}
              className="third-party-permission-container"
            >
              <Grid xs={12} item>
                <p>
                  You are leaving third-party permission for this customer. All
                  fields are required
                </p>
              </Grid>
              <Grid xs={12} item className="form-input">
                <TextField
                  label="Name"
                  value={thirdPartyAuthorizationDetail.thirdPartyName}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    updateThirdPartyAuthorizationDetail(
                      event.target.value,
                      "thirdPartyName"
                    )
                  }
                  fullWidth
                  error={
                    highlighRequiredDetail &&
                    !thirdPartyAuthorizationDetail.thirdPartyName
                  }
                  helperText={
                    highlighRequiredDetail &&
                    !thirdPartyAuthorizationDetail.thirdPartyName
                      ? "The name field is required"
                      : ""
                  }
                  required
                  className="name"
                  disabled={isThirdPartyInfoSaved()}
                />
              </Grid>
              <Grid xs={12} item className="form-input">
                <TextField
                  label="Address"
                  value={thirdPartyAuthorizationDetail.thirdPartyAddress}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    updateThirdPartyAuthorizationDetail(
                      event.target.value,
                      "thirdPartyAddress"
                    )
                  }
                  fullWidth
                  multiline
                  rows={2}
                  error={
                    highlighRequiredDetail &&
                    !thirdPartyAuthorizationDetail.thirdPartyAddress
                  }
                  helperText={
                    highlighRequiredDetail &&
                    !thirdPartyAuthorizationDetail.thirdPartyAddress
                      ? "The address field is required"
                      : ""
                  }
                  required
                  className="address"
                  disabled={isThirdPartyInfoSaved()}
                />
              </Grid>
              <Grid xs={12} item className="form-input">
                <TextField
                  label="Postcode"
                  value={thirdPartyAuthorizationDetail.thirdPartyPostcode}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    updateThirdPartyAuthorizationDetail(
                      event.target.value,
                      "thirdPartyPostcode"
                    )
                  }
                  fullWidth
                  error={
                    highlighRequiredDetail &&
                    !thirdPartyAuthorizationDetail.thirdPartyPostcode
                  }
                  helperText={
                    highlighRequiredDetail &&
                    !thirdPartyAuthorizationDetail.thirdPartyPostcode
                      ? "The postcode field is required"
                      : ""
                  }
                  required
                  className="postcode"
                  disabled={isThirdPartyInfoSaved()}
                />
              </Grid>
              <Grid xs={6} item className="form-input padding-right">
                <MuiDatePicker
                  value={thirdPartyAuthorizationDetail.thirdPartyDateOfBirth}
                  label="Date of Birth"
                  disableFutureDates
                  isRequired
                  isDisabled={isThirdPartyInfoSaved()}
                  handleDateChange={(value) => {
                    dateChangeHandler(value, "thirdPartyDateOfBirth");
                  }}
                  error={
                    highlighRequiredDetail &&
                    !thirdPartyAuthorizationDetail.thirdPartyDateOfBirth
                  }
                />
              </Grid>
              <Grid xs={6} item className="form-input padding-left">
                <MuiDatePicker
                  value={thirdPartyAuthorizationDetail.thirdPartyExpiryDate}
                  label="Permission expiry date"
                  disablePastDates
                  isRequired
                  handleDateChange={(value) => {
                    dateChangeHandler(value, "thirdPartyExpiryDate");
                  }}
                  error={
                    highlighRequiredDetail &&
                    !thirdPartyAuthorizationDetail.thirdPartyExpiryDate
                  }
                />
              </Grid>
              <Grid xs={12} item className="form-input">
                <TextField
                  label="Do Not discuss"
                  value={thirdPartyAuthorizationDetail.thirdPartyDoNotDiscuss}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    updateThirdPartyAuthorizationDetail(
                      event.target.value,
                      "thirdPartyDoNotDiscuss"
                    )
                  }
                  fullWidth
                  multiline
                  rows={2}
                  error={
                    highlighRequiredDetail &&
                    !thirdPartyAuthorizationDetail.thirdPartyDoNotDiscuss
                  }
                  helperText={
                    highlighRequiredDetail &&
                    !thirdPartyAuthorizationDetail.thirdPartyDoNotDiscuss
                      ? "The do not discuss field is required"
                      : ""
                  }
                  required
                  className="do-not-discuss"
                  disabled={isThirdPartyInfoSaved()}
                />
              </Grid>
              <Grid item xs={12} className="form-input">
                <InputLabel
                  required
                  error={
                    highlighRequiredDetail &&
                    !thirdPartyAuthorizationDetail.thirdPartyRemovalAuthor
                  }
                >
                  Third Party Removal Author
                </InputLabel>
                <FormControl fullWidth disabled={isThirdPartyInfoSaved()}>
                  <RadioGroup
                    className="radio-group"
                    value={thirdPartyAuthorizationDetail.thirdPartyRemovalAuthor.toString()}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onChange={(event: any) =>
                      updateThirdPartyAuthorizationDetail(
                        event.target.value,
                        "thirdPartyRemovalAuthor"
                      )
                    }
                  >
                    <FormControlLabel
                      value={ThirdPartyRemovalAuthor.Customer.toString()}
                      control={<Radio />}
                      label="Customer"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value={ThirdPartyRemovalAuthor.Broker.toString()}
                      control={<Radio />}
                      label="Broker"
                      labelPlacement="end"
                    />
                  </RadioGroup>
                  {highlighRequiredDetail &&
                    !thirdPartyAuthorizationDetail.thirdPartyRemovalAuthor && (
                      <FormHelperText error>
                        The Removal author field is required.
                      </FormHelperText>
                    )}
                </FormControl>
              </Grid>
              {isThirdPartyInfoSaved() && (
                <Grid xs={12} item className="form-input">
                  <TextField
                    label="Renewal Note"
                    value={
                      thirdPartyAuthorizationDetail.thirdPartyRemovalNotes || ""
                    }
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      updateThirdPartyAuthorizationDetail(
                        event.target.value,
                        "thirdPartyRemovalNotes"
                      )
                    }
                    fullWidth
                    multiline
                    rows={2}
                    error={
                      highlighRequiredDetail &&
                      !thirdPartyAuthorizationDetail.thirdPartyRemovalNotes
                    }
                    helperText={
                      highlighRequiredDetail &&
                      !thirdPartyAuthorizationDetail.thirdPartyRemovalNotes
                        ? "The renewal note field is required"
                        : ""
                    }
                    required
                    className="renewal-note"
                  />
                </Grid>
              )}
            </Grid>
          </ThirdPartyAuthorizationDialogStyles>
        </ResponsiveDialog>
        {openConfirmationPopup && (
          <ResponsiveDialog
            open={openConfirmationPopup}
            maxWidth="xs"
            onConfirm={() => {
              handleSaveThirdPartyDetail(null);
            }}
            onCancel={() => setOpenConfirmationPopup(false)}
            showActionButtons
            okText="Yes"
            cancelText="No"
            isConfirmationDialog
          >
            <div className="confirmation-message">
              Are you sure you want to clear the third party authorization
              details?
            </div>
          </ResponsiveDialog>
        )}
      </div>
    );
  };
