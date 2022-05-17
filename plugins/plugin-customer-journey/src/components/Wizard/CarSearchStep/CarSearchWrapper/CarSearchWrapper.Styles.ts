import {
  paddingUnit,
  lightGrey,
  darkGrey,
  scrollbarColor,
} from "@common/components";
import styled from "react-emotion";

export const CarSearchWrapperStyles = styled("div")({
  ".tab-icon": {
    verticalAlign: "middle",
    marginRight: paddingUnit,
  },
  ".tab-title": {
    verticalAlign: "middle",
  },
  ".wizard-content": {
    paddingTop: "0 !important",
  },
  ".tab-content": {
    overflowX: "hidden",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "0.6em",
    },
    "&::-webkit-scrollbar-track": {
      background: lightGrey,
    },
    "&::-webkit-scrollbar-thumb": {
      background: darkGrey,
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: scrollbarColor,
    },
  },
});
