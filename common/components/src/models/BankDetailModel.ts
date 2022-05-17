export class BankDetailModel {
  public bankName: string;

  public monthsAtBank: number;

  public nameOnBankAccount: string;

  public accountNumber: string;

  public sortCode: string;

  public netMonthlyIncome: number;

  constructor() {
    this.bankName = "";
    this.monthsAtBank = 0;
    this.nameOnBankAccount = "";
    this.accountNumber = "";
    this.sortCode = "";
    this.netMonthlyIncome = 0;
  }
}
