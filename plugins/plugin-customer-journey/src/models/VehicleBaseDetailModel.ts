import { DealerResponseModel } from "./DealerResponseModel";

export class VehicleBaseDetailModel {
  public regNumber: string;

  public vehicleId: number;

  public make: string;

  public model: string;

  public trans: string;

  public fuel: string;

  public trim: string;

  public year: number | null;

  public price: number;

  public reducedPrice: number;

  public priceMonthly: number;

  public mileage: number;

  public options: string;

  public date: Date;

  public distance: number | null;

  public is247Cars: boolean;

  public engine: number;

  public regYear: number;

  public images: string[];

  public dealer: DealerResponseModel;

  constructor() {
    this.regNumber = "";
    this.vehicleId = 0;
    this.make = "";
    this.model = "";
    this.trans = "";
    this.fuel = "";
    this.trim = "";
    this.year = null;
    this.price = 0;
    this.reducedPrice = 0;
    this.priceMonthly = 0;
    this.mileage = 0;
    this.options = "";
    this.date = new Date();
    this.distance = null;
    this.is247Cars = false;
    this.engine = 0;
    this.regYear = 0;
    this.images = [];
    this.dealer = new DealerResponseModel();
  }
}
