import { Shared } from "../shared/Shared";
import { AddressItemModel } from "./AddressItemModel";
import { ApplicationStatusModel } from "./ApplicationStatusModel";
import { ThirdPartyAuthorizationDetail } from "./ThirdPartyAuthorizationDetailModel";
import { VulnerableCustomerInformation } from "./VulnerableCustomerInformation";
import { PreferredLenderModel } from "./PreferredLenderModel";
import { BankDetailModel } from "./BankDetailModel";
import { CustomerEmploymentModel } from "./CustomerEmploymentModel";
import { TitleModel } from "./TitleModel";
import { DrivingLicenceTypeModel } from "./DrivingLicenceTypeModel";
import { MaritalStatusModel } from "./MaritalStatusModel";

export class CustomerDetailModel {
  applicationId: number;

  title: TitleModel;

  firstName: string;

  middleName: string;

  lastName: string;

  dateOfBirth!: Date;

  applicationDate!: Date;

  amountToFinance: number;

  monthlyBudget: number;

  savedCarsCount: number;

  callbackBooked!: Date;

  mobileNumber: string;

  workNumber: string;

  homeNumber: string;

  emailAddress: string;

  maritalStatus: MaritalStatusModel;

  drivingLicenceType: DrivingLicenceTypeModel;

  pin: string;

  applicationStatus: ApplicationStatusModel;

  thirdPartyAuthorization: ThirdPartyAuthorizationDetail | null;

  hasThirdPartyAuthorization: boolean;

  hasVulnerableCustomerReported: boolean;

  vulnerableCustomerInformation: VulnerableCustomerInformation | null;

  currentProgressStatus: string;

  preferredLender: PreferredLenderModel;

  bankDetails: BankDetailModel;

  addresses: AddressItemModel[];

  employmentHistory: CustomerEmploymentModel[];

  constructor() {
    this.applicationId = -1;
    this.title = new TitleModel();
    this.firstName = "";
    this.middleName = "";
    this.lastName = "";
    this.amountToFinance = 0;
    this.monthlyBudget = 0;
    this.savedCarsCount = 0;
    this.mobileNumber = "";
    this.workNumber = "";
    this.homeNumber = "";
    this.emailAddress = "";
    this.maritalStatus = new MaritalStatusModel();
    this.drivingLicenceType = new DrivingLicenceTypeModel();
    this.pin = "";
    this.applicationStatus = new ApplicationStatusModel();
    this.thirdPartyAuthorization = null;
    this.hasThirdPartyAuthorization = false;
    this.hasVulnerableCustomerReported = false;
    this.vulnerableCustomerInformation = null;
    this.currentProgressStatus = "";
    this.preferredLender = new PreferredLenderModel();
    this.bankDetails = new BankDetailModel();
    this.addresses = [];
    this.employmentHistory = [];
  }

  get fullName(): string {
    const { title, firstName, middleName, lastName } = this;
    const currentTitle = title && title.titleName || "";

    return Shared.getFormattedText(
      [currentTitle, firstName, middleName, lastName],
      " "
    );
  }

  get primaryAddress(): AddressItemModel {
    const { addresses } = this;
    return (
      addresses.find((address: AddressItemModel) => address.isPrimaryAddress) ||
      new AddressItemModel()
    );
  }

  get address(): string {
    const { primaryAddress } = this;

    if (primaryAddress) {
      const addressList = [
        primaryAddress.buildingNumber
          ? primaryAddress.buildingNumber.toString()
          : "",
        primaryAddress.buildingName,
        primaryAddress.subBuilding,
        primaryAddress.streetName,
        primaryAddress.town,
        primaryAddress.postcode,
      ];
      return Shared.getFormattedText(addressList, ", ");
    }
    return "";
  }
}
