import { CustomerDetailModel, BankDetailModel } from "@common/components";

export interface StateToProps {
  applicationId: number;
  bankDetail: BankDetailModel;
}

export interface DispatchToProps {
  setCustomerDetails: (key: keyof CustomerDetailModel, value: any) => void;
}
