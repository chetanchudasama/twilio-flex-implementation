import React from "react";
import { CustomSnackbar } from "@common/components";

import { CarRegisteredSnackbarProps } from "./CarRegisteredSnackbar.Props";

export const CarRegisteredSnackbar: React.FC<CarRegisteredSnackbarProps> = ({
  is247Cars,
}) => {
  return (
    <>
      {is247Cars ? (
        <CustomSnackbar
          type="success"
          message="Great news! This car is on our car search with one of our approved dealers!"
        />
      ) : (
        <CustomSnackbar
          type="info"
          message="This car isn't in our car search."
        />
      )}
    </>
  );
};
