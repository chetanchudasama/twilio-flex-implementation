import React, { useState, useEffect } from "react";
import { Button, Divider, Grid, IconButton, MenuItem } from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { CallbackDialog } from "@common/components";

import { ContactOutcomeStyles, MenuStyles } from "./ContactOutcome.Styles";
import { ContactOutcomeProps } from "./ContactOutcome.Props";
import { TaskDecisionModel } from "../../../models/TaskDecisionModel";

const BUTTON_COUNT = 2;

export const ContactOutcome: React.FC<ContactOutcomeProps> = ({
  callbackBooked,
  setCallbackDetail,
  taskDecisions,
  handleContactOutcomeClick,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openCallbackDialog, setOpenCallbackDialog] = useState<boolean>(false);
  const [selectedTaskDecision, setSelectedTaskDecision] =
    useState<TaskDecisionModel>(new TaskDecisionModel());

  useEffect(() => {
    if (openCallbackDialog && callbackBooked) {
      handleContactOutcomeClick(selectedTaskDecision, callbackBooked);
    }
    setOpenCallbackDialog(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callbackBooked]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (option: TaskDecisionModel) => {
    setSelectedTaskDecision(option);
    if (option.isCallback) {
      setOpenCallbackDialog(true);
    } else {
      handleContactOutcomeClick(option);
    }
    setAnchorEl(null);
  };

  const handleSetCallbackDetail = (callBackDate: Date | null) => {
    setCallbackDetail(callBackDate);
  };

  return (
    <ContactOutcomeStyles>
      {taskDecisions.length > 0 && (
        <Grid
          container
          spacing={8}
          direction="row"
          justify="flex-end"
          wrap="nowrap"
        >
          {taskDecisions
            .slice(0, BUTTON_COUNT)
            .map((taskDecision: TaskDecisionModel) => (
              <Grid item key={taskDecision.taskItemDecisionId}>
                <Button
                  variant="outlined"
                  className="no-contact-btn"
                  onClick={() => handleContactOutcomeClick(taskDecision)}
                >
                  {taskDecision.decisionName}
                </Button>
              </Grid>
            ))}
          <Grid item>
            <IconButton onClick={handleClick} className="dropdown-icon-btn">
              <ArrowDropDownIcon />
            </IconButton>
            <MenuStyles
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              getContentAnchorEl={null}
              onClose={() => {
                setAnchorEl(null);
              }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              className="banner-menu"
            >
              {taskDecisions.slice(BUTTON_COUNT, -1).map((option) => (
                <MenuItem
                  key={option.taskItemDecisionId}
                  onClick={() => handleMenuItemClick(option)}
                >
                  {option.decisionName}
                </MenuItem>
              ))}
              <MenuItem key={-1} className="menu-item-divider">
                <Divider className="divider" />
              </MenuItem>
              <MenuItem
                key={taskDecisions[taskDecisions.length - 1].taskItemDecisionId}
                onClick={() =>
                  handleMenuItemClick(taskDecisions[taskDecisions.length - 1])
                }
              >
                {taskDecisions[taskDecisions.length - 1].decisionName}
              </MenuItem>
            </MenuStyles>
          </Grid>
        </Grid>
      )}
      {openCallbackDialog && (
        <CallbackDialog
          open={openCallbackDialog}
          noteOptional
          callbackBooked={callbackBooked}
          setCallbackDetail={handleSetCallbackDetail}
          handleCloseDialog={() => {
            setOpenCallbackDialog(false);
          }}
        />
      )}
    </ContactOutcomeStyles>
  );
};
