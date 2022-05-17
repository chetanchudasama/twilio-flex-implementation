export class BudgetInformationModel {
  public monthlyBudgetAmount: number | null;

  public apr: number | null;

  public maximumBorrowAmount: number | null;

  constructor() {
    this.monthlyBudgetAmount = null;
    this.apr = null;
    this.maximumBorrowAmount = 25000;
  }
}
