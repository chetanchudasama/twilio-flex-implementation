import { AgentGuideContentModel } from "./AgentGuideContentModel";
import { ReasonForCarPurchaseItemModel } from "./ReasonForCarPurchaseItemModel";
import { TimeForPurchaseItemModel } from "./TimeForPurchaseModel";
import { WhereDidYouHearItemModel } from "./WhereDidYouHearItemModel";

export class QualifyDetailModel {
  public drivingLicenseConfirmed: boolean | null;

  public addressConfirmed: boolean | null;

  public incomeConfirmed: boolean | null;

  public placeOfWorkConfirmed: boolean | null;

  public reasonForPurchase: ReasonForCarPurchaseItemModel | null;

  public timeForPurchase: TimeForPurchaseItemModel | null;

  public whereDidYouHear: WhereDidYouHearItemModel | null;

  public agentGuideContent: AgentGuideContentModel;

  public hasCustomerAlreadyFoundCar: boolean | null;

  constructor() {
    this.drivingLicenseConfirmed = null;
    this.addressConfirmed = null;
    this.incomeConfirmed = null;
    this.placeOfWorkConfirmed = null;
    this.reasonForPurchase = new ReasonForCarPurchaseItemModel();
    this.timeForPurchase = new TimeForPurchaseItemModel();
    this.whereDidYouHear = new WhereDidYouHearItemModel();
    this.agentGuideContent = new AgentGuideContentModel();
    this.hasCustomerAlreadyFoundCar = null;
  }
}
