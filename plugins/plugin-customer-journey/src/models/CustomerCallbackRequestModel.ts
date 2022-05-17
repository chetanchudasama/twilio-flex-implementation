import moment from "moment";
import type { Moment } from "moment";

export class CustomerCallbackRequestModel {
  public note: string;

  public callbackDate: Moment;

  constructor() {
    this.note = "";
    this.callbackDate = moment();
  }
}
