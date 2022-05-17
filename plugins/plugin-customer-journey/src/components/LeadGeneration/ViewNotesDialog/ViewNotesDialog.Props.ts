import { NoteModel } from "../../../models/NoteModel";

export interface StateToProps {
  applicationId: number;
  customerName: string;
}

export interface DispatchToProps {}

export interface OwnProps {
  open: boolean;
  recentNotes: NoteModel[];
  dialogTitle: string;
  handleDialogClose: (notes?: string) => void;
}

export type ViewNotesDialogProps = StateToProps & DispatchToProps & OwnProps;
