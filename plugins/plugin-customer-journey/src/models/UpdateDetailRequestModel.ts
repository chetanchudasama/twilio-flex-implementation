export class UpdateDetailRequestModel {
  op: string;

  path: string;

  value: string | boolean | any | null;

  constructor() {
    this.op = "";
    this.path = "";
    this.value = "";
  }
}
