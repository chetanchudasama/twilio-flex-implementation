import { red, errorColor } from "@common/components";
import styled from "react-emotion";

export const PartExchangeStyles = styled("div")({
  ".error-message": {
    margin: "5px 0px",
    backgroundColor: `${errorColor} !important`,
    color: red,
    padding: "10px",
  },
});
