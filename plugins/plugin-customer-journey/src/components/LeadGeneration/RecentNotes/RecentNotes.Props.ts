import { NoteModel } from "../../../models/NoteModel";

export interface StateToProps {}

export interface DispatchToProps {}

export interface OwnProps {
  recentNotes: NoteModel[];
}

export type RecentNotesProps = StateToProps & DispatchToProps & OwnProps;
