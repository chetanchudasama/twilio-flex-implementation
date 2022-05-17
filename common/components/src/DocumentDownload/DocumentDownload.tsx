import React from "react";
import { Icon } from "@material-ui/core";
import { DocumentDownloadStyles } from "./DocumentDownload.Styles";

export interface DocumentDownloadProps {
  fileUrl: string;
}

export const DocumentDownload: React.FC<DocumentDownloadProps> = ({
  fileUrl,
}) => {
  const downloadFile = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <DocumentDownloadStyles>
      <span
        className="download-span"
        onClick={() => downloadFile(fileUrl)}
        onKeyDown={() => downloadFile(fileUrl)}
        role="button"
        tabIndex={0}
      >
        <Icon fontSize="small" className="download-icon">
          download
        </Icon>
        Download
      </span>
    </DocumentDownloadStyles>
  );
};
