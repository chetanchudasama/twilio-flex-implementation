import styled from "react-emotion";

import {
  black,
  paddingUnit,
  white,
  defaultBackground,
} from "@common/components";

export const QualifyingContentStyles = styled("div")({
  padding: "10px",
  ".input-label": {
    color: `${black}!important`,
    fontWeight: 500,
    fontSize: "19px",
  },
  ".custom-width-select": {
    marginTop: 0,
    marginBottom: 0,
  },
  ".custom-width-select > div": {
    height: 40,
    width: 224,
  },
  ".custom-width-select div div": {
    paddingTop: 12,
    paddingBottom: 12,
  },
  ".custom-input": {
    marginBottom: "9px",
  },
  ".custom-input > div": {
    background: `${white} !important`,
    alignItems: "baseline",
  },
  ".headers": {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  ".divider": {
    marginTop: paddingUnit * 5,
    marginBottom: paddingUnit * 5,
  },
  ".additional-questions-content": {
    paddingRight: 60,
  },
  ".result-label": {
    fontSize: 14,
  },
  ".result-value": {
    fontSize: 14,
    fontWeight: "bold",
  },
  ".loan-calculator-error": {
    paddingLeft: 12,
  },
  ".expansion-panel-summary h6": {
    fontSize: 16,
    fontWeight: "bold",
  },
  ".expansion-panel-summary span": {
    paddingLeft: 8,
  },
  ".loan-calculator-container > div": {
    boxShadow: "none",
    background: defaultBackground,
  },
  ".expansion-panel-details": {
    padding: "0 16px 16px",
  },
  ".expansion-panel-summary": {
    padding: "0 16px 0 16px",
    minHeight: 64,
  },
  ".expansion-panel-summary > div": {
    margin: 0,
  },
});
