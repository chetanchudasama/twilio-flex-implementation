import { CircularProgress } from "@material-ui/core";
import React from "react";
import { LoaderStyles } from "./Loading.Styles";
import { LoadingProps } from "./Loading.Props";

const getSize = (size?: "small" | "medium" | "large") => {
  if (size === "small") {
    return 30;
  }
  if (size === "medium") {
    return 50;
  }
  if (size === "large") {
    return 70;
  }

  return 50;
};

const Loading: React.FC<LoadingProps> = ({ size }) => (
  <LoaderStyles>
    <CircularProgress className="progress" size={getSize(size)} />
  </LoaderStyles>
);

export default Loading;
