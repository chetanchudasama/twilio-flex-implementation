export class DealerSearchRequestModel {
  public dealerId: number;

  public phoneNumber1: string;

  public phoneNumber2: string;

  public webSiteUrl: string;

  public emailAddress: string;

  public postCode: string;

  public dealerType: string;

  public dealerTypeId: number;

  public dealerSetupStatusId: number;

  constructor() {
    this.dealerId = 0;
    this.phoneNumber1 = "";
    this.phoneNumber2 = "";
    this.webSiteUrl = "";
    this.emailAddress = "";
    this.postCode = "";
    this.dealerType = "";
    this.dealerTypeId = 0;
    this.dealerSetupStatusId = 0;
  }
}
