import {
  black,
  darkGrey,
  mediumGrey,
  secondary,
  white,
  darkPurpleHover,
  borderStyle,
} from "@common/components";
import styled from "react-emotion";

export const CarSearchResultDetailStyles = styled("div")({
  position: "relative",
  border: borderStyle,
  margin: "10px",
  height: "auto",
  maxHeight: "375px",
  borderRadius: 10,

  ".car-search-detail": {
    padding: "14px",
    borderBottom: borderStyle,
    height: "275px",
  },
  ".dealer-detail": {
    padding: "6px 14px 14px 14px",
    height: "100px",
    alignItems: "center",
  },
  ".car-price": {
    paddingTop: "10px",
    color: secondary,
    fontWeight: 600,
    fontSize: "18px",
  },
  ".car-model": {
    fontSize: "16px",
    fontWeight: 600,
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
  ".offer-best-match": {
    border: borderStyle,
    margin: "0 0 8px 5px",
    color: darkGrey,
    cursor: "pointer",
    borderRadius: 3,
  },
  ".offer-unavailable": {
    border: borderStyle,
    margin: "0 0 8px 5px",
    color: mediumGrey,
    borderRadius: 3,
  },
  ".offer-detail": {
    border: borderStyle,
    margin: "0 0 8px 5px",
    color: darkGrey,
    cursor: "pointer",
    borderRadius: 3,
  },
  ".offer-selected": {
    border: `2px solid${secondary}`,
    margin: "0 0 8px 5px",
    color: darkGrey,
    cursor: "pointer",
    borderRadius: 3,
  },
  ".offer-best-match-heading": {
    textAlign: "center",
    padding: "5px",
    borderBottom: borderStyle,
    cursor: "pointer",
  },
  ".offer-best-match-selected": {
    background: secondary,
    textAlign: "center",
    color: white,
    padding: "5px",
    cursor: "pointer",
  },
  ".offer-detail-content": {
    padding: "6px",
    textAlign: "center",
    cursor: "pointer",
    borderRadius: 3,
  },
  ".offer-unavailable .offer-detail-content": {
    padding: "6px",
    paddingBottom: "10px",
    cursor: "default",
    borderRadius: 3,
  },
  ".offer-term": {
    fontSize: "14px",
    paddingBottom: "5px",
  },
  ".offer-amount": {
    fontSize: "16px",
    lineHeight: "20px",
    fontWeight: 600,
  },
  ".offer-pm": {
    fontSize: "14px",
    lineHeight: "22px",
    paddingLeft: "5px",
  },
  ".offer-price": {
    display: "flex",
    justifyContent: "center",
  },
  ".dealer-fee": {
    textAlign: "center",
    wordBreak: "break-all",
    margin: "5px 0 0 5px",
    color: darkGrey,
  },
  ".quote-btn": {
    backgroundColor: secondary,
    color: white,
    "&:hover": {
      backgroundColor: darkPurpleHover,
    },
    margin: "5px 5px 5px 0",
    height: "36px",
    padding: "5px 15px",
    borderRadius: 3,
  },
  ".secondary-button": {
    color: secondary,
    margin: "5px 5px 5px 0",
    height: "36px",
    padding: "5px 15px",
    borderRadius: 3,
  },
  ".car-specification": {
    listStyleType: "none",
    margin: "5px 0",
    padding: 0,
    width: "100%",
    maxHeight: "36px",
    overflow: "hidden",
  },
  ".car-specification li": {
    fontSize: "14px",
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
  ".vehicle-img-container": {
    height: "373px",
    width: "100%",
  },
});
