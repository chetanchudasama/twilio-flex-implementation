import { paddingUnit, errorColor } from "@common/components";
import { Grid } from "@material-ui/core";
import { styled } from "@twilio/flex-ui";

export const AddressDialogStyles = styled(Grid)({});

export const ResponsiveDialogContentStyles = styled(Grid)({
  padding: paddingUnit * 2,
  ".address-container > div": {
    padding: 0,
  },
  ".address-container .address-configuration": {
    paddingTop: 2,
  },
  ".address-container .address-current": {
    marginTop: 2,
  },
  ".address-error": {
    fontSize: 12,
    color: errorColor,
    marginTop: 4,
  },
});
