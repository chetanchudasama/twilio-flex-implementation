import React, { useState } from "react";
import { Grid, Typography, Divider } from "@material-ui/core";
import { CustomInput } from "@common/components";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";

import { CustomerNameStyles } from "./CustomerName.Styles";
import { CustomerNameProps } from "./CustomerName.Props";
import { PreferredNameType } from "../../../common/enum";

export const CustomerName: React.FC<CustomerNameProps> = ({
  updateCustomerPreferredName,
}) => {
  const [selectedSwitch, setSelectedSwitch] = useState<PreferredNameType>(
    PreferredNameType.FullName
  );
  const [preferredName, setPreferredName] = useState<string>("");

  const onThreeStateSwitchChange = (
    event: React.MouseEvent<HTMLElement>,
    value: PreferredNameType
  ) => {
    setPreferredName("");
    setSelectedSwitch(value || PreferredNameType.FullName);
  };

  const onPreferredNameChange = (value: string) => {
    setPreferredName(value);
  };

  const handleUpdatePreferredName = (value: string) => {
    updateCustomerPreferredName(value);
  };

  return (
    <CustomerNameStyles>
      <Grid container spacing={16}>
        <Grid item xs={12} className="heading">
          Customer name
        </Grid>
        <Grid item xs={12} className="customer-name-toggle">
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            spacing={8}
          >
            <Grid item>
              <Typography component="p" variant="caption">
                How does the customer like to be addressed?
              </Typography>
            </Grid>
            <Grid item>
              <ToggleButtonGroup
                value={selectedSwitch}
                exclusive
                onChange={onThreeStateSwitchChange}
                selected
                className="root"
              >
                <ToggleButton
                  className={`button label btn-full-name ${
                    selectedSwitch === PreferredNameType.FullName
                      ? "selected"
                      : ""
                  }`}
                  value={PreferredNameType.FullName}
                  selected={selectedSwitch === PreferredNameType.FullName}
                >
                  Full Name
                </ToggleButton>
                <ToggleButton
                  className={`button label btn-first-name ${
                    selectedSwitch === PreferredNameType.FirstName
                      ? "selected"
                      : ""
                  }`}
                  value={PreferredNameType.FirstName}
                  selected={selectedSwitch === PreferredNameType.FirstName}
                >
                  First Name
                </ToggleButton>
                <ToggleButton
                  className={`button label btn-other ${
                    selectedSwitch === PreferredNameType.Other ? "selected" : ""
                  }`}
                  value={PreferredNameType.Other}
                  selected={selectedSwitch === PreferredNameType.Other}
                >
                  Other
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            {selectedSwitch === PreferredNameType.Other && (
              <Grid item xs={12}>
                <Divider />
              </Grid>
            )}
          </Grid>
        </Grid>
        {selectedSwitch === PreferredNameType.Other && (
          <Grid item xs={12} className="custom-name">
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography component="p" variant="caption">
                  What name do they like to be addressed by?
                </Typography>
              </Grid>
              <Grid item>
                <CustomInput
                  label=""
                  value={preferredName}
                  onChange={(event) =>
                    onPreferredNameChange(event.target.value)
                  }
                  classes={{
                    formControl: "custom-input",
                  }}
                  onBlur={() => handleUpdatePreferredName(preferredName)}
                />
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </CustomerNameStyles>
  );
};
