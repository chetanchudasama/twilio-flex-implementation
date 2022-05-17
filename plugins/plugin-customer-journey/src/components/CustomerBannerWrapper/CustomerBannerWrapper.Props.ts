import { CustomerBannerProps, CustomerDetailModel } from "@common/components";

export interface StateToProps extends CustomerBannerProps {
  isCustomerAvailable: boolean;
  applicationId: number;
  canMakeCall: boolean;
}

export interface DispatchToProps {
  setCustomer: (customer: CustomerDetailModel) => void;
  setCustomerDetails: (key: keyof CustomerDetailModel, value: any) => void;
  addNoteDetail: (content: string, isImportant: boolean) => void;
}
