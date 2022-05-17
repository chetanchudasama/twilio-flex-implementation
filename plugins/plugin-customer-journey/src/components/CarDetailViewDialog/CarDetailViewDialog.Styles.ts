import { borderStyle, darkGrey, secondary } from "@common/components";
import styled from "react-emotion";

export const CarDetailViewDialogStyles = styled("div")({
  padding: "0 10px 20px 10px",
  position: "relative",
  minHeight: 400,
  "div.car-dialog-image": {
    width: "100%",
    position: "relative",
    height: "400px",
    marginBottom: 5,
  },
  ".car-dialog-image > div": {
    width: "auto",
    padding: 1,
  },
  ".car-dialog-image > div > .image-count": {
    top: "90%",
    bottom: "0",
    left: "50%",
    transform: "translateX(-50%)",
    borderRadius: "0px",
  },
  ".car-dialog-image > div > .image-count > .icon": {
    paddingTop: 3,
  },
  ".car-spec-detail": {
    paddingLeft: "15px",
    paddingRight: "5px",
  },
  ".car-price": {
    fontWeight: 600,
    fontSize: "18px",
    color: secondary,
  },
  ".car-prop": {
    borderBottom: borderStyle,
    padding: "10px 0",
    height: "100%",
  },
  ".car-prop-type": {
    color: darkGrey,
    fontSize: "14px",
    wordBreak: "break-word",
  },
  ".car-prop-value": {
    fontSize: "14px",
    fontWeight: 600,
    textAlign: "right",
    wordBreak: "break-word",
  },
  ".expand-more-link": {
    width: "fit-content",
    display: "flex",
    fontSize: "14px",
    color: secondary,
    padding: "8px 0px 0px 0px",
    textTransform: "unset",
  },
  ".expand-more-link:hover": {
    background: "none",
  },
  ".car-specification": {
    listStyleType: "none",
    margin: "7px 0 10px 0",
    padding: 0,
    width: "100%",
    maxHeight: "40px",
    overflow: "hidden",
  },
  ".car-specification li": {
    fontSize: "16px",
    display: "inline-block",
    position: "relative",
    marginBottom: "4px",
    lineHeight: "14px",
    fontWeight: 600,
    "&:after": {
      content: "' |'",
      margin: "0 2px",
    },
  },
  ".car-specification li:last-child:after": { content: "''" },
  ".dealer-info-content": {
    paddingRight: 2,
  },
  ".space-right": {
    paddingRight: 15,
  },
  ".space-left": {
    paddingLeft: 15,
  },
  "div > .progress": {
    top: "40% !important",
    left: "50% !important",
  },
  ".car-description-heading": {
    color: darkGrey,
    fontSize: "14px",
    wordBreak: "break-word",
    padding: "10px 0",
    marginTop: 10,
    borderTop: borderStyle,
  },
  ".car-description": {
    fontSize: "14px",
    fontWeight: 600,
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    wordBreak: "break-word",
    WebkitLineClamp: 3,
    overflow: "hidden",
    textOverflow: "ellipsis",
    textAlign: "justify",
    lineHeight: 1.5,
  },
  ".car-description-expanded": {
    display: "block",
  },
});
