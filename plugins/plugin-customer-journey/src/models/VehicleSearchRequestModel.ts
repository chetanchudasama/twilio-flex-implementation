import { Shared } from "@common/components";
import { VehicleSortingOptions } from "../common/enum";
import { RangeFilterModel } from "./RangeFilterModel";

export class VehicleSearchRequestModel {
  public makeIds: number[];

  public modelIds: number[];

  public engineMin: number | null;

  public engineMax: number | null;

  public ageRange: RangeFilterModel | null;

  public mileageRange: RangeFilterModel | null;

  public priceMax: number | null;

  public priceMonthly: number | null;

  public bodyIds: number[];

  public fuelIds: number[];

  public colourIds: number[];

  public transId: number | null;

  public distance: number | null;

  public keywords: string | null;

  public includeDeliveryDealer: boolean;

  public isFlexible: boolean;

  public page: number | null;

  public pageSize: number | null;

  public sort: number | null;

  public postcode: string;

  public dealerId: number | null;

  constructor() {
    this.makeIds = [];
    this.modelIds = [];
    this.engineMin = null;
    this.engineMax = null;
    this.ageRange = null;
    this.mileageRange = null;
    this.priceMax = null;
    this.priceMonthly = null;
    this.bodyIds = [];
    this.colourIds = [];
    this.fuelIds = [];
    this.transId = null;
    this.distance = null;
    this.keywords = "";
    this.includeDeliveryDealer = false;
    this.isFlexible = false;
    this.page = Shared.defaultPage;
    this.pageSize = Number(
      process.env.REACT_APP_CAR_SEARCH_PAGE_SIZE || Shared.defaultPageSize
    );
    this.sort = VehicleSortingOptions.PriceDescending;
    this.postcode = "";
    this.dealerId = null;
  }
}
