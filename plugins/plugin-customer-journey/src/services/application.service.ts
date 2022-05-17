import { useEffect, useState } from "react";

import { BaseService, CustomerDetailModel } from "@common/components";
import { NoteModel } from "../models/NoteModel";

import { AddNoteDetailModel } from "../models/AddNoteDetailModel";
import { CustomerCallbackRequestModel } from "../models/CustomerCallbackRequestModel";
import { HistoryPanelDetailModel } from "../models/HistoryPanelDetailModel";
import { PartExchangeValuationModel } from "../models/PartExchangeValuationModel";
import { QualifyDetailModel } from "../models/QualifyDetailModel";
import { QuoteDetailModel } from "../models/QuoteDetailModel";
import { QuoteRequestModel } from "../models/QuoteRequestModel";
import { SendCarRequestModel } from "../models/SendCarRequestModel";
import { UpdateDetailRequestModel } from "../models/UpdateDetailRequestModel";
import { VehicleDetailModel } from "../models/VehicleDetailModel";
import { AddNoteRequestModel } from "../models/AddNoteRequestModel";
import { AddressSearchResponseModel } from "../models/AddressSearchResponseModel";
import { AddressResponseModel } from "../models/AddressResponseModel";

interface ApplicationServiceProps {
  token: string;
}
export class ApplicationService extends BaseService {
  baseUrl: string = process.env.REACT_APP_API_BASE_URL;

  token!: string;

  constructor(props: ApplicationServiceProps) {
    super();
    this.token = props.token;
  }

  get headers(): Record<string, string> {
    return {
      Authorization: `Bearer ${this.token}`,
    };
  }

  getBaseDetails = async (
    applicationId: number
  ): Promise<CustomerDetailModel> =>
    this.callApi<CustomerDetailModel>(
      this.baseUrl,
      `application/base-application-details/${applicationId}`,
      "GET",
      this.headers
    );

  getQualifyingDetails = async (
    applicationId: number
  ): Promise<QualifyDetailModel> =>
    this.callApi<QualifyDetailModel>(
      this.baseUrl,
      `application/qualify-screen-details/${applicationId}`,
      "GET",
      this.headers
    );

  updateQualifyingDetails = async (
    applicationId: number,
    updateDetailRequest: UpdateDetailRequestModel[]
  ): Promise<undefined> =>
    this.callApi<undefined>(
      this.baseUrl,
      `application/qualify-screen-details/${applicationId}`,
      "PATCH",
      this.headers,
      undefined,
      updateDetailRequest
    );

  getHistoryDetails = async (
    applicationId: number
  ): Promise<HistoryPanelDetailModel[]> =>
    this.callApi<HistoryPanelDetailModel[]>(
      this.baseUrl,
      "application/gethistory",
      "GET",
      this.headers,
      new URLSearchParams({ applicationId: applicationId.toString() })
    );

  updateHistoryDetails = async (
    applicationId: number,
    messageId: string,
    updateDetailRequest: UpdateDetailRequestModel[]
  ): Promise<undefined> =>
    this.callApi<undefined>(
      this.baseUrl,
      `application/update-history/${applicationId}/${messageId}`,
      "PATCH",
      this.headers,
      undefined,
      updateDetailRequest,
      true
    );

  addNoteDetail = async (
    addNoteModel: AddNoteDetailModel
  ): Promise<undefined> =>
    this.callApi<undefined>(
      this.baseUrl,
      "application/add-note",
      "POST",
      this.headers,
      undefined,
      addNoteModel,
      true
    );

  sendCarDetail = async (
    sendCarDetailModel: SendCarRequestModel
  ): Promise<undefined> =>
    this.callApi<undefined>(
      this.baseUrl,
      "application/send-car",
      "POST",
      this.headers,
      undefined,
      sendCarDetailModel,
      true
    );

  createQuote = async (
    quoteRequestModel: QuoteRequestModel
  ): Promise<QuoteDetailModel> =>
    this.callApi<QuoteDetailModel>(
      this.baseUrl,
      "application/create-quote",
      "POST",
      this.headers,
      undefined,
      quoteRequestModel
    );

  updateBaseApplicationDetail = async (
    applicationId: number,
    updateDetailRequest: UpdateDetailRequestModel[]
  ): Promise<undefined> =>
    this.callApi<undefined>(
      this.baseUrl,
      `application/base-application-details/${applicationId}`,
      "PATCH",
      this.headers,
      undefined,
      updateDetailRequest
    );

  getQuoteList = async (applicationId: number): Promise<QuoteDetailModel[]> =>
    this.callApi<QuoteDetailModel[]>(
      this.baseUrl,
      `application/${applicationId}/quotes`,
      "GET",
      this.headers
    );

  submitCallbackDetail = async (
    applicationId: number,
    callbackDetail: CustomerCallbackRequestModel
  ): Promise<undefined> =>
    this.callApi<undefined>(
      this.baseUrl,
      `application/${applicationId}/callback`,
      "POST",
      this.headers,
      undefined,
      callbackDetail,
      true
    );

  public getPartExchangeValuation = async (
    vehicleRegistration: string,
    vehicleMileage: number
  ): Promise<PartExchangeValuationModel> =>
    this.callApi<PartExchangeValuationModel>(
      this.baseUrl,
      "vehicle/valuation",
      "GET",
      this.headers,
      new URLSearchParams({
        vehicleRegistration,
        vehicleMileage: vehicleMileage.toString(),
      })
    );

  public getSavedVehicles = async (
    applicationId: number
  ): Promise<VehicleDetailModel[]> =>
    this.callApi<VehicleDetailModel[]>(
      this.baseUrl,
      `application/${applicationId}/saved-vehicles`,
      "GET",
      this.headers
    );

  public updateSavedVehicles = async (
    applicationId: number,
    vehicles: VehicleDetailModel[]
  ): Promise<undefined> =>
    this.callApi<undefined>(
      this.baseUrl,
      `application/${applicationId}/saved-vehicles`,
      "POST",
      this.headers,
      undefined,
      vehicles,
      true
    );

  public searchAddress = async (
    postCode: string
  ): Promise<AddressSearchResponseModel[]> =>
    this.callApi<AddressSearchResponseModel[]>(
      this.baseUrl,
      "address/search",
      "GET",
      this.headers,
      new URLSearchParams({ postCode })
    );

  public addNoteRequest = async (
    applicationId: number,
    addNoteRequestModel: AddNoteRequestModel
  ): Promise<undefined> =>
    this.callApi<undefined>(
      this.baseUrl,
      `application/${applicationId}/notes`,
      "POST",
      this.headers,
      undefined,
      addNoteRequestModel,
      true
    );

  public getNotes = async (applicationId: number): Promise<NoteModel[]> =>
    this.callApi<NoteModel[]>(
      this.baseUrl,
      `application/${applicationId}/notes`,
      "GET",
      this.headers
    );

  public getAddressDetail = async (
    key: string
  ): Promise<AddressResponseModel> =>
    this.callApi<AddressResponseModel>(
      this.baseUrl,
      "address",
      "GET",
      this.headers,
      new URLSearchParams({ key })
    );
}

export function useApplicationService(token: string): ApplicationService {
  const [applicationService, setApplicationService] = useState(
    new ApplicationService({ token })
  );
  useEffect(() => {
    setApplicationService(new ApplicationService({ token }));
  }, [token]);
  return applicationService;
}
