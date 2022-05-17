import { NVDSpecModel } from "./NVDSpecModel";
import { VehicleBaseDetailModel } from "./VehicleBaseDetailModel";

export class VehicleDetailModel extends VehicleBaseDetailModel {
  public body: string;

  public colour: string;

  public doorsCount: number | null;

  public specs: NVDSpecModel[] | null;

  public keywords: string;

  public hasImages: boolean;

  constructor() {
    super();
    this.body = "";
    this.colour = "";
    this.doorsCount = null;
    this.specs = [];
    this.keywords = "";
    this.hasImages = false;
  }
}
