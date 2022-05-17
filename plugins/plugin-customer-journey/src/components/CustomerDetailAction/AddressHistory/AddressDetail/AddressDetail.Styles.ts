import { paddingUnit, lightPurple, darkGrey } from "@common/components";
import { Grid } from "@material-ui/core";
import styled from "react-emotion";

export const AddressItemStyles = styled(Grid)({
  "&:last-child": {
    "& .divider": {
      display: "none",
    },
    "& .card-header": {
      paddingBottom: 0,
    },
  },
  ".icon": {
    backgroundColor: lightPurple,
  },
  ".address-content": {
    fontSize: 16,
    fontWeight: 500,
  },
  ".card-header": {
    alignItems: "flex-start",
    paddingLeft: 0,
    paddingRight: 0,
  },
  ".subheader": {
    paddingTop: paddingUnit * 2,
  },
  ".subheader-line": {
    color: darkGrey,
  },
  ".edit-address-btn": {
    fontWeight: "bold",
  },
  ".edit-icon": {
    marginRight: paddingUnit,
  },
});
