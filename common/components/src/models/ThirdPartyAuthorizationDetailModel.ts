import { ThirdPartyRemovalAuthor } from "../shared/enum";

export class ThirdPartyAuthorizationDetail {
  public thirdPartyName: string;

  public thirdPartyDateOfBirth: Date | null;

  public thirdPartyAddress: string;

  public thirdPartyPostcode: string;

  public thirdPartyExpiryDate: Date | null;

  public thirdPartyDoNotDiscuss: string;

  public thirdPartyRemovalAuthor: ThirdPartyRemovalAuthor | string;

  public thirdPartyRemovalNotes: string;

  constructor() {
    this.thirdPartyName = "";
    this.thirdPartyDateOfBirth = null;
    this.thirdPartyAddress = "";
    this.thirdPartyPostcode = "";
    this.thirdPartyExpiryDate = null;
    this.thirdPartyDoNotDiscuss = "";
    this.thirdPartyRemovalAuthor = "";
    this.thirdPartyRemovalNotes = "";
  }
}
