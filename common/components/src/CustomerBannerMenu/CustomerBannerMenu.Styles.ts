import { Menu } from "@material-ui/core";
import styled from "react-emotion";
import { secondary, borderStyle } from "../shared/AppTheme";

export const CustomerBannerMenuStyles = styled("div")({
  ".icon-btn": {
    padding: "6px 10px",
    borderRadius: 4,
    border: borderStyle,
    color: secondary,
  },
});

export const MenuStyles = styled(Menu)({
  ".menu-item-divider": {
    padding: 0,
    height: 2,
  },
  ".divider": {
    width: "100%",
  },
});
