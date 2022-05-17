import { ItemModel } from "./ItemModel";
import { VehicleModelData } from "./VehicleModelData";

export class VehicleMakeData extends ItemModel {
  public models: VehicleModelData[];

  constructor() {
    super();

    this.models = [];
  }
}
