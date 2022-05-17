import moment from "moment";
import { OccupationStatusModel } from "../models/OccupationStatusModel";
import { FileType } from "./enum";
import { ResidentialStatusModel } from "../models/ResidentialStatusModel";

export class Shared {
  public static defaultPageSize = 10;

  public static defaultPage = 1;

  // currency formatter
  public static currencyFormatter = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  // number formatter
  public static numberFormatter = new Intl.NumberFormat("en-GB", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  public static getFormattedCurrencyValue(value: number): string {
    return this.currencyFormatter.format(value);
  }

  public static getFormattedNumber(value: number): string {
    return this.numberFormatter.format(value);
  }

  public static getFormattedText(lines: string[], spacer: string): string {
    return lines
      .filter((l) => l !== "" && l !== null)
      .map((l) => l.trim())
      .join(spacer);
  }

  public static getFormattedDate(dateValue: Date, format: string): string {
    return dateValue && moment(dateValue).isValid()
      ? moment.utc(dateValue).local().format(format)
      : "";
  }

  public static isNumericValue = (
    value: string,
    isDecimalAllowed = true
  ): boolean => {
    const validationRegex = isDecimalAllowed ? /^\d*\.?\d*$/ : /^\d*$/;
    return !!validationRegex.test(value);
  };

  public static vulnerabilityReasonList = [
    { id: 1, name: "Computer Literacy/Numeracy/Literacy" },
    { id: 2, name: "Physical disability" },
    { id: 3, name: "Sever/Long-Term Illness" },
    { id: 4, name: "Mental Health" },
    { id: 5, name: "Financial" },
    { id: 6, name: "Language Barrier" },
    { id: 7, name: "Drug/Alcohol" },
    { id: 8, name: "Learning Disability" },
    { id: 9, name: "Age" },
    { id: 10, name: "Mental Capacity" },
  ];

  public static imageExtensionList: string[] = [
    "png",
    "jpg",
    "jpeg",
    "gif",
    "webp",
    "svg",
    "ico",
    "bmp",
  ];

  public static audioExtensionList: string[] = [
    "mp3",
    "wav",
    "aac",
    "ogg",
    "mp4",
    "wma",
    "opus",
    "flac",
    "m4a",
  ];

  public static getFileType = (url: string): FileType => {
    const index = url.lastIndexOf(".");
    if (index > -1) {
      const extension = url
        .substring(index + 1, url.length)
        .toLocaleLowerCase();
      for (let i = 0; i < Shared.imageExtensionList.length; i += 1) {
        if (extension.includes(Shared.imageExtensionList[i])) {
          return FileType.Image;
        }
      }
      for (let i = 0; i < Shared.audioExtensionList.length; i += 1) {
        if (extension.includes(Shared.audioExtensionList[i])) {
          return FileType.Audio;
        }
      }
      return FileType.Other;
    }
    return FileType.Other;
  };

  public static termList = [
    { id: 36, name: "36 months" },
    { id: 48, name: "48 months" },
    { id: 60, name: "60 months" },
  ];

  public static validatePercentageValue = (value: string): boolean => {
    const regex = /(^100(\.0{1,2})?$)|(^([1-9]([0-9])?|0)(\.[0-9]{1,2})?$)/;
    return (
      regex.test(value) ||
      (value.length > 1 &&
        value.split(".").length - 1 === 1 &&
        value[value.length - 1] === ".")
    );
  };

  public static EngineSizes = [
    1.0, 1.5, 1.6, 1.7, 1.8, 2.0, 2.2, 2.3, 2.5, 2.6, 2.8, 3.0, 3.2, 3.3, 3.5,
  ];

  public static titles = [
    { id: 1, description: "Mr" },
    { id: 2, description: "Mrs" },
    { id: 3, description: "Ms" },
    { id: 4, description: "Miss" },
    { id: 5, description: "Dr" },
    { id: 6, description: "Rev" },
  ];

  public static maritalStatuses = [
    { id: 1, description: "Married" },
    { id: 2, description: "Cohabiting" },
    { id: 3, description: "Single" },
    { id: 4, description: "Divorced" },
    { id: 5, description: "Separated" },
    { id: 6, description: "Widowed" },
    { id: 7, description: "Civil partnership" },
  ];

  public static licenceTypes = [
    { id: 1, description: "Full New UK Driving Licence [photocard]" },
    { id: 2, description: "Full UK Driving Licence" },
    { id: 3, description: "International Licence" },
    { id: 4, description: "No Licence" },
    { id: 5, description: "Provisional UK Driving Licence" },
    { id: 6, description: "EU Licence" },
  ];

  public static OccupationStatuses: OccupationStatusModel[] = [
    {
      id: 1,
      name: "Employed Full Time",
    },
    {
      id: 2,
      name: "Employed Part Time",
    },
    {
      id: 3,
      name: "Self Employed",
    },
    {
      id: 4,
      name: "Armed Forces",
    },
    {
      id: 5,
      name: "Not Employed",
    },
    {
      id: 6,
      name: "Retired",
    },
    {
      id: 7,
      name: "Agency Worker",
    },
    {
      id: 8,
      name: "Contract Worker",
    },
    {
      id: 9,
      name: "Sub-contractor",
    },
    {
      id: 10,
      name: "Disability",
    },
    {
      id: 11,
      name: "Housewife",
    },
    {
      id: 12,
      name: "Student",
    },
    {
      id: 13,
      name: "Carer",
    },
    {
      id: 14,
      name: "Carer - Non Prof",
    },
  ];

  public static residentialStatuses: ResidentialStatusModel[] = [
    { id: 1, name: "Home Owner" },
    { id: 2, name: "Private Tenant" },
    { id: 3, name: "Council Tenant" },
    { id: 4, name: "Living with Parents" },
    { id: 5, name: "Tenant" },
  ];
}
