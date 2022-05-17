import styled from "react-emotion";
import { defaultSnackbarColor } from "@common/components";

export const CarSearchReadonlyViewStyles = styled("div")({
  padding: "20px",
  margin: "-20px",
  backgroundColor: defaultSnackbarColor,
  ".item-value": {
    fontSize: "14px",
    padding: "8px 0px",
  },
  ".item-container": {
    padding: "7px",
  },
  ".edit-search-container": {
    textAlign: "right",
    paddingTop: "10px",
  },
  ".edit-icon": {
    fontSize: "18px",
    paddingRight: "5px",
  },
});
