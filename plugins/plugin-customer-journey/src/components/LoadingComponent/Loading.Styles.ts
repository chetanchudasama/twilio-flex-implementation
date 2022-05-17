import styled from "react-emotion";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { white } from "@common/components";

export const LoaderStyles = styled("div")({
  position: "absolute",
  top: "50%",
  left: "50%",
  height: "100%",
  width: "100%",
  background: fade(white, 0.5),
  zIndex: 1303,
  "-ms-transform": "translate(-50%, -50%)",
  transform: "translate(-50%, -50%)",
  ".progress": {
    margin: 0,
    position: "absolute",
    top: "45%",
    left: "45%",
  },
});
