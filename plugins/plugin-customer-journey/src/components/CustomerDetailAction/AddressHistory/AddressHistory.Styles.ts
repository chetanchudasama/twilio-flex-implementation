import { paddingUnit, secondary, white } from "@common/components";
import { Grid } from "@material-ui/core";
import styled from "react-emotion";

export const AddressHistoryStyles = styled(Grid)({
  ".address-history-header": {
    fontSize: "20px",
    fontWeight: 600,
  },
  ".paper-container": {
    paddingTop: 0,
  },
  ".paper": {
    padding: paddingUnit * 4,
    marginBottom: paddingUnit * 4,
    "&:last-child": {
      marginBottom: 0,
    },
  },
  ".address-header": {
    fontSize: 16,
    fontWeight: "bold",
  },
  ".add-icon": {
    marginRight: paddingUnit,
  },
  ".add-btn-container": {
    textAlign: "right",
  },
  ".add-address-btn": {
    backgroundColor: white,
    fontWeight: "bold",
    color: secondary,
    "&:hover": {
      backgroundColor: secondary,
      color: white,
    },
  },
});
