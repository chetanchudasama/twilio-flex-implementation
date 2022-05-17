export class BaseAddressModel {
  subBuilding: string;

  buildingNumber: string;

  buildingName: string;

  streetName: string;

  town: string;

  postcode: string;

  constructor() {
    this.subBuilding = "";
    this.streetName = "";
    this.buildingName = "";
    this.buildingNumber = "";
    this.town = "";
    this.postcode = "";
  }
}
