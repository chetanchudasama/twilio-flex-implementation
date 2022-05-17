import { DealerStateType } from "../../common/enum";

export interface DealerGuideDialogProps {
  open: boolean;
  handleDialogClose: () => void;
  dealerState: DealerStateType;
}
