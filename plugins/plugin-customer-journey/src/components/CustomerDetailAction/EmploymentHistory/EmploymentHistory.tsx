import React, { useState } from "react";
import { v4 } from "uuid";

import { CustomerEmploymentModel } from "@common/components";
import { Manager } from "@twilio/flex-ui";
import { Button, Grid, Paper, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import { preparePatchData } from "../../../helpers/commonFunctions";
import {
  CustomNotificationType,
  showErrorMessage,
  showMessage,
} from "../../../Notifications";
import { useApplicationService } from "../../../services/application.service";
import { AppState } from "../../../states";
import { EmploymentHistoryStyles } from "./EmploymentHistory.Styles";
import { EmploymentListItem } from "./EmploymentListItem/EmploymentListItem";
import { EmploymentDialog } from "./EmploymentDialog/EmploymentDialog";
import { Props } from "./EmploymentHistory.Props";

export const EmploymentHistory: React.FC<Props> = ({
  applicationId,
  currentEmployment,
  previousEmployments,
  setCustomerDetails,
}) => {
  const state: AppState = Manager.getInstance().store.getState();
  const applicationService = useApplicationService(
    state.flex.session.ssoTokenPayload.token
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [activeEmployment, SetActiveEmployment] =
    useState<CustomerEmploymentModel>(new CustomerEmploymentModel());

  const updateEmployment = (updatedEmployment: CustomerEmploymentModel) => {
    setLoading(true);
    const updatedEmployments = currentEmployment
      ? [...previousEmployments, currentEmployment]
      : [...previousEmployments];
    const index = updatedEmployments.findIndex(
      (e) => JSON.stringify(e) === JSON.stringify(activeEmployment)
    );
    // if updatedEmployment has isCurrentEmployment flag true, set flag to false for remaining in the list
    if (
      updatedEmployment.isCurrentEmployment &&
      updatedEmployments.filter((e) => e && e.isCurrentEmployment).length > 0
    ) {
      updatedEmployments
        .filter((e) => e && e.isCurrentEmployment)
        // eslint-disable-next-line no-return-assign
        .map((e) => (e!.isCurrentEmployment = false));
    }

    if (index > -1) {
      updatedEmployments.splice(index, 1, updatedEmployment);
    } else {
      updatedEmployments.push(updatedEmployment);
    }

    applicationService
      .updateBaseApplicationDetail(applicationId, [
        preparePatchData("employmentHistory", updatedEmployments),
      ])
      .then(() => {
        setCustomerDetails("employmentHistory", updatedEmployments);
        showMessage(
          CustomNotificationType.SuccessNotification,
          "Employment history detail updated successfully!"
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

  const deleteEmployment = () => {
    const employmentHistory = currentEmployment
      ? [...previousEmployments, currentEmployment]
      : [...previousEmployments];
    const updatedEmployments = [
      ...employmentHistory.filter(
        (e) => JSON.stringify(e) !== JSON.stringify(activeEmployment)
      ),
    ];

    applicationService
      .updateBaseApplicationDetail(applicationId, [
        preparePatchData("employmentHistory", updatedEmployments),
      ])
      .then(() => {
        setCustomerDetails("employmentHistory", updatedEmployments);
        showMessage(
          CustomNotificationType.SuccessNotification,
          "Employment detail deleted successfully!"
        );
      })
      .catch(() => {
        showErrorMessage("Something went wrong, please try again!", "", true);
      })
      .finally(() => {
        setOpenDialog(false);
      });
  };

  const setActiveEmployment = (employment: CustomerEmploymentModel) => {
    SetActiveEmployment({ ...employment });
    setOpenDialog(true);
  };

  const onAddEmployment = () => {
    setActiveEmployment(new CustomerEmploymentModel());
  };

  return (
    <>
      <EmploymentHistoryStyles item xs={12}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={16}
        >
          <Grid item xs={12} className="title">
            Employment History
          </Grid>
          <Grid item xs={12} className="paper-container">
            {currentEmployment && (
              <Paper className="paper" elevation={1}>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={12}>
                    <Typography component="p" className="employment-label">
                      Current Employment
                    </Typography>
                  </Grid>
                  <EmploymentListItem
                    employment={currentEmployment}
                    key={v4()}
                    setActiveEmployment={() =>
                      setActiveEmployment(currentEmployment)
                    }
                  />
                </Grid>
              </Paper>
            )}
            {previousEmployments.length > 0 && (
              <Paper className="paper" elevation={1}>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={12}>
                    <Typography component="p" className="employment-label">
                      Previous Employment
                    </Typography>
                  </Grid>
                  {previousEmployments.map((employment) => (
                    <EmploymentListItem
                      employment={employment}
                      key={v4()}
                      setActiveEmployment={() =>
                        setActiveEmployment(employment)
                      }
                    />
                  ))}
                </Grid>
              </Paper>
            )}
            {!currentEmployment && previousEmployments.length === 0 && (
              <Typography component="p" className="employment-label">
                No Employments found.
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} className="add-employment-container">
            <Button
              variant="contained"
              color="secondary"
              className="add-employment-btn"
              onClick={onAddEmployment}
            >
              <AddIcon
                color="inherit"
                fontSize="small"
                className="action-icon"
              />
              Add Employment
            </Button>
          </Grid>
        </Grid>
      </EmploymentHistoryStyles>
      {openDialog && (
        <EmploymentDialog
          isEdit={activeEmployment.occupationStatus?.id > -1}
          open={openDialog}
          activeEmployment={activeEmployment}
          loading={loading}
          onClose={() => setOpenDialog(false)}
          onDelete={deleteEmployment}
          onSave={updateEmployment}
        />
      )}
    </>
  );
};
