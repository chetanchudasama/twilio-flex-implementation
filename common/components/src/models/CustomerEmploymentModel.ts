import { BaseAddressModel } from "./BaseAddressModel";
import { OccupationStatusModel } from "./OccupationStatusModel";

export class CustomerEmploymentModel {
  public occupationStatus: OccupationStatusModel;

  public yearsAtEmployment: number;

  public monthsAtEmployment: number;

  public occupation: string;

  public employerName: string;

  public employerPhoneNumber: string;

  public employerAddress: BaseAddressModel;

  public isCurrentEmployment: boolean;

  constructor() {
    this.occupationStatus = new OccupationStatusModel();
    this.yearsAtEmployment = 0;
    this.monthsAtEmployment = 0;
    this.occupation = "";
    this.employerName = "";
    this.employerPhoneNumber = "";
    this.employerAddress = new BaseAddressModel();
    this.isCurrentEmployment = false;
  }
}
