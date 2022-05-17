/* eslint-disable max-classes-per-file */
import { BaseAddressModel } from "./BaseAddressModel";

class AddressStatusItemModel {
  addressStatusId: number;

  addressStatusName: string;

  yearsAtAddress: number;

  monthsAtAddress: number;

  constructor() {
    this.addressStatusId = -1;
    this.addressStatusName = "";
    this.yearsAtAddress = 0;
    this.monthsAtAddress = 0;
  }
}

export class AddressItemModel extends BaseAddressModel {
  addressStatus: AddressStatusItemModel;

  isPrimaryAddress: boolean;

  public constructor() {
    super();
    this.addressStatus = new AddressStatusItemModel();
    this.isPrimaryAddress = false;
  }
}
