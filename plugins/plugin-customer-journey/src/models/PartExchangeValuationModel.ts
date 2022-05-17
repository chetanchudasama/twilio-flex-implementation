export interface PartExchangeValuationModel {
  vehicleRegistration: string;
  mileage: number;
  tradeValue: number;
  retailValue: number;
  retailTransacted: number;
  qualifiedModelCode: string;
  vin: string;
  manufacturer: string;
  model: string;
  result: Record<string, unknown>;
}
