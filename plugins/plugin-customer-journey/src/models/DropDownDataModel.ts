import { ReasonForCarPurchaseItemModel } from "./ReasonForCarPurchaseItemModel";
import { TimeForPurchaseItemModel } from "./TimeForPurchaseModel";
import { WhereDidYouHearItemModel } from "./WhereDidYouHearItemModel";

export class DropDownDataModel {
  reasonForPurchaseItems!: ReasonForCarPurchaseItemModel[];

  timeForPurchaseItems!: TimeForPurchaseItemModel[];

  whereDidYouHearItems!: WhereDidYouHearItemModel[];

  constructor() {
    this.reasonForPurchaseItems = [];
    this.timeForPurchaseItems = [];
    this.whereDidYouHearItems = [];
  }
}
