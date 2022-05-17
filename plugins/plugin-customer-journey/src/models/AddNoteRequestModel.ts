import { Manager } from "@twilio/flex-ui";

export class AddNoteRequestModel {
  public comment: string;

  public applicationId: number;

  public userId: number;

  public isImportant: boolean;

  constructor() {
    const { agentId } =
      Manager.getInstance().store.getState().flex.worker.attributes;

    this.comment = "";
    this.applicationId = -1;
    this.userId = agentId || 0;
    this.isImportant = false;
  }
}
