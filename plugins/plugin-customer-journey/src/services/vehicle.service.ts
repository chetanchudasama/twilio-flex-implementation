import { BaseService } from "@common/components";
import { useEffect, useState } from "react";
import { VehicleExtraModel } from "../models/VehicleExtraModel";
import { VehicleDetailModel } from "../models/VehicleDetailModel";
import { VehicleSearchRequestModel } from "../models/VehicleSearchRequestModel";
import { VehicleSearchResultModel } from "../models/VehicleSearchResultModel";
import { DealerSearchRequestModel } from "../models/DealerSearchRequestModel";
import { DealerResponseModel } from "../models/DealerResponseModel";
import { VehicleVRMSearchRequestModel } from "../models/VehicleVRMSearchRequestModel";

interface VehicleServiceProps {
  token: string;
  phoenixToken: string;
}

export class VehicleService extends BaseService {
  baseUrl: string = process.env.REACT_APP_API_BASE_URL;

  token: string;

  phoenixToken: string;

  constructor(props: VehicleServiceProps) {
    super();
    this.token = props.token;
    this.phoenixToken = props.phoenixToken;
  }

  get headers(): Record<string, string> {
    return {
      Authorization: `Bearer ${this.token}`,
      phoenixtoken: this.phoenixToken,
    };
  }

  getVehicleDetail = async (
    vehicleId: number,
    postCode: string,
    imageWidth = 0
  ): Promise<VehicleDetailModel> =>
    this.callApi<VehicleDetailModel>(
      this.baseUrl,
      `vehicles/search/${vehicleId}`,
      "GET",
      this.headers,
      new URLSearchParams({
        imageWidth: imageWidth.toString(),
        postCode,
      })
    );

  vehicleSearch = async (
    searchRequestModel: VehicleSearchRequestModel
  ): Promise<VehicleSearchResultModel> =>
    this.callApi<VehicleSearchResultModel>(
      this.baseUrl,
      "vehicles/search",
      "POST",
      this.headers,
      undefined,
      searchRequestModel
    );

  getVehicleExtraItemList = async (): Promise<VehicleExtraModel[]> =>
    this.callApi<VehicleExtraModel[]>(
      this.baseUrl,
      "vehicles/extras",
      "GET",
      this.headers
    );

  vehicleSearchByVRM = async (
    searchRequestModel: VehicleVRMSearchRequestModel
  ): Promise<VehicleSearchResultModel> =>
    this.callApi<VehicleSearchResultModel>(
      this.baseUrl,
      "vehicles/search/by-vrm",
      "POST",
      this.headers,
      undefined,
      searchRequestModel
    );

  dealerSearch = async (
    dealerSearchModel: DealerSearchRequestModel
  ): Promise<DealerResponseModel[]> =>
    this.callApi<DealerResponseModel[]>(
      this.baseUrl,
      "dealers/search",
      "POST",
      this.headers,
      undefined,
      dealerSearchModel
    );
}

export function useVehicleService(
  token: string,
  phoenixToken: string
): VehicleService {
  const [vehicleService, setVehicleService] = useState(
    new VehicleService({ token, phoenixToken })
  );
  useEffect(() => {
    setVehicleService(new VehicleService({ token, phoenixToken }));
  }, [token, phoenixToken]);
  return vehicleService;
}
