export class VehicleExtraModel {
  vehicleExtraOptionId: number;

  vehicleExtraTypeId: number;

  vehicleExtraTypeName: string;

  description: string;

  price: number;

  constructor() {
    this.vehicleExtraOptionId = -1;
    this.vehicleExtraTypeId = 0;
    this.vehicleExtraTypeName = "";
    this.description = "";
    this.price = 0;
  }
}
