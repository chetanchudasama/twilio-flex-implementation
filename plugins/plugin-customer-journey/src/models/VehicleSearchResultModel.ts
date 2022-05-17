import { VehicleSummaryDetailModel } from "./VehicleSummaryDetailModel";

export class VehicleSearchResultModel {
  public page: number;

  public pageSize: number;

  public total: number;

  public vehicles: VehicleSummaryDetailModel[];

  constructor() {
    this.page = 0;
    this.pageSize = 0;
    this.total = 0;
    this.vehicles = [];
  }
}
