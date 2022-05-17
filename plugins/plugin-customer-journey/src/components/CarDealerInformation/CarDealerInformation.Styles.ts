import { secondary, black } from "@common/components";
import styled from "react-emotion";

export const CarDealerInformationStyles = styled("div")({
  marginTop: 8,
  ".dealer-name": {
    fontSize: "16px",
    fontWeight: 600,
    paddingBottom: "8px",
    marginLeft: 5,
  },
  ".info-icon": {
    color: secondary,
    opacity: 0.4,
  },
  ".dealer-info": {
    fontSize: "14px",
    padding: "2px 10px 3px 10px",
    wordBreak: "break-word",
  },
  ".dealer-info-url": {
    fontSize: "14px",
    wordBreak: "break-word",
    padding: "2px 0px 3px 10px",
  },
  ".dealer-info-url a": {
    color: black,
  },
  ".dealer-phone, dealer-address": {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
});
