export class NoteModel {
  commentId: number;

  comment: string;

  department: string;

  createdOn: Date;

  userName: string;

  isImportant: boolean;

  constructor() {
    this.commentId = 0;
    this.comment = "";
    this.department = "";
    this.createdOn = new Date();
    this.userName = "";
    this.isImportant = false;
  }
}
