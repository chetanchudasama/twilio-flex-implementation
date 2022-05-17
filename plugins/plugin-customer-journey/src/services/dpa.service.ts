import { BaseService } from "@common/components";
import { UpdateDetailRequestModel } from "models/UpdateDetailRequestModel";
import { useEffect, useState } from "react";
import { DPAFailedRequest } from "../models/DPAFailedRequest";

interface DPAServiceProps {
  token: string;
}

export class DPAService extends BaseService {
  baseUrl: string = process.env.REACT_APP_API_BASE_URL;

  token!: string;

  constructor(props: DPAServiceProps) {
    super();
    this.token = props.token;
  }

  get headers(): Record<string, string> {
    return {
      Authorization: `Bearer ${this.token}`,
    };
  }

  public dpaFailed = async (
    dpaFailedRequest: DPAFailedRequest
  ): Promise<void> =>
    this.callApi<void>(
      this.baseUrl,
      "application/dpa-failed",
      "PUT",
      this.headers,
      undefined,
      dpaFailedRequest
    );

  public setNewPin = async (
    applicationId: number,
    updateDetailRequest: UpdateDetailRequestModel[]
  ): Promise<void> =>
    this.callApi<void>(
      this.baseUrl,
      `application/base-application-details/${applicationId}`,
      "PATCH",
      this.headers,
      undefined,
      updateDetailRequest
    );
}

export function useDPAService(token: string): DPAService {
  const [customerService, setCustomerService] = useState(
    new DPAService({ token })
  );
  useEffect(() => {
    setCustomerService(new DPAService({ token }));
  }, [token]);
  return customerService;
}
