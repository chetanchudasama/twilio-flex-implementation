import { Button } from "@material-ui/core";
import styled from "react-emotion";
import { black, white } from "../shared/AppTheme";

export const StyledLinkButton = styled(Button)({
  backgroundColor: `${white}!important`,
  color: `${black}!important`,
  textDecoration: "underline",
});
