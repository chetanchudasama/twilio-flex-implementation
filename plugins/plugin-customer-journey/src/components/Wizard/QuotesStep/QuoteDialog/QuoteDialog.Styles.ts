import styled from "react-emotion";
import { secondary, borderStyle, white, lightGrey } from "@common/components";

export const QuoteDialogStyles = styled("div")({
  padding: "20px 10px",
  position: "relative",
  minHeight: 300,
  fontSize: "14px",
  ".quote-image-container": {
    width: "100%",
    height: "300px",
  },
  ".quote-description-container": {
    paddingLeft: "20px",
  },
  ".price-field": {
    fontWeight: 600,
    fontSize: "18px",
    color: secondary,
  },
  ".car-model": {
    fontSize: "16px",
    fontWeight: 600,
    padding: "5px 0px",
  },
  ".car-specification": {
    listStyleType: "none",
    paddingBottom: "10px",
    width: "100%",
    overflow: "hidden",
    borderBottom: borderStyle,
  },
  ".car-specification li": {
    display: "inline-block",
    position: "relative",
    lineHeight: "14px",
    "&:after": {
      content: "' | '",
      padding: "0px 5px",
    },
  },
  ".car-specification li:last-child:after": { content: "''" },
  ".info-icon-position": {
    position: "relative",
    top: "3px",
    paddingLeft: "5px",
    fontSize: "14px",
    verticalAlign: "top",
  },
  ".quote-configuration": {
    paddingTop: "30px",
  },
  ".text-align-right": {
    textAlign: "right",
  },
  ".checkbox": {
    padding: "0px 0px 0px 5px",
  },
  ".item-container": {
    borderBottom: borderStyle,
    padding: "2px 0px 4px",
  },
  ".quote-item-container": {
    borderBottom: borderStyle,
    padding: "20px 0px",
  },
  ".quote-static-item": {
    borderBottom: borderStyle,
    padding: "22px 0px",
  },
  ".balance-to-finance": {
    padding: "0px 20px 20px",
    border: borderStyle,
    borderRadius: "5px",
    marginTop: "10px",
  },
  ".text-input div div": {
    marginTop: "0px",
    display: "flex",
    alignItems: "baseline",
  },
  ".padding-top": {
    paddingTop: "20px",
  },
  ".vrm-container": {
    padding: "0px 10px 10px 0px",
  },
  ".value-px-container": {
    padding: "27px 0px 10px 5px",
  },
  ".value-px-btn": {
    backgroundColor: white,
    border: borderStyle,
    color: secondary,
    fontWeight: 600,
    width: "100%",
    height: "46px",
    "&:hover": {
      backgroundColor: secondary,
      color: white,
    },
  },
  ".mileage-container": {
    padding: "0px 10px 10px 5px",
  },
  ".panel-second-row": {
    paddingTop: "10px",
    borderTop: borderStyle,
  },
  ".value-px-item": {
    paddingTop: "5px",
  },
  ".panel-container": {
    padding: "20px 0px",
  },
  ".panel-container div div": {
    backgroundColor: lightGrey,
  },
  ".bold-text": {
    fontSize: "16px",
    fontWeight: 600,
  },
  ".final-amount": {
    fontSize: "16px",
    fontWeight: 600,
    color: secondary,
  },
  "div > .progress": {
    top: "40% !important",
    left: "47% !important",
  },
  ".custom-select div div": {
    marginTop: "0px",
    textAlign: "left",
  },
  ".padding-bottom": {
    paddingBottom: "20px",
  },
  ".warning-container": {
    paddingBottom: "10px",
  },
  ".warning-container > div:nth-child(1)": {
    margin: "0px",
  },
  ".dealer-container": {
    padding: "20px 0px",
  },
});
