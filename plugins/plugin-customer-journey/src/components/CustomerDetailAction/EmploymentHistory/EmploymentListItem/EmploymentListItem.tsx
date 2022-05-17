import React, { useMemo } from "react";

import {
  Avatar,
  Button,
  CardHeader,
  Divider,
  Typography,
} from "@material-ui/core";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import EditIcon from "@material-ui/icons/Edit";

import { EmploymentListItemProps } from "./EmploymentListItem.Props";
import { EmploymentListItemStyles } from "./EmploymentListItem.Styles";

export const EmploymentListItem: React.FC<EmploymentListItemProps> = ({
  employment,
  setActiveEmployment,
}) => {
  const occupationStatus = useMemo(() => {
    return employment.occupationStatus.name
      ? `(${employment.occupationStatus.name})`
      : "";
  }, [employment.occupationStatus]);

  const addressLine1 = useMemo(() => {
    const { employerAddress } = employment;
    const addressLine: string[] = [];
    if (employerAddress.buildingNumber) {
      addressLine.push(employerAddress.buildingNumber.toString());
    }
    if (employerAddress.buildingName) {
      addressLine.push(employerAddress.buildingName);
    }
    return addressLine.join(", ");
  }, [employment]);

  const addressLine2 = useMemo(() => {
    const { employerAddress } = employment;
    const addressLine: string[] = [];
    if (employerAddress.subBuilding) {
      addressLine.push(employerAddress.subBuilding);
    }
    if (employerAddress.streetName) {
      addressLine.push(employerAddress.streetName);
    }
    return addressLine.join(", ");
  }, [employment]);

  const addressLine3 = useMemo(() => {
    const { employerAddress } = employment;
    const addressLine: string[] = [];
    if (employerAddress.town) {
      addressLine.push(employerAddress.town);
    }
    if (employerAddress.postcode) {
      addressLine.push(employerAddress.postcode);
    }
    return addressLine.join(", ");
  }, [employment]);

  return (
    <EmploymentListItemStyles item xs={12}>
      <CardHeader
        avatar={
          <Avatar color="secondary" classes={{ colorDefault: "icon" }}>
            <BusinessCenterIcon color="secondary" />
          </Avatar>
        }
        title={
          <>
            <Typography component="span" className="title title-line-1">
              {[employment.occupation, occupationStatus].join(" ")}
            </Typography>
            <Typography component="span" className="title title-line-2">
              {employment.employerName}
            </Typography>
          </>
        }
        subheader={
          <>
            <Typography component="span" className="subheader-line">
              {`${addressLine1} ${addressLine2}`}
            </Typography>
            <Typography component="span" className="subheader-line">
              {addressLine3}
            </Typography>
            <Typography component="span" className="subheader-line">
              {employment.employerPhoneNumber}
            </Typography>
            <Typography component="span" className="subheader-line">
              {`${employment.yearsAtEmployment} years, ${employment.monthsAtEmployment} months`}
            </Typography>
          </>
        }
        action={
          <Button
            variant="text"
            size="small"
            color="secondary"
            className="action-btn"
            onClick={setActiveEmployment}
          >
            <EditIcon
              color="inherit"
              fontSize="small"
              className="action-icon"
            />
            Edit
          </Button>
        }
        classes={{
          root: "card-header",
          subheader: "subheader",
        }}
      />
      <Divider className="divider" />
    </EmploymentListItemStyles>
  );
};
