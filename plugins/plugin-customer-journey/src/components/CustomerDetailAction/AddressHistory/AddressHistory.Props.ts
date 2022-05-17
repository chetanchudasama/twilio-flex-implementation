import { AddressItemModel, CustomerDetailModel } from "@common/components";

export interface StateToProps {
  applicationId: number;
  currentAddress: AddressItemModel | null;
  previousAddressList: AddressItemModel[];
}

export interface DispatchToProps {
  setCustomerDetails: (key: keyof CustomerDetailModel, value: any) => void;
}
