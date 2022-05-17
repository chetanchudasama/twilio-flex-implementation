import { VulnerableCustomerStatus } from "../shared/enum";
import { VulnerabilityReason } from "./VulnerabilityReason";

export class VulnerableCustomerInformation {
  public reason: VulnerabilityReason;

  public vulnerabilityNote: string;

  public permissionGranted: boolean;

  public status: VulnerableCustomerStatus | string;

  public constructor() {
    this.reason = new VulnerabilityReason();
    this.vulnerabilityNote = "";
    this.status = "";
    this.permissionGranted = false;
  }
}
