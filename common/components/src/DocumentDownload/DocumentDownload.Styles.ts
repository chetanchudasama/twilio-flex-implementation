import styled from "react-emotion";
import { secondary } from "../shared/AppTheme";

export const DocumentDownloadStyles = styled("div")({
  ".download-icon": {
    position: "relative",
    top: "5px",
  },
  ".download-span": {
    color: secondary,
    cursor: "pointer",
    fontSize: 12,
  },
});
