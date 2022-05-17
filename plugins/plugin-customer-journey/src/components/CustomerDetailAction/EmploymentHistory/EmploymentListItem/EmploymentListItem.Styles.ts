import { paddingUnit, darkGrey, lightPurple } from "@common/components";
import { Grid } from "@material-ui/core";
import { styled } from "@twilio/flex-ui";

export const EmploymentListItemStyles = styled(Grid)({
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
  ".title": {
    fontWeight: 500,
  },
  ".title-line-1": {
    fontSize: 16,
  },
  ".title-line-2": {
    fontSize: 14,
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
  ".action-btn": {
    fontWeight: "bold",
  },
  ".action-icon": {
    marginRight: paddingUnit,
  },
});
