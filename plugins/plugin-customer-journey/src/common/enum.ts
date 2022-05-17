export enum VulnerableCustomerStatus {
  suspected = 1,
  confirmed = 2,
}

export enum HistoryPanelMemberType {
  Customer = 1,
  Agent = 2,
}

export enum MessageDirectionType {
  Outbound = 1,
  Inbound = 2,
}

export enum ChannelType {
  SMS = 1,
  Whatsapp = 2,
}

export enum VehicleSortingOptions {
  PriceDescending = 2,
  PriceAscending = 3,
  AgeAscending = 6,
}

export enum QuoteSortingOptions {
  Price = 1,
  Distance = 2,
  Age = 3,
  AddedDate = 4,
  Mileage = 5,
}

export enum LoanCalculatorType {
  MonthlyRepayment = 1,
  LoanAmount = 2,
}

export enum DealerStateType {
  Approved = 1,
  Declined = 2,
  Unknown = 3,
  ApprovedForDCI = 4,
}

export enum PreferredNameType {
  FullName,
  FirstName,
  Other,
}
