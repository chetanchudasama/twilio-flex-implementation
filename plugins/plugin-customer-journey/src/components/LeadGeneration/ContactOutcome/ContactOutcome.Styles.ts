import styled from "react-emotion";
import { borderStyle, secondary, white } from "@common/components";
import { Menu } from "@material-ui/core";

export const ContactOutcomeStyles = styled("div")({
  ".dropdown-icon-btn": {
    padding: "6px 10px",
    borderRadius: 4,
    border: borderStyle,
    color: secondary,
    minHeight: 40,
    background: white,
  },
  ".no-contact-btn": {
    padding: "6px 10px",
    borderRadius: 4,
    border: borderStyle,
    color: secondary,
    minHeight: 40,
    background: white,
    fontSize: 14,
    fontWeight: 600,
    lineHeight: "18px",
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
