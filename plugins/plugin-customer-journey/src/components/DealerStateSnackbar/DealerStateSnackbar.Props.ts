import { DealerStateType } from "../../common/enum";

export interface DealerStateSnackbarProps {
  dealerState: DealerStateType;
  declinedDate?: Date | null;
  reasonForDeclined?: string;
}
