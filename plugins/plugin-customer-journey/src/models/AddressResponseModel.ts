export class AddressResponseModel {
  public CompanyName: string;

  public SubBuilding: string;

  public BuildingName: string;

  public BuildingNumber: string;

  public Street: string;

  public Locality: string;

  public Town: string;

  public Country: string;

  public Postcode: string;

  public AddressLine: string;

  public MaskedPostcode: string;

  public Key: string;

  public GridEast: string;

  public GridNorth: string;

  public Latitude: number;

  public Longitude: number;

  constructor() {
    this.CompanyName = "";
    this.SubBuilding = "";
    this.BuildingName = "";
    this.BuildingNumber = "";
    this.Street = "";
    this.Locality = "";
    this.Town = "";
    this.Country = "";
    this.Postcode = "";
    this.AddressLine = "";
    this.MaskedPostcode = "";
    this.Key = "";
    this.GridEast = "";
    this.GridNorth = "";
    this.Latitude = -1;
    this.Longitude = -1;
  }
}
