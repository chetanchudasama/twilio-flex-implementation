import { CustomerEmploymentModel } from "@common/components";

export interface EmploymentListItemProps {
  employment: CustomerEmploymentModel;
  setActiveEmployment: () => void;
}
