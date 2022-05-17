import styled from "react-emotion";
import { Theme } from "@material-ui/core";
import { theme, secondary, errorColor } from "../shared/AppTheme";

// override spacing, primary color for date-time picker
export const muiTheme: Theme = {
  ...theme,
  spacing: { unit: 8 },
  palette: {
    ...theme.palette,
    primary: {
      ...theme.palette.primary,
      main: secondary,
    },
  },
};

export const DatePickerStyles = styled("div")({
  ".clear-icon": {
    padding: "3px",
  },
  ".date-picker > div > input": {
    cursor: "pointer",
  },
  ".label": {
    fontSize: 14,
  },
  ".label-error": {
    color: errorColor,
  },
});
