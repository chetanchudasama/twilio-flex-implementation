import { CustomerEmploymentModel } from "@common/components";

export interface EmploymentDialogProps {
  isEdit?: boolean;
  open: boolean;
  loading: boolean;
  activeEmployment: CustomerEmploymentModel;
  onDelete: () => void;
  onClose: () => void;
  onSave: (employment: CustomerEmploymentModel) => void;
}
