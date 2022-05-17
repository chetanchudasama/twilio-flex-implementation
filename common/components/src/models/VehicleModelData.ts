import { ItemModel } from "./ItemModel";

export class VehicleModelData extends ItemModel {
  public count: number;

  constructor() {
    super();
    this.count = 0;
  }
}
