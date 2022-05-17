export class OfferInformationModel {
  public term: number;

  public monthlyAmount: number;

  public bestMatch: boolean;

  public available: boolean;

  constructor() {
    this.term = 36;
    this.monthlyAmount = 0;
    this.bestMatch = false;
    this.available = false;
  }
}
