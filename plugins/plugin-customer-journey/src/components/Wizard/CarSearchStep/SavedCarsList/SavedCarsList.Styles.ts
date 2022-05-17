import { paddingUnit } from "@common/components";
import styled from "react-emotion";

export const CarSearchResultStyles = styled("div")({
  ".no-result": {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    padding: paddingUnit * 2,
  },
  ".result-sort-container": {
    paddingLeft: 10,
    paddingRight: 10,
  },
  ".result-text": {
    fontSize: 14,
    fontWeight: "bold",
  },
});
