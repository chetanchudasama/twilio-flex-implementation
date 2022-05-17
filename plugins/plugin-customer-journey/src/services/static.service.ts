import { BaseService } from "@common/components";
import { useEffect, useState } from "react";
import { DropDownDataModel } from "../models/DropDownDataModel";

import { VehicleSearchDropdownData } from "../models/VehicleSearchDropdownData";

interface StaticServiceProps {
  token: string;
  phoenixToken: string;
}
export class StaticService extends BaseService {
  baseUrl: string = process.env.REACT_APP_API_BASE_URL;

  token!: string;

  phoenixToken: string;

  constructor(props: StaticServiceProps) {
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

  getDropdownData = async (): Promise<DropDownDataModel> =>
    this.callApi<DropDownDataModel>(
      this.baseUrl,
      "static/qualify/dropdown-data",
      "GET",
      this.headers
    );

  getVehicleSearchDropdownData = async (): Promise<VehicleSearchDropdownData> =>
    this.callApi<VehicleSearchDropdownData>(
      this.baseUrl,
      "static/search/dropdown-data",
      "GET",
      this.headers
    );
}

export function useStaticService(
  token: string,
  phoenixToken: string
): StaticService {
  const [staticService, setStaticService] = useState(
    new StaticService({ token, phoenixToken })
  );
  useEffect(() => {
    setStaticService(new StaticService({ token, phoenixToken }));
  }, [token, phoenixToken]);
  return staticService;
}
