import { AddressItemModel, Shared } from "@common/components";
import React, { useMemo } from "react";
import {
  Button,
  CardHeader,
  Avatar,
  Typography,
  Divider,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import EditIcon from "@material-ui/icons/Edit";
import { AddressItemStyles } from "./AddressDetail.Styles";

export interface AddressItemProps {
  addressItem: AddressItemModel;
  onEdit: () => void;
}

export const AddressDetail: React.FC<AddressItemProps> = ({
  addressItem,
  onEdit,
}) => {
  const addressLine1 = useMemo(() => {
    const addressLine: string[] = [];
    if (addressItem.buildingNumber) {
      addressLine.push(addressItem.buildingNumber.toString());
    }
    if (addressItem.buildingName) {
      addressLine.push(addressItem.buildingName);
    }
    return addressLine.join(", ");
  }, [addressItem]);

  const addressLine2 = useMemo(() => {
    const addressLine: string[] = [];
    if (addressItem.subBuilding) {
      addressLine.push(addressItem.subBuilding);
    }
    if (addressItem.streetName) {
      addressLine.push(addressItem.streetName);
    }
    return addressLine.join(", ");
  }, [addressItem]);

  const addressLine3 = useMemo(() => {
    const addressLine: string[] = [];
    if (addressItem.town) {
      addressLine.push(addressItem.town);
    }
    if (addressItem.postcode) {
      addressLine.push(addressItem.postcode);
    }
    return addressLine.join(", ");
  }, [addressItem]);

  return (
    <AddressItemStyles item xs={12}>
      <CardHeader
        avatar={
          <Avatar color="secondary" classes={{ colorDefault: "icon" }}>
            <HomeIcon color="secondary" />
          </Avatar>
        }
        title={
          <>
            <Typography
              component="span"
              className="address-content address-line1"
            >
              {`${addressLine1}, ${addressLine2}`}
            </Typography>
            <Typography
              component="span"
              className="address-content address-line2"
            >
              {addressLine3}
            </Typography>
          </>
        }
        subheader={
          <>
            <Typography component="span" className="subheader-line">
              {addressItem.addressStatus.addressStatusName}
            </Typography>
            <Typography component="span" className="subheader-line">
              {`${addressItem.addressStatus.yearsAtAddress} years, 
            ${addressItem.addressStatus.monthsAtAddress} months`}
            </Typography>
          </>
        }
        action={
          <Button
            variant="text"
            size="small"
            color="secondary"
            className="edit-address-btn"
            onClick={onEdit}
          >
            <EditIcon color="inherit" fontSize="small" className="edit-icon" />
            Edit
          </Button>
        }
        classes={{
          root: "card-header",
          subheader: "subheader",
        }}
      />
      <Divider className="divider" />
    </AddressItemStyles>
  );
};
