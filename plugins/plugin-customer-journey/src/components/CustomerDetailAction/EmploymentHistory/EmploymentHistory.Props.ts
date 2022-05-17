import {
  CustomerDetailModel,
  CustomerEmploymentModel,
} from "@common/components";

export interface StateToProps {
  applicationId: number;
  currentEmployment: CustomerEmploymentModel | null;
  previousEmployments: CustomerEmploymentModel[];
}

export interface DispatchToProps {
  setCustomerDetails: (key: keyof CustomerDetailModel, value: any) => void;
}

export type Props = StateToProps & DispatchToProps;
