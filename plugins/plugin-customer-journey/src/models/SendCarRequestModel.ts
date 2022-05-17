import { ChannelType } from "../common/enum";

export class SendCarRequestModel {
  public applicationId: number;

  public vehicleSearchUrl: string;

  public smsTypeId: ChannelType | string;

  public mobileNumber: string;

  constructor() {
    this.applicationId = -1;
    this.vehicleSearchUrl = "";
    this.smsTypeId = "";
    this.mobileNumber = "";
  }
}
