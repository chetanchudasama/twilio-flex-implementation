import { AddressItemModel } from "@common/components";

export interface AddressDialogProps {
  isEdit?: boolean;
  open: boolean;
  loading: boolean;
  onDelete: () => void;
  onSave: (address: AddressItemModel) => void;
  onClose: () => void;
  activeAddress: AddressItemModel;
}
