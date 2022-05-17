import React from "react";
import { Button, Grid } from "@material-ui/core";
import { AllocationStyles } from "./Allocation.Styles";
import { AllocationProps } from "./Allocation.Props";

export const Allocation: React.FC<AllocationProps> = ({ getRankedAgents }) => {
  return (
    <AllocationStyles>
      <Grid container spacing={16}>
        <Grid item xs={12} className="allocation">
          <div className="heading">Allocation</div>
          <div>
            <Button
              variant="contained"
              className="find-agent-btn"
              color="secondary"
              onClick={getRankedAgents}
            >
              Find Agent
            </Button>
          </div>
        </Grid>
      </Grid>
    </AllocationStyles>
  );
};
