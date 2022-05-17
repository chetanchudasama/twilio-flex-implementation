export interface IWorkerAttributes {
  agentId: number;
}

export interface IWorker {
  attributes: IWorkerAttributes;
  worker_sid: string;
}
