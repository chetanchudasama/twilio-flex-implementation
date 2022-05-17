import React from "react";
import { Button, Grid } from "@material-ui/core";

import { UpdateApplicationStyles } from "./UpdateApplication.Styles";
import { UpdateApplicationProps } from "./UpdateApplication.Props";

export const UpdateApplication: React.FC<UpdateApplicationProps> = ({
  updateApplication,
}) => {
  return (
    <UpdateApplicationStyles>
      <Grid container spacing={16} className="update-application">
        <Grid item xs={8}>
          <Grid container>
            <Grid item xs={12} className="update-application-heading">
              Update application
            </Grid>
            <Grid item xs={12} className="update-application-text">
              This will save the above information to a note in this
              customer&apos;s application.
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4} className="update-button">
          <Button
            variant="outlined"
            className="update-application-btn"
            onClick={updateApplication}
          >
            Update Application
          </Button>
        </Grid>
      </Grid>
    </UpdateApplicationStyles>
  );
};
