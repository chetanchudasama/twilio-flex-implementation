import { VehicleBaseDetailModel } from "./VehicleBaseDetailModel";

export class VehicleSummaryDetailModel extends VehicleBaseDetailModel {
  public dealerAdminFee: number | null;

  public capOptions: string;

  public image: string;

  public imagesCount: number;

  public reducedOn: Date | null;

  public createdOn: Date | null;

  constructor() {
    super();
    this.dealerAdminFee = null;
    this.capOptions = "";
    this.image = "";
    this.imagesCount = 0;
    this.reducedOn = null;
    this.createdOn = null;
  }
}
