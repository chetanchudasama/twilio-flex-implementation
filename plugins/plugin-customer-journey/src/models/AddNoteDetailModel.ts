export class AddNoteDetailModel {
  public applicationId: number;

  public content: string;

  public isImportant: boolean;

  public sendToBroker: boolean;

  constructor() {
    this.applicationId = -1;
    this.content = "";
    this.isImportant = false;
    this.sendToBroker = false;
  }
}
