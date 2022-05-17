import {
  black,
  mediumGrey,
  darkGrey,
  white,
  secondary,
  darkPurpleHover,
  borderStyle,
  lightGrey,
  scrollbarColor,
} from "@common/components";
import styled from "react-emotion";

const fontSize = "14px";

export const QuoteDetailStyles = styled("div")({
  position: "relative",
  margin: "10px",
  height: "auto",

  ".grey-border": {
    border: borderStyle,
    borderRadius: 5,
  },
  ".secondary-border": {
    border: `2px solid ${secondary}`,
    borderRadius: 5,
  },
  ".grey-background": {
    padding: 12,
    background: mediumGrey,
    fontSize: "12px",
    color: scrollbarColor,
    textTransform: "uppercase",
  },
  ".secondary-background": {
    padding: 12,
    background: secondary,
    fontSize: "12px",
    color: white,
    textTransform: "uppercase",
  },
  ".check-icon": {
    fontSize: "16px",
    padding: "0 8px 0 0",
  },
  ".quote-saved-date": {
    float: "left",
    letterSpacing: "1px",
    marginRight: 15,
  },
  ".quote-accepted-msg": {
    float: "right",
    display: "flex",
    letterSpacing: "1px",
  },
  ".car-model": {
    fontSize: "16px",
    fontWeight: 600,
    margin: "15px 0 4px 0",
  },
  ".view-more-detail": {
    marginBottom: "5px",
  },
  ".view-more-detail-link": {
    color: black,
    fontSize: "16px",
    textDecoration: "underline",
    padding: 0,
    textTransform: "capitalize",
  },
  ".view-more-detail-link:hover": {
    background: "none",
    textDecoration: "underline",
  },
  ".spec-title": {
    color: darkGrey,
    marginBottom: 3,
    marginTop: 2,
    fontSize,
  },
  ".spec-value": {
    fontWeight: 600,
    marginBottom: 15,
    fontSize,
  },
  ".finance-container": {
    background: lightGrey,
    textAlign: "center",
    padding: 20,
    width: "100%",
    borderRadius: 4,
  },
  ".offer-term": {
    fontSize,
  },
  ".offer-amount": {
    display: "inline",
    fontSize: "28px",
    fontWeight: 600,
  },
  ".offer-pm": {
    display: "inline",
    fontSize: "12px",
  },
  ".apr-percentage": {
    fontSize,
  },
  ".finance-balance": {
    fontSize,
    margin: "15px 0 5px 0",
  },
  ".payable-amount": {
    fontSize,
    marginBottom: "15px",
  },
  ".view-deal-sheet-btn": {
    width: "100%",
    background: secondary,
    color: white,
    margin: "5px 0",
    "&:hover": {
      backgroundColor: darkPurpleHover,
    },
    borderRadius: 4,
  },
  ".edit-quote-btn": {
    width: "100%",
    margin: "5px 0",
    color: secondary,
    border: `1px solid${secondary}`,
    background: white,
    "&:hover": {
      backgroundColor: white,
    },
    borderRadius: 4,
  },
  ".edit-icon": {
    fontSize: "16px",
    padding: "0 8px 0 0",
  },
  ".car-specification": {
    listStyleType: "none",
    margin: "5px 0 15px 0",
    padding: 0,
    width: "100%",
    maxHeight: "36px",
    overflow: "hidden",
  },
  ".car-specification li": {
    fontSize,
    display: "inline-block",
    position: "relative",
    marginBottom: "4px",
    lineHeight: "14px",
    "&:after": {
      content: "' |'",
      margin: "0 2px",
    },
  },
  ".car-specification li:last-child:after": { content: "''" },
  ".car-specification.car-detail": { fontWeight: 600, margin: 0 },
  ".vehicle-img-container": {
    height: "150px",
    width: "100%",
  },
  ".car-detail-container": {
    padding: "15px 30px 15px 15px",
    borderRight: borderStyle,
  },
  ".spec-container": {
    padding: "15px 15px 15px 30px",
  },
  ".finance-section": {
    padding: 15,
  },
  ".car-dealer-info": {
    borderTop: borderStyle,
    padding: 10,
  },
  ".customer-accepted-date": {
    float: "left",
    letterSpacing: "1px",
    marginLeft: 15,
    display: "list-item",
  },
});
