import { useEffect, useState } from "react";

import { BaseService } from "@common/components";

import { RankedAgentModel } from "../models/RankedAgentModel";

interface AllocateServiceProps {
  token: string;
}
export class AllocateService extends BaseService {
  baseUrl: string = process.env.REACT_APP_API_BASE_URL;

  token!: string;

  constructor(props: AllocateServiceProps) {
    super();
    this.token = props.token;
  }

  get headers(): Record<string, string> {
    return {
      Authorization: `Bearer ${this.token}`,
    };
  }

  public getRankedAgents = async (
    applicationId: number
  ): Promise<RankedAgentModel[]> =>
    this.callApi<RankedAgentModel[]>(
      this.baseUrl,
      "ranked-agents",
      "GET",
      this.headers,
      new URLSearchParams({ applicationId: applicationId.toString() })
    );
}

export function useAllocateService(token: string): AllocateService {
  const [allocateService, setAllocateService] = useState(
    new AllocateService({ token })
  );
  useEffect(() => {
    setAllocateService(new AllocateService({ token }));
  }, [token]);
  return allocateService;
}
