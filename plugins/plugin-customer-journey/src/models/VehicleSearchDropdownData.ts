import { ItemModel, VehicleMakeData } from "@common/components";

export class VehicleSearchDropdownData {
  public makesModels: VehicleMakeData[];

  public colour: ItemModel[];

  public body: ItemModel[];

  public fuel: ItemModel[];

  // Transmission
  public trans: ItemModel[];

  public distance: number[];

  constructor() {
    this.makesModels = [];
    this.colour = [];
    this.body = [];
    this.fuel = [];
    this.trans = [];
    this.distance = [];
  }
}
