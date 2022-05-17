export class VehicleVRMSearchRequestModel {
  public vrm: string;

  public dealerId: number | null;

  constructor() {
    this.vrm = "";
    this.dealerId = null;
  }
}
