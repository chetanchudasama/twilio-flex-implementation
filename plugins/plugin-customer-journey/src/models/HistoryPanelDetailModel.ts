import { HistoryPanelMemberType } from "../common/enum";
import { ActionTypeModel } from "./ActionTypeModel";

export class HistoryPanelDetailModel {
  public id: string;

  public actionedBy: HistoryPanelMemberType | string;

  public actionType: ActionTypeModel;

  public content: string;

  public isImportant: boolean;

  public timestamp: Date;

  public url: string;

  constructor() {
    this.id = "";
    this.actionedBy = "";
    this.actionType = new ActionTypeModel();
    this.content = "";
    this.isImportant = false;
    this.timestamp = new Date();
    this.url = "";
  }
}
