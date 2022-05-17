import { Shared } from "@common/components";

import { FactFindDetailModel } from "../models/FactFindDetailModel";
import { UpdateDetailRequestModel } from "../models/UpdateDetailRequestModel";

export const preparePatchData = (
  key: string,
  value: string | boolean | Record<string, unknown> | null | unknown
): UpdateDetailRequestModel => ({
  op: "replace",
  path: `/${key}`,
  value,
});

export const getFormattedFactFindDetail = (
  factFindDetail: FactFindDetailModel,
  make: string,
  model: string
): string => {
  let formattedString = "";
  const newLineString = "\n";
  const spaceString = "\u00A0";

  Object.entries(factFindDetail).forEach((entry) => {
    const [key, value] = entry;

    if (key === "borrowAmount") {
      const borrowAmount = Shared.getFormattedCurrencyValue(value);
      formattedString += `Q. How much is the customer looking to borrow?${newLineString}`;
      formattedString += `A. ${spaceString}${borrowAmount}${newLineString}${newLineString}`;
    }

    if (key === "hasCustomerAlreadyFoundCar") {
      const hasFoundVehicle =
        // eslint-disable-next-line no-nested-ternary
        value === true ? "Yes" : value === false ? "No" : "Not Asked";
      formattedString += `Q. Has the customer found a vehicle yet?${newLineString}`;
      formattedString += `A. ${spaceString}${hasFoundVehicle}${newLineString}${newLineString}`;
    }

    if (factFindDetail.hasCustomerAlreadyFoundCar) {
      if (key === "makeId") {
        formattedString += `Q. What is the car make?${newLineString}`;
        formattedString += `A. ${spaceString}${
          make || "-"
        }${newLineString}${newLineString}`;
      }

      if (key === "modelId") {
        formattedString += `Q. What is the car model?${newLineString}`;
        formattedString += `A. ${spaceString}${
          model || "-"
        }${newLineString}${newLineString}`;
      }

      if (key === "vrm") {
        formattedString += `Q. Does the customer know the VRM?${newLineString}`;
        formattedString += `A. ${spaceString}${
          value || "-"
        }${newLineString}${newLineString}`;
      }
    }

    if (key === "vehicleType") {
      formattedString += `Q. What type of vehicle are they looking for?${newLineString}`;
      formattedString += `A. ${spaceString}${
        value.name ? value.name : "-"
      }${newLineString}${newLineString}`;
    }

    if (key === "timeForPurchase") {
      formattedString += `Q. When are they hoping to be driving their new vehicle?${newLineString}`;
      formattedString += `A. ${spaceString}${
        value && value.name ? value.name : "-"
      }${newLineString}${newLineString}`;
    }

    if (key === "note") {
      formattedString += `Q. Any additional notes?${newLineString}A. `;
      if (value) {
        value.split(newLineString).forEach((val: string, index: number) => {
          formattedString +=
            index !== 0
              ? `${spaceString}${spaceString}${spaceString}${spaceString}${spaceString}`
              : `${spaceString}`;
          formattedString += `${val}${newLineString}`;
        });
      } else {
        formattedString += `${spaceString}-`;
      }
    }
  });
  return formattedString;
};
