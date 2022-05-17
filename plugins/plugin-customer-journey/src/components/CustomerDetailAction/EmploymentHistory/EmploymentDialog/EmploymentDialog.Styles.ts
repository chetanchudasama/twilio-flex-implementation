import { paddingUnit, errorColor } from "@common/components";
import { Grid } from "@material-ui/core";
import { styled } from "@twilio/flex-ui";

export const EmploymentDialogStyles = styled(Grid)({
  ".employment-label": {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export const ResponsiveDialogContentStyles = styled(Grid)({
  padding: paddingUnit * 2,
  position: "relative",
  ".employment-label": {
    fontSize: 16,
    fontWeight: "bold",
  },
  ".employer-address > div": {
    padding: 0,
  },
  ".employer-address .address-configuration": {
    paddingTop: 2,
  },
  ".employer-address .address-current": {
    marginTop: 2,
  },
  ".employer-address-error": {
    fontSize: 12,
    color: errorColor,
    marginTop: 4,
  },
});
