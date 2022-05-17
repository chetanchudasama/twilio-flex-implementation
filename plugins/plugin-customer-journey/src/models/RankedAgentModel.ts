export class RankedAgentModel {
  public agentId: number;

  public agentName: string;

  public departmentName: string;

  public departmentId: string;

  public ratio: number;

  public lastLoggedIn: Date | null;

  public targetAmount: number;

  public allocationCount: number;

  public lastLoginAllocate: Date | null;

  public grade: number;

  public receivingLeadGenTransfers: boolean;

  public callbacksRatio: number;

  public leadGenTransfersRatio: number;

  constructor() {
    this.agentId = -1;
    this.agentName = "";
    this.departmentName = "";
    this.departmentId = "";
    this.ratio = 0;
    this.lastLoggedIn = null;
    this.targetAmount = 0;
    this.allocationCount = 0;
    this.lastLoginAllocate = null;
    this.grade = 0;
    this.receivingLeadGenTransfers = false;
    this.callbacksRatio = 0;
    this.leadGenTransfersRatio = 0;
  }
}
