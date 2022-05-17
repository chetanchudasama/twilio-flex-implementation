import { QuoteDetailModel } from "models/QuoteDetailModel";
import { VehicleExtraModel } from "./VehicleExtraModel";

export class QuoteRequestModel {
  public applicationId: number;

  public lenderId: number;

  public vehicleRegistration: string;

  public vehicleExtras: VehicleExtraModel | null;

  public partExchangeRegistration: string;

  public partExchangeValue: number | null;

  public partExchangeSettlement: number | null;

  public deposit: number;

  public term: number;

  public amountToFinance: number;

  public monthlyPayment: number;

  public totalAmountPayable: number;

  constructor(quoteDetail?: QuoteDetailModel) {
    this.applicationId = quoteDetail?.applicationId ?? 0;
    this.lenderId = quoteDetail?.lenderId ?? 0;
    this.vehicleRegistration = quoteDetail?.regNumber ?? "";
    this.vehicleExtras = quoteDetail?.vehicleExtras ?? null;
    this.partExchangeRegistration = quoteDetail?.partExchangeRegistration ?? "";
    this.partExchangeValue = quoteDetail?.partExchangeValue ?? null;
    this.partExchangeSettlement = quoteDetail?.partExchangeSettlement ?? null;
    this.deposit = quoteDetail?.deposit ?? 0;
    this.term = quoteDetail?.term ?? -1;
    this.amountToFinance = quoteDetail?.amountToFinance ?? 0;
    this.monthlyPayment = quoteDetail?.monthlyPayment ?? 0;
    this.totalAmountPayable = quoteDetail?.totalAmountPayable ?? 0;
  }
}
