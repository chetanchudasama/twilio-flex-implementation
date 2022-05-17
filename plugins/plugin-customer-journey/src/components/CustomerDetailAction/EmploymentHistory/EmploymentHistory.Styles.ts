import { paddingUnit, secondary, white } from "@common/components";
import { Grid } from "@material-ui/core";
import { styled } from "@twilio/flex-ui";

export const EmploymentHistoryStyles = styled(Grid)({
  ".title": {
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
  ".employment-label": {
    fontSize: 16,
    fontWeight: "bold",
  },
  ".action-icon": {
    marginRight: paddingUnit,
  },
  ".add-employment-container": {
    textAlign: "right",
  },
  ".add-employment-btn": {
    backgroundColor: white,
    fontWeight: "bold",
    color: secondary,
    "&:hover": {
      backgroundColor: secondary,
      color: white,
    },
  },
});
