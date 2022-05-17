import { Manager } from "@twilio/flex-ui";

export class DPAFailedRequest {
  public applicationId: number;

  public userId?: number | null;

  public comment: string;

  public createdBy: string;

  public isUserComment: boolean;

  public isPublic: boolean;

  public isImportant: boolean;

  constructor(applicationId: number) {
    this.applicationId = applicationId;
    this.comment =
      "Customer has failed DPA check. Please ensure a SAR is raised via Service Desk.";
    const { worker } = Manager.getInstance().store.getState().flex;
    const { attributes } = worker;
    // full name could come out as snake_case as it's a pre-defined property
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { fullName, full_name, agentId } = attributes;
    this.createdBy = fullName || full_name;
    this.userId = agentId || null;
    this.isImportant = true;
    this.isUserComment = true;
    this.isPublic = true;
  }
}
