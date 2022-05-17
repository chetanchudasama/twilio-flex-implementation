import { BaseService } from "@common/components";
import { useEffect, useState } from "react";
import { TaskDecisionModel } from "../models/TaskDecisionModel";

interface TaskServiceProps {
  token: string;
  phoenixToken: string;
}

export class TaskService extends BaseService {
  baseUrl: string = process.env.REACT_APP_API_BASE_URL;

  token: string;

  phoenixToken: string;

  constructor(props: TaskServiceProps) {
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

  getTaskDecisions = async (): Promise<TaskDecisionModel[]> =>
    this.callApi<TaskDecisionModel[]>(
      this.baseUrl,
      "twilio-flex-helpers/task-decisions",
      "GET",
      this.headers
    );

  sendTaskOutcome = async (taskEngineTask: any): Promise<undefined> =>
    this.callApi<undefined>(
      this.baseUrl,
      "task-engine/complete",
      "POST",
      this.headers,
      undefined,
      taskEngineTask
    );
}

export function useTaskService(
  token: string,
  phoenixToken: string
): TaskService {
  const [vehicleService, setVehicleService] = useState(
    new TaskService({ token, phoenixToken })
  );
  useEffect(() => {
    setVehicleService(new TaskService({ token, phoenixToken }));
  }, [token, phoenixToken]);
  return vehicleService;
}
