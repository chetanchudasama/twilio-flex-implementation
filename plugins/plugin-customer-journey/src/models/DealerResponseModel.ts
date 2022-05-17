import { DealerStateType } from "../common/enum";
import { CoordinatesResponseModel } from "./CoordinatesResponseModel";

export class DealerResponseModel {
  public dealerId: number;

  public dealerName: string;

  public building: string;

  public streetName: string;

  public town: string;

  public county: string;

  public postcode: string;

  public phone: string;

  public url: string;

  public rating: number | null;

  public coordinates: CoordinatesResponseModel;

  public state: DealerStateType;

  public declinedDate: Date | null;

  public declinedReason: string | null;

  constructor() {
    this.dealerId = 0;
    this.dealerName = "";
    this.building = "";
    this.streetName = "";
    this.town = "";
    this.county = "";
    this.postcode = "";
    this.phone = "";
    this.url = "";
    this.rating = null;
    this.coordinates = new CoordinatesResponseModel();
    this.state = 3;
    this.declinedDate = null;
    this.declinedReason = "";
  }
}
