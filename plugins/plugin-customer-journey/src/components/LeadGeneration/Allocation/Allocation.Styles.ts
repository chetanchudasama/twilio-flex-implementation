import { black } from "@common/components";
import styled from "react-emotion";

export const AllocationStyles = styled("div")({
  padding: 24,
  width: "100%",
  ".heading": {
    fontSize: 20,
    lineHeight: "24px",
    fontWeight: 600,
    color: black,
  },
  ".allocation": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "2px 2px 2px 8px !important",
    marginLeft: -8,
  },
  ".find-agent-btn": {
    borderRadius: 4,
    fontWeight: 500,
    fontSize: 14,
    height: 40,
    boxShadow: "0px 1px 2px 0px #2C2B350A",
  },
});
