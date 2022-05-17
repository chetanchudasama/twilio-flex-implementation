import { VehicleExtraModel } from "models/VehicleExtraModel";
import { QuoteDetailModel } from "../../../../models/QuoteDetailModel";

export interface StateToProps {
  applicationId: number;
  lenderId: number;
  apr: number;
  maxLendAmount: number;
  lenderName: string;
  vehicleExtraItemList: VehicleExtraModel[];
}

export interface DispatchToProps {
  saveQuote: (quote: QuoteDetailModel) => void;
  setVehicleExtraItemList: (items: VehicleExtraModel[]) => void;
}
interface OwnProps {
  open: boolean;
  quoteDetail: QuoteDetailModel;
  dealerFee?: number;
  handleCloseDialog: () => void;
}

export type QuoteDialogProps = OwnProps & StateToProps & DispatchToProps;
