import { CustomerDetailModel } from "@common/components";

export interface StateToProps {
  applicationId: number;
}

export interface DispatchToProps {
  setCustomerDetails: (key: keyof CustomerDetailModel, value: any) => void;
}
