import { ItemModel } from "@common/components";
import { TimeForPurchaseItemModel } from "./TimeForPurchaseModel";

export class FactFindDetailModel {
  public borrowAmount: number;

  public hasCustomerAlreadyFoundCar: boolean | null;

  public makeId: number;

  public modelId: number;

  public vrm: string;

  public vehicleType: ItemModel;

  public timeForPurchase: TimeForPurchaseItemModel | null;

  public note: string;

  constructor() {
    this.borrowAmount = 0;
    this.hasCustomerAlreadyFoundCar = null;
    this.makeId = -1;
    this.modelId = -1;
    this.vrm = "";
    this.vehicleType = new ItemModel();
    this.timeForPurchase = new TimeForPurchaseItemModel();
    this.note = "";
  }
}
