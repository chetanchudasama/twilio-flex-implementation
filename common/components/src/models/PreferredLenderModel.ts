export class PreferredLenderModel {
  public proposalId: number;

  public lenderId: number;

  public lenderName: string;

  public lenderReference: string;

  public isPrime: boolean;

  public amountToFinance: number;

  public isPreferredAcceptance: boolean;

  public apr: number | null;

  public flatRate: number | null;

  public minVehicleAgeAtStart: number | null;

  public maxVehicleAgeAtStart: number | null;

  public maxVehicleAgeAtEnd: number | null;

  public maxVanAgeAtEnd: number | null;

  public minMileage: number | null;

  public maxMileage: number | null;

  public minLendAmount: number | null;

  public maxLendAmount: number | null;

  public minTerm: number | null;

  public maxTerm: number | null;

  public tierId: number;

  public tierName: string;

  constructor() {
    this.proposalId = 0;
    this.lenderId = 0;
    this.lenderName = "";
    this.lenderReference = "";
    this.isPrime = false;
    this.amountToFinance = 0;
    this.isPreferredAcceptance = false;
    this.apr = null;
    this.flatRate = null;
    this.minVehicleAgeAtStart = null;
    this.maxVehicleAgeAtStart = null;
    this.maxVehicleAgeAtEnd = null;
    this.maxVanAgeAtEnd = null;
    this.minMileage = null;
    this.maxMileage = null;
    this.minLendAmount = null;
    this.maxLendAmount = null;
    this.minTerm = null;
    this.maxTerm = null;
    this.tierId = 0;
    this.tierName = "";
  }
}
