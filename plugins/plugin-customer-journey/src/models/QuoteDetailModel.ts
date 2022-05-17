import { DealerResponseModel } from "./DealerResponseModel";
import { VehicleSummaryDetailModel } from "./VehicleSummaryDetailModel";
import { VehicleDetailModel } from "./VehicleDetailModel";
import { VehicleExtraModel } from "./VehicleExtraModel";

export class QuoteDetailModel extends VehicleDetailModel {
  public applicationId: number;

  public quoteId: number;

  public lenderId: number;

  public tierId: number;

  public vehicleExtras: VehicleExtraModel | null;

  public partExchangeRegistration: string;

  public partExchangeMileage: number | null;

  public partExchangeValue: number | null;

  public partExchangeSettlement: number | null;

  public deposit: number;

  public term: number;

  public apr: number;

  public amountToFinance: number;

  public monthlyPayment: number;

  public totalAmountPayable: number;

  public createdByUserId: number;

  public created: Date;

  public isAccepted: boolean;

  public acceptedDateTime: Date | null;

  constructor(vehicleDetail?: VehicleSummaryDetailModel | VehicleDetailModel) {
    super();
    this.applicationId = 0;
    this.quoteId = 0;
    this.lenderId = 0;
    this.tierId = 0;
    this.vehicleExtras = null;
    this.partExchangeRegistration = "";
    this.partExchangeMileage = null;
    this.partExchangeValue = null;
    this.partExchangeSettlement = null;
    this.term = 0;
    this.apr = 0;
    this.amountToFinance = 0;
    this.deposit = 0;
    this.monthlyPayment = 0;
    this.totalAmountPayable = 0;
    this.createdByUserId = 0;
    this.created = new Date();
    this.isAccepted = false;
    this.acceptedDateTime = null;
    this.regNumber = vehicleDetail?.regNumber ?? "";
    this.vehicleId = vehicleDetail?.vehicleId ?? 0;
    this.make = vehicleDetail?.make ?? "";
    this.model = vehicleDetail?.model ?? "";
    this.trans = vehicleDetail?.trans ?? "";
    this.fuel = vehicleDetail?.fuel ?? "";
    this.trim = vehicleDetail?.trim ?? "";
    this.year = vehicleDetail?.year ?? null;
    this.price = vehicleDetail?.price ?? 0;
    this.reducedPrice = vehicleDetail?.reducedPrice ?? 0;
    this.priceMonthly = vehicleDetail?.priceMonthly ?? 0;
    this.mileage = vehicleDetail?.mileage ?? 0;
    this.options = vehicleDetail?.options ?? "";
    this.date = vehicleDetail?.date ?? new Date();
    this.distance = vehicleDetail?.distance ?? null;
    this.is247Cars = vehicleDetail?.is247Cars ?? false;
    this.engine = vehicleDetail?.engine ?? 0;
    this.regYear = vehicleDetail?.regYear ?? 0;
    this.images = vehicleDetail?.images ?? [];
    this.dealer = vehicleDetail?.dealer ?? new DealerResponseModel();
  }
}
