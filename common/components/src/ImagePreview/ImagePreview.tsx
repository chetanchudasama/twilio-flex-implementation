import React from "react";
import { ImagePreviewStyles } from "./ImagePreview.Styles";

export interface ImagePreviewProps {
  imageSrc: string;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ imageSrc }) => {
  return (
    <ImagePreviewStyles>
      <img alt="" src={imageSrc} className="image-content" />
    </ImagePreviewStyles>
  );
};
