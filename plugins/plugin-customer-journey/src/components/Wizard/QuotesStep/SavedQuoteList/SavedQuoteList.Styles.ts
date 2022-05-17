import { paddingUnit, lightPurple } from "@common/components";
import styled from "react-emotion";

export const QuoteListStyles = styled("div")({
  ".no-result": {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    padding: paddingUnit * 2,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "TranslateX(-50%) TranslateY(-50%)",
  },
  ".result-sort-container": {
    paddingLeft: 10,
    paddingRight: 10,
  },
  ".result-text": {
    fontSize: 14,
    fontWeight: "bold",
  },
  ".back-to-search": {
    margin: 5,
    fontWeight: 600,
    backgroundColor: lightPurple,
  },
});
