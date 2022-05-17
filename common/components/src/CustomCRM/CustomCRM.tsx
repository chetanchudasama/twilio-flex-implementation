import { MuiThemeProvider } from "@material-ui/core/styles";
import React from "react";
import { theme } from "../shared/AppTheme";

interface CustomCRMProps {
  component: React.ReactNode;
}

type Props = CustomCRMProps;

export const CustomCRM: React.FC<Props> = ({ component }) => {
  return <MuiThemeProvider theme={theme}>{component}</MuiThemeProvider>;
};
