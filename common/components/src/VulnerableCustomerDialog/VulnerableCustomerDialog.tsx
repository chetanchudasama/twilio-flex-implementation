import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Grid,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  FormHelperText,
} from "@material-ui/core";
import { ResponsiveDialog } from "../ResponsiveDialog";
import { VulnerableCustomerDialogStyles } from "./VulnerableCustomerDialog.Styles";
import { VulnerableCustomerStatus } from "../shared/enum";
import { VulnerableCustomerInformation } from "../models/VulnerableCustomerInformation";
import { Shared } from "../shared/Shared";
import { VulnerabilityReason } from "../models/VulnerabilityReason";
import { CustomSelect } from "../CustomSelect/CustomSelect";

export interface VulnerableCustomerDialogProps {
  open: boolean;
  vulnerableCustomerInfo: VulnerableCustomerInformation | null;
  handleDialogClose: () => void;
  handleReportVulnerability: (
    customerInfo: VulnerableCustomerInformation | null
  ) => void;
  hasVulnerableCustomerReported: boolean;
}

export const VulnerableCustomerDialog: React.FC<VulnerableCustomerDialogProps> =
  ({
    open,
    vulnerableCustomerInfo,
    handleDialogClose,
    handleReportVulnerability,
    hasVulnerableCustomerReported,
  }) => {
    const { vulnerabilityReasonList } = Shared;

    const [vulnerableCustomerDetail, setVulnerableCustomerDetail] =
      useState<VulnerableCustomerInformation>(
        vulnerableCustomerInfo || new VulnerableCustomerInformation()
      );
    const [highlightRequiredDetail, setHighlightRequiredDetail] =
      useState(false);

    const [openConfirmationPopup, setOpenConfirmationPopup] = useState(false);

    const handleVulnerableCustomerDetailChange = (
      event: any,
      propertyName: string
    ) => {
      if (propertyName === "permissionGranted") {
        setVulnerableCustomerDetail({
          ...vulnerableCustomerDetail,
          [propertyName]: event.target.checked,
        });
      } else if (propertyName === "reason") {
        const reasonObject = vulnerabilityReasonList.find(
          (el) => el.id === event.target.value
        );
        setVulnerableCustomerDetail({
          ...vulnerableCustomerDetail,
          [propertyName]: reasonObject || new VulnerabilityReason(),
        });
      } else {
        setVulnerableCustomerDetail({
          ...vulnerableCustomerDetail,
          [propertyName]: event.target.value,
        });
      }
    };

    const handleSubmitVulnerabilityDetail = () => {
      setHighlightRequiredDetail(true);

      if (
        vulnerableCustomerDetail.reason.name !== "" &&
        vulnerableCustomerDetail.vulnerabilityNote &&
        vulnerableCustomerDetail.status !== ""
      ) {
        handleReportVulnerability(vulnerableCustomerDetail);
      }
    };

    return (
      <>
        <ResponsiveDialog
          title="Report Vulnerability"
          open={open}
          onCancel={handleDialogClose}
          onConfirm={handleSubmitVulnerabilityDetail}
          maxWidth="sm"
          showActionButtons
          cancelText="Cancel"
          okText={vulnerableCustomerInfo ? "Save" : "Report"}
          showDeleteButton={hasVulnerableCustomerReported}
          onDelete={() => {
            setOpenConfirmationPopup(true);
          }}
        >
          <VulnerableCustomerDialogStyles>
            <Grid container>
              <Grid item xs={12} className="vulnerable-info">
                You are reporting this customer as vulnerable. A vulnerable
                customer is a person who has an inability to make an informed
                financial decision.
              </Grid>
              <Grid item xs={12} className="vulnerability-item">
                <CustomSelect
                  label="Reason"
                  onChange={(event: any) =>
                    handleVulnerableCustomerDetailChange(event, "reason")
                  }
                  value={vulnerableCustomerDetail.reason.id}
                  isRequired
                  errors={
                    highlightRequiredDetail &&
                    vulnerableCustomerDetail.reason.name === ""
                      ? ["The Reason field is required."]
                      : []
                  }
                >
                  <MenuItem value={-1}>
                    <em>Select reason</em>
                  </MenuItem>
                  {vulnerabilityReasonList.map((reason) => {
                    return (
                      <MenuItem key={reason.name} value={reason.id}>
                        {reason.name}
                      </MenuItem>
                    );
                  })}
                </CustomSelect>
              </Grid>
              <Grid item xs={12} className="vulnerability-item">
                <TextField
                  label="Notes"
                  value={vulnerableCustomerDetail.vulnerabilityNote}
                  onChange={(event) =>
                    handleVulnerableCustomerDetailChange(
                      event,
                      "vulnerabilityNote"
                    )
                  }
                  multiline
                  rows={4}
                  fullWidth
                  error={
                    highlightRequiredDetail &&
                    !vulnerableCustomerDetail.vulnerabilityNote
                  }
                  helperText={
                    highlightRequiredDetail &&
                    !vulnerableCustomerDetail.vulnerabilityNote
                      ? "The Notes field is required."
                      : ""
                  }
                  required
                  className="input-label"
                />
              </Grid>
              <Grid item xs={12} className="vulnerability-item">
                <InputLabel
                  required
                  error={
                    highlightRequiredDetail && !vulnerableCustomerDetail.status
                  }
                  className="input-label"
                >
                  Status
                </InputLabel>
                <FormControl fullWidth>
                  <RadioGroup
                    value={
                      vulnerableCustomerDetail.status
                        ? vulnerableCustomerDetail.status.toString()
                        : ""
                    }
                    onChange={(event) =>
                      handleVulnerableCustomerDetailChange(event, "status")
                    }
                    className="radio-group"
                  >
                    <FormControlLabel
                      className="form-control-label"
                      value={VulnerableCustomerStatus.suspected.toString()}
                      control={<Radio />}
                      label="Suspected"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      className="form-control-label"
                      value={VulnerableCustomerStatus.confirmed.toString()}
                      control={<Radio />}
                      label="Confirmed"
                      labelPlacement="end"
                    />
                  </RadioGroup>
                  {highlightRequiredDetail &&
                    !vulnerableCustomerDetail.status && (
                      <FormHelperText error>
                        The Status field is required.
                      </FormHelperText>
                    )}
                </FormControl>
              </Grid>
              <Grid item xs={12} className="vulnerability-item-checkBox">
                <FormControl>
                  <FormControlLabel
                    className="form-control-label"
                    control={
                      <Checkbox
                        value="permissionGranted"
                        checked={vulnerableCustomerDetail.permissionGranted}
                        onChange={(event) =>
                          handleVulnerableCustomerDetailChange(
                            event,
                            "permissionGranted"
                          )
                        }
                      />
                    }
                    label="Permission granted to note the application and share with the Lender"
                  />
                </FormControl>
              </Grid>
            </Grid>
          </VulnerableCustomerDialogStyles>
        </ResponsiveDialog>
        {openConfirmationPopup && (
          <ResponsiveDialog
            open={openConfirmationPopup}
            onConfirm={() => handleReportVulnerability(null)}
            onCancel={() => setOpenConfirmationPopup(false)}
            showActionButtons
            okText="Yes"
            cancelText="No"
            isConfirmationDialog
            maxWidth="xs"
          >
            <div className="confirmation-message">
              Are you sure you want to clear the customer vulnerability details?
            </div>
          </ResponsiveDialog>
        )}
      </>
    );
  };
